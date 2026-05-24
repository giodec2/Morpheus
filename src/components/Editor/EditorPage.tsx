import { useEditorStore } from '@/stores/editorStore';
import TiptapEditor from './TiptapEditor';

interface EditorPageProps {
  bookId: string;
  chapterId?: string;
}

export default function EditorPage(_props: EditorPageProps) {
  const { activeChapter } = useEditorStore();

  if (!activeChapter) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
        <div className="text-center">
          <p className="text-lg font-medium mb-2">No chapter selected</p>
          <p className="text-sm">Create a new chapter from the sidebar to start writing</p>
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
