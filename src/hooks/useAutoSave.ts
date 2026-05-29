import { useCallback, useEffect, useRef } from 'react';
import type { Editor } from '@tiptap/react';
import { useEditorStore } from '@/stores/editorStore';
import { useBookStore } from '@/stores/bookStore';
import { updateChapter } from '@/db/chapters';
import { toast } from '@/components/common/Toast';

export function useAutoSave(editor: Editor | null) {
  const { activeChapter, setIsDirty, setSaveStatus } = useEditorStore();
  const { updateChapter: updateChapterInStore } = useBookStore();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const lastSavedRef = useRef<string>('');
  // Tracks which chapter the editor currently has content for.
  // Prevents saving stale content to a chapter that was switched away from.
  const currentChapterIdRef = useRef<string | null>(null);

  const save = useCallback(async () => {
    if (!editor || !activeChapter) return;

    // DEFENSIVE: if activeChapter has changed since this effect was set up,
    // the editor DOM may still hold the previous chapter's content.
    // Do NOT save if the chapter ID no longer matches.
    if (activeChapter.id !== currentChapterIdRef.current) return;

    const content = editor.getJSON();
    const contentStr = JSON.stringify(content);
    if (contentStr === lastSavedRef.current) return;

    setSaveStatus('saving');
    try {
      await updateChapter(activeChapter.id, { content });
      updateChapterInStore({ ...activeChapter, content });
      lastSavedRef.current = contentStr;
      setSaveStatus('saved');
      setIsDirty(false);
    } catch {
      setSaveStatus('error');
      toast('Failed to save chapter', 'error');
    }
  }, [editor, activeChapter, setIsDirty, setSaveStatus, updateChapterInStore]);

  useEffect(() => {
    if (!editor || !activeChapter) return;

    // Mark which chapter this effect instance owns
    currentChapterIdRef.current = activeChapter.id;

    // Reset last saved when chapter changes
    lastSavedRef.current = JSON.stringify(activeChapter.content);

    const handler = () => {
      setIsDirty(true);
      setSaveStatus('idle');

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        save();
      }, 2000); // AUTO_SAVE_DEBOUNCE_MS — kept inline to avoid import cycle
    };

    editor.on('update', handler);

    return () => {
      editor.off('update', handler);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [editor, activeChapter, setIsDirty, setSaveStatus, save]);

  // Save on true unmount only
  const saveRef = useRef(save);
  saveRef.current = save;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      saveRef.current();
    };
  }, []);

  return { save };
}
