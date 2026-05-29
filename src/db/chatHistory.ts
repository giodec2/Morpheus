import { db } from './database';
import { generateId } from '@/lib/utils';
import type { ChatMessage, ChatSession } from '@/types';

export async function getChatSessionsByBook(bookId: string): Promise<ChatSession[]> {
  return db.chatSessions
    .where('bookId')
    .equals(bookId)
    .sortBy('updatedAt')
    .then(sessions => sessions.reverse());
}

export async function createChatSession(bookId: string, title = 'New Chat'): Promise<ChatSession> {
  const session: ChatSession = {
    id: generateId(),
    bookId,
    title,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  await db.chatSessions.add(session);
  return session;
}

export async function updateChatSession(id: string, updates: Partial<Pick<ChatSession, 'title' | 'updatedAt'>>): Promise<void> {
  await db.chatSessions.update(id, updates);
}

export async function deleteChatSession(id: string): Promise<void> {
  await db.chatHistory.where('sessionId').equals(id).delete();
  await db.chatSessions.delete(id);
}

export async function getChatHistoryBySession(sessionId: string, limit = 100): Promise<ChatMessage[]> {
  return db.chatHistory
    .where('sessionId')
    .equals(sessionId)
    .reverse()
    .limit(limit)
    .sortBy('timestamp')
    .then(msgs => msgs.reverse());
}

export async function addChatMessage(message: Omit<ChatMessage, 'id' | 'timestamp'>): Promise<ChatMessage> {
  const msg: ChatMessage = {
    ...message,
    id: generateId(),
    timestamp: Date.now(),
  };
  await db.chatHistory.add(msg);
  // Update session timestamp
  await db.chatSessions.update(message.sessionId, { updatedAt: Date.now() });
  return msg;
}

export async function deleteChatMessage(id: string): Promise<void> {
  await db.chatHistory.delete(id);
}

export async function clearChatHistory(sessionId: string): Promise<void> {
  await db.chatHistory.where('sessionId').equals(sessionId).delete();
}
