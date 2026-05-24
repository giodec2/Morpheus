import { create } from 'zustand';
import type { Book, Chapter, Character, LoreBible } from '@/types';

interface BookState {
  activeBook: Book | null;
  chapters: Chapter[];
  characters: Character[];
  loreBible: LoreBible | null;
  sidebarView: 'chapters' | 'characters' | 'loreBible' | 'settings';
  activeCharacterId: string | null;

  setActiveBook: (book: Book | null) => void;
  setChapters: (chapters: Chapter[]) => void;
  setCharacters: (characters: Character[]) => void;
  setLoreBible: (lore: LoreBible | null) => void;
  setSidebarView: (view: BookState['sidebarView']) => void;
  setActiveCharacterId: (id: string | null) => void;

  addChapter: (chapter: Chapter) => void;
  updateChapter: (chapter: Chapter) => void;
  removeChapter: (id: string) => void;
  reorderChapters: (chapterIds: string[]) => void;

  addCharacter: (character: Character) => void;
  updateCharacter: (character: Character) => void;
  removeCharacter: (id: string) => void;

  updateLoreBible: (lore: LoreBible) => void;
}

export const useBookStore = create<BookState>((set) => ({
  activeBook: null,
  chapters: [],
  characters: [],
  loreBible: null,
  sidebarView: 'chapters',
  activeCharacterId: null,

  setActiveBook: (book) => set({ activeBook: book }),
  setChapters: (chapters) => set({ chapters }),
  setCharacters: (characters) => set({ characters }),
  setLoreBible: (loreBible) => set({ loreBible }),
  setSidebarView: (sidebarView) => set({ sidebarView }),
  setActiveCharacterId: (activeCharacterId) => set({ activeCharacterId }),

  addChapter: (chapter) => set((state) => ({
    chapters: [...state.chapters, chapter].sort((a, b) => a.order - b.order),
  })),

  updateChapter: (chapter) => set((state) => ({
    chapters: state.chapters.map((c) => (c.id === chapter.id ? chapter : c)),
  })),

  removeChapter: (id) => set((state) => ({
    chapters: state.chapters.filter((c) => c.id !== id),
  })),

  reorderChapters: (chapterIds) => set((state) => ({
    chapters: state.chapters
      .map((c) => ({ ...c, order: chapterIds.indexOf(c.id) }))
      .sort((a, b) => a.order - b.order),
  })),

  addCharacter: (character) => set((state) => ({
    characters: [...state.characters, character].sort((a, b) => a.name.localeCompare(b.name)),
  })),

  updateCharacter: (character) => set((state) => ({
    characters: state.characters.map((c) => (c.id === character.id ? character : c)),
  })),

  removeCharacter: (id) => set((state) => ({
    characters: state.characters.filter((c) => c.id !== id),
  })),

  updateLoreBible: (loreBible) => set({ loreBible }),
}));
