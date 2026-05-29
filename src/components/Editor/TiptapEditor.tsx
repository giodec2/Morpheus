import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import Color from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import { Loader2 } from 'lucide-react';
import { useEditorStore } from '@/stores/editorStore';
import { useBookStore } from '@/stores/bookStore';
import { useSearchStore } from '@/stores/searchStore';
import { useAutoSave } from '@/hooks/useAutoSave';
import EditorToolbar from './EditorToolbar';
import ChapterHeader from './ChapterHeader';
import CharacterTags from './CharacterTags';
import { FontSize } from '@/lib/tiptapFontSize';

/**
 * Apply CSS Custom Highlight to search terms in the editor DOM.
 * Gracefully degrades on browsers without CSS Highlight API support.
 */
function applySearchHighlights(editorElement: HTMLElement | null, terms: string[]) {
  if (!editorElement || typeof CSS === 'undefined' || !('highlights' in CSS)) return;

  // Clear previous highlight
  CSS.highlights.delete('search-highlight');

  if (terms.length === 0) return;

  const ranges: Range[] = [];
  const walker = document.createTreeWalker(editorElement, NodeFilter.SHOW_TEXT);
  let node: Node | null;

  while ((node = walker.nextNode())) {
    const text = node.textContent || '';
    const lower = text.toLowerCase();

    for (const term of terms) {
      let idx = lower.indexOf(term);
      while (idx !== -1) {
        const range = document.createRange();
        range.setStart(node, idx);
        range.setEnd(node, idx + term.length);
        ranges.push(range);
        idx = lower.indexOf(term, idx + 1);
      }
    }
  }

  if (ranges.length > 0) {
    // @ts-expect-error DOM Highlight API constructor shadowed by TipTap import
    CSS.highlights.set('search-highlight', new Highlight(...ranges));
  }
}

export default function TiptapEditor() {
  const { activeChapter, saveStatus } = useEditorStore();
  const { characters } = useBookStore();
  const { activeHighlightTerms } = useSearchStore();
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      TextStyle,
      FontFamily,
      Color,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Begin your chapter...' }),
      CharacterCount,
      Highlight,
      Underline,
      FontSize,
    ],
    content: activeChapter?.content || { type: 'doc', content: [{ type: 'paragraph' }] },
    editorProps: {
      attributes: {
        class: 'editor-content focus:outline-none min-h-[500px] px-4 md:px-10 py-6 md:py-8',
      },
    },
  });

  useAutoSave(editor);

  // CRITICAL: Update editor content when active chapter changes.
  // useEditor's `content` option is only for initialization — it does NOT
  // reactively update when activeChapter changes. Without this effect,
  // switching books leaves the old book's text in the editor DOM,
  // and auto-save will overwrite the new chapter with the old content.
  useEffect(() => {
    if (!editor || !activeChapter) return;
    // Note: setContent always emits an 'update' event in this TipTap version.
    // The auto-save hook resets lastSavedRef when activeChapter changes,
    // so the subsequent save comparison will see no diff and skip the write.
    editor.commands.setContent(
      activeChapter.content || { type: 'doc', content: [{ type: 'paragraph' }] }
    );
  }, [editor, activeChapter?.id]);

  // Apply search highlights when terms or editor content changes
  useEffect(() => {
    if (!editor) return;
    // Small delay to let TipTap render the DOM first
    const timer = setTimeout(() => {
      applySearchHighlights(editor.view.dom as HTMLElement, activeHighlightTerms);
    }, 100);
    return () => {
      clearTimeout(timer);
      if (typeof CSS !== 'undefined' && 'highlights' in CSS) {
        CSS.highlights.delete('search-highlight');
      }
    };
  }, [editor, activeHighlightTerms, activeChapter?.id]);

  if (!activeChapter) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-600">
        <div className="text-center">
          <p className="text-lg font-medium mb-2">No chapter selected</p>
          <p className="text-sm">Create a new chapter from the sidebar to start writing</p>
        </div>
      </div>
    );
  }

  if (!editor) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  const wordCount = editor.storage.characterCount?.words?.() || 0;

  return (
    <div className="h-full flex flex-col">
      <EditorToolbar editor={editor} />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <ChapterHeader
            chapter={activeChapter}
            saveStatus={saveStatus}
            isSummaryOpen={isSummaryOpen}
            setIsSummaryOpen={setIsSummaryOpen}
          />

          <CharacterTags
            chapter={activeChapter}
            allCharacters={characters}
          />

          {/* Editor box — white on cream in light, slate-900 on slate-950 in dark for subtle contrast */}
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/60 shadow-sm rounded-sm min-h-[65vh]">
            <EditorContent editor={editor} />
          </div>

          <div className="flex items-center justify-between px-4 md:px-10 py-4 text-xs text-gray-400">
            <span>{wordCount.toLocaleString()} words</span>
            <span>{saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Synced ✓' : saveStatus === 'error' ? 'Save failed' : ''}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
