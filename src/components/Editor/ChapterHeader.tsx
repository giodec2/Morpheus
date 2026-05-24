import { useState } from 'react';
import { FileText, ChevronDown, ChevronUp, Loader2, Sparkles } from 'lucide-react';
import { toast } from '@/components/common/Toast';
import { useEditorStore } from '@/stores/editorStore';
import { useBookStore } from '@/stores/bookStore';
import { useOpenRouter } from '@/hooks/useOpenRouter';
import { useSettingsStore } from '@/stores/settingsStore';
import { updateChapter } from '@/db/chapters';
import { buildSummaryPrompt } from '@/lib/prompts/summaryGenerator';
import type { Chapter } from '@/types';

interface ChapterHeaderProps {
  chapter: Chapter;
  saveStatus: string;
  isSummaryOpen: boolean;
  setIsSummaryOpen: (v: boolean) => void;
}

export default function ChapterHeader({ chapter, saveStatus, isSummaryOpen, setIsSummaryOpen }: ChapterHeaderProps) {
  const { updateActiveChapter } = useEditorStore();
  const { updateChapter: updateChapterInStore } = useBookStore();
  const { openRouterKey } = useSettingsStore();
  const { sendMessage } = useOpenRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [editTitle, setEditTitle] = useState(chapter.title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const handleTitleBlur = async () => {
    if (editTitle.trim() && editTitle !== chapter.title) {
      await updateChapter(chapter.id, { title: editTitle.trim() });
      updateChapterInStore({ ...chapter, title: editTitle.trim() });
      updateActiveChapter({ title: editTitle.trim() });
    }
    setIsEditingTitle(false);
  };

  const handlePrepareSummary = async () => {
    if (!openRouterKey || isGenerating) return;

    setIsGenerating(true);
    const text = extractTextFromContent(chapter.content);
    const targetWords = Math.max(20, Math.round(text.split(/\s+/).length * 0.05));
    const prompt = buildSummaryPrompt(text, targetWords);

    let summary = '';
    await sendMessage(
      'You are a literary editor. Be concise and precise.',
      [{ role: 'user', content: prompt }],
      (chunk) => { summary += chunk; },
      (error) => { console.error('Summary error:', error); },
      'companion'
    );

    if (summary.trim()) {
      await updateChapter(chapter.id, { summary: summary.trim(), summaryPreparedAt: Date.now() });
      updateChapterInStore({ ...chapter, summary: summary.trim(), summaryPreparedAt: Date.now() });
      updateActiveChapter({ summary: summary.trim(), summaryPreparedAt: Date.now() });
      toast('Summary generated', 'success');
    } else {
      toast('Failed to generate summary', 'error');
    }

    setIsGenerating(false);
  };

  const handleSummaryEdit = async (value: string) => {
    await updateChapter(chapter.id, { summary: value });
    updateChapterInStore({ ...chapter, summary: value });
    updateActiveChapter({ summary: value });
  };

  return (
    <div className="px-8 pt-6 pb-2">
      <div className="flex items-center justify-between mb-3">
        {isEditingTitle ? (
          <input
            autoFocus
            className="text-2xl font-bold text-gray-900 dark:text-white bg-transparent border-b-2 border-primary-500 focus:outline-none w-full max-w-lg"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleTitleBlur();
              if (e.key === 'Escape') { setEditTitle(chapter.title); setIsEditingTitle(false); }
            }}
          />
        ) : (
          <h1
            className="text-2xl font-bold text-gray-900 dark:text-white cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            onClick={() => setIsEditingTitle(true)}
            title="Click to edit"
          >
            {chapter.title}
          </h1>
        )}

        <div className="flex items-center gap-2">
          {saveStatus === 'saving' && (
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin" /> Saving...
            </span>
          )}
          {saveStatus === 'saved' && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Synced
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={handlePrepareSummary}
          disabled={isGenerating}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors disabled:opacity-50"
        >
          {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
          Prepare Summary
        </button>

        {chapter.summary && (
          <button
            onClick={() => setIsSummaryOpen(!isSummaryOpen)}
            className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FileText className="w-3 h-3" />
            Summary
            {isSummaryOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        )}
      </div>

      {isSummaryOpen && chapter.summary && (
        <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-lg">
          <textarea
            className="w-full bg-transparent text-xs text-gray-700 dark:text-gray-300 resize-none focus:outline-none"
            rows={4}
            value={chapter.summary}
            onChange={(e) => handleSummaryEdit(e.target.value)}
            placeholder="Chapter summary..."
          />
        </div>
      )}
    </div>
  );
}

function extractTextFromContent(content: Record<string, unknown>): string {
  let text = '';
  function traverse(node: unknown) {
    if (typeof node !== 'object' || node === null) return;
    const n = node as Record<string, unknown>;
    if (n.type === 'text' && typeof n.text === 'string') {
      text += n.text + ' ';
    }
    if (Array.isArray(n.content)) {
      n.content.forEach(traverse);
    }
  }
  traverse(content);
  return text.trim();
}
