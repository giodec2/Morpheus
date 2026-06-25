import { useEffect, useState } from 'react';
import { useI18n } from '@/i18n/useI18n';
import { useEditorStore } from '@/stores/editorStore';
import { useBookStore } from '@/stores/bookStore';
import { extractTextFromContent } from '@/lib/tiptap';
import TiptapEditor from './TiptapEditor';
import BookTutorial from './BookTutorial';

interface EditorPageProps {
  bookId: string;
  chapterId?: string;
}

const TUTORIAL_SEEN_KEY = 'morpheus:bookTutorialSeen';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function EditorPage(_props: EditorPageProps) {
  const { t } = useI18n();
  const { activeChapter } = useEditorStore();
  const { activeBook, chapters } = useBookStore();
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    // Show the tutorial only the first time a user opens an empty book.
    const hasSeenTutorial = localStorage.getItem(TUTORIAL_SEEN_KEY) === 'true';
    if (hasSeenTutorial || chapters.length === 0) return;

    const hasContent = chapters.some(
      (chapter) => extractTextFromContent(chapter.content).trim().length > 0
    );
    if (!hasContent) {
      setShowTutorial(true);
    }
  }, [chapters]);

  const handleCloseTutorial = () => {
    setShowTutorial(false);
    try {
      localStorage.setItem(TUTORIAL_SEEN_KEY, 'true');
    } catch {
      // ignore storage errors
    }
  };

  if (!activeChapter) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
        <div className="text-center">
          <p className="text-lg font-medium mb-2">{t('editor.noChapterSelected')}</p>
          <p className="text-sm">{t('editor.createChapterToStart')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-paper-50 dark:bg-slate-950">
      <TiptapEditor />
      {showTutorial && (
        <BookTutorial bookTitle={activeBook?.title} onClose={handleCloseTutorial} />
      )}
    </div>
  );
}
