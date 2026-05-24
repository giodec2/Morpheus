import { useEffect } from 'react';
import { useEditorStore } from '@/stores/editorStore';
import { useBookStore } from '@/stores/bookStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { createChapter } from '@/db/chapters';
import { toast } from '@/components/common/Toast';

export function useKeyboardShortcuts() {
  const { saveStatus } = useEditorStore();
  const { activeBook, chapters, addChapter } = useBookStore();
  const { setActiveChapter } = useEditorStore();
  const { theme, setTheme } = useSettingsStore();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Ctrl+S: Force save
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        if (saveStatus === 'idle' || saveStatus === 'error') {
          toast('Saving...', 'info');
        }
      }

      // Ctrl+Shift+N: New chapter
      if (e.ctrlKey && e.shiftKey && e.key === 'N') {
        e.preventDefault();
        if (activeBook) {
          const newOrder = chapters.length;
          createChapter(activeBook.id, `Chapter ${newOrder + 1}`, newOrder).then((chapter) => {
            addChapter(chapter);
            setActiveChapter(chapter);
            toast('New chapter created', 'success');
          });
        }
      }

      // Ctrl+Shift+D: Toggle dark mode
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeBook, chapters, addChapter, setActiveChapter, theme, setTheme, saveStatus]);
}
