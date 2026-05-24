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
import { Loader2, AlertTriangle } from 'lucide-react';
import { useEditorStore } from '@/stores/editorStore';
import { useBookStore } from '@/stores/bookStore';
import { useAutoSave } from '@/hooks/useAutoSave';
import EditorToolbar from './EditorToolbar';
import ChapterHeader from './ChapterHeader';
import CharacterTags from './CharacterTags';
import { FontSize } from '@/lib/tiptapFontSize';

export default function TiptapEditor() {
  const { activeChapter, saveStatus } = useEditorStore();
  const { characters } = useBookStore();
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [editorError, setEditorError] = useState<string | null>(null);

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
        class: 'editor-content focus:outline-none min-h-[500px] px-10 py-8',
      },
    },
    onCreate: ({ editor }) => {
      if (activeChapter && editor.isEmpty) {
        editor.commands.setContent(activeChapter.content);
      }
    },
  });

  // Handle editor errors
  useEffect(() => {
    if (!editor && activeChapter) {
      const timer = setTimeout(() => {
        setEditorError('Editor failed to initialize. Try refreshing the page.');
      }, 3000);
      return () => clearTimeout(timer);
    }
    if (editor) {
      setEditorError(null);
    }
  }, [editor, activeChapter]);

  useAutoSave(editor);

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

  if (editorError) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-8">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Editor Error</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{editorError}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Reload Page
          </button>
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

          <div className="flex items-center justify-between px-10 py-4 text-xs text-gray-400">
            <span>{wordCount.toLocaleString()} words</span>
            <span>{saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Synced ✓' : saveStatus === 'error' ? 'Save failed' : ''}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
