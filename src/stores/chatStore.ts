import { create } from 'zustand';
import type { AIMode, ChatMessage, ChatSession, WritingGenre } from '@/types';

interface ChatState {
  messages: ChatMessage[];
  sessions: ChatSession[];
  activeSessionId: string | null;
  activeMode: AIMode;
  activeGenre: WritingGenre;
  isStreaming: boolean;
  streamContent: string;
  contextInfo: { characters: number; summaries: number; tokens: number };

  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
  updateLastMessage: (content: string) => void;
  setSessions: (sessions: ChatSession[]) => void;
  addSession: (session: ChatSession) => void;
  deleteSession: (sessionId: string) => void;
  setActiveSessionId: (sessionId: string | null) => void;
  setActiveMode: (mode: AIMode) => void;
  setActiveGenre: (genre: WritingGenre) => void;
  setIsStreaming: (streaming: boolean) => void;
  setStreamContent: (content: string) => void;
  appendStreamContent: (chunk: string) => void;
  setContextInfo: (info: ChatState['contextInfo']) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  sessions: [],
  activeSessionId: null,
  activeMode: 'companion',
  activeGenre: 'general',
  isStreaming: false,
  streamContent: '',
  contextInfo: { characters: 0, summaries: 0, tokens: 0 },

  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  updateLastMessage: (content) => set((state) => ({
    messages: state.messages.map((m, i) =>
      i === state.messages.length - 1 ? { ...m, content } : m
    ),
  })),
  setSessions: (sessions) => set({ sessions }),
  addSession: (session) => set((state) => ({ sessions: [session, ...state.sessions] })),
  deleteSession: (sessionId) => set((state) => ({
    sessions: state.sessions.filter((s) => s.id !== sessionId),
    activeSessionId: state.activeSessionId === sessionId ? null : state.activeSessionId,
  })),
  setActiveSessionId: (activeSessionId) => set({ activeSessionId }),
  setActiveMode: (activeMode) => set({ activeMode }),
  setActiveGenre: (activeGenre) => set({ activeGenre }),
  setIsStreaming: (isStreaming) => set({ isStreaming }),
  setStreamContent: (streamContent) => set({ streamContent }),
  appendStreamContent: (chunk) => set((state) => ({ streamContent: state.streamContent + chunk })),
  setContextInfo: (contextInfo) => set({ contextInfo }),
}));
