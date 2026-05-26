import { create } from 'zustand';
import type { SearchResult, SearchDocument } from '@/lib/searchEngine';

interface SearchState {
  isOpen: boolean;
  query: string;
  results: SearchResult[];
  index: SearchDocument[];
  activeHighlightTerms: string[];
  selectedResultId: string | null;

  setOpen: (open: boolean) => void;
  setQuery: (query: string) => void;
  setResults: (results: SearchResult[]) => void;
  setIndex: (index: SearchDocument[]) => void;
  setActiveHighlightTerms: (terms: string[]) => void;
  setSelectedResultId: (id: string | null) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  isOpen: false,
  query: '',
  results: [],
  index: [],
  activeHighlightTerms: [],
  selectedResultId: null,

  setOpen: (isOpen) => {
    if (!isOpen) {
      // Clear highlights when closing
      set({ isOpen, activeHighlightTerms: [], selectedResultId: null });
    } else {
      set({ isOpen });
    }
  },

  setQuery: (query) => set({ query }),
  setResults: (results) => set({ results }),
  setIndex: (index) => set({ index }),
  setActiveHighlightTerms: (terms) => set({ activeHighlightTerms: terms }),
  setSelectedResultId: (id) => set({ selectedResultId: id }),
}));
