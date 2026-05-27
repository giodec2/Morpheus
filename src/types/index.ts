export type AIMode = 'companion' | 'continuity' | 'plotWeaver' | 'twistForge';

export type WritingGenre =
  | 'general'
  | 'crime'
  | 'romance'
  | 'thriller'
  | 'scifi'
  | 'fantasy'
  | 'literary'
  | 'historical'
  | 'youngAdult';

export type Language =
  | 'english'
  | 'italian'
  | 'german'
  | 'french'
  | 'spanish'
  | 'portuguese'
  | 'dutch'
  | 'russian'
  | 'chinese'
  | 'japanese'
  | 'korean'
  | 'polish';

export interface Book {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
}

export interface Chapter {
  id: string;
  bookId: string;
  title: string;
  order: number;
  content: Record<string, unknown>;
  summary: string;
  summaryPreparedAt: number | null;
  taggedCharacterIds: string[];
  createdAt: number;
  updatedAt: number;
}

export interface CharacterRelation {
  targetId: string;
  targetName: string;
  description: string;
}

export interface Character {
  id: string;
  bookId: string;
  name: string;
  appearance: string;
  personality: string;
  notes: string;
  isPinned: boolean;
  relations: CharacterRelation[];
  updatedAt: number;
}

export interface LoreBible {
  id: string;
  bookId: string;
  content: Record<string, unknown>;
  updatedAt: number;
}

export interface ChatSession {
  id: string;
  bookId: string;
  title: string;
  createdAt: number;
  updatedAt: number;
}

export interface ChatMessage {
  id: string;
  bookId: string;
  sessionId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  mode: AIMode;
  genre: WritingGenre;
  timestamp: number;
}

export interface StyleProfile {
  bookId: string;
  content: string;
  updatedAt: number;
}

export interface AppSettings {
  id: 'global';
  openRouterKey: string;
  defaultModel: string;
  temperature: number;
  maxTokens: number;
  theme: 'light' | 'dark';
  advancedMode: boolean;
  language: Language;
  modelTier: 'standard' | 'premium';
  aiMode: 'byok' | 'hosted';
  writingGenre: WritingGenre;
  adaptiveMemory: boolean;
}

export type SidebarView = 'chapters' | 'characters' | 'loreBible' | 'settings';

export interface ModeConfig {
  id: AIMode;
  label: string;
  description: string;
  icon: string;
  baseTemp: number;
  tempAdjustment: number;
  color: string;
}
