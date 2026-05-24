import { create } from 'zustand';
import type { Chapter } from '@/types';

interface EditorState {
  activeChapterId: string | null;
  activeChapter: Chapter | null;
  isDirty: boolean;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';

  setActiveChapter: (chapter: Chapter | null) => void;
  setIsDirty: (dirty: boolean) => void;
  setSaveStatus: (status: EditorState['saveStatus']) => void;
  updateActiveChapter: (updates: Partial<Chapter>) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  activeChapterId: null,
  activeChapter: null,
  isDirty: false,
  saveStatus: 'idle',

  setActiveChapter: (chapter) => set({
    activeChapter: chapter,
    activeChapterId: chapter?.id ?? null,
    isDirty: false,
    saveStatus: 'saved',
  }),

  setIsDirty: (isDirty) => set({ isDirty }),
  setSaveStatus: (saveStatus) => set({ saveStatus }),

  updateActiveChapter: (updates) => set((state) => ({
    activeChapter: state.activeChapter ? { ...state.activeChapter, ...updates } : null,
  })),
}));
