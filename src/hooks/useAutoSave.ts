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

  const save = useCallback(async () => {
    if (!editor || !activeChapter) return;

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

    // Reset last saved when chapter changes
    lastSavedRef.current = JSON.stringify(activeChapter.content);

    const handler = () => {
      setIsDirty(true);
      setSaveStatus('idle');

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        save();
      }, 2000);
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
