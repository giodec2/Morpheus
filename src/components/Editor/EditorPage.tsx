import { useI18n } from '@/i18n/useI18n';
import { useEditorStore } from '@/stores/editorStore';
import TiptapEditor from './TiptapEditor';

interface EditorPageProps {
  bookId: string;
  chapterId?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function EditorPage(_props: EditorPageProps) {
  const { t } = useI18n();
  const { activeChapter } = useEditorStore();

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
    </div>
  );
}
