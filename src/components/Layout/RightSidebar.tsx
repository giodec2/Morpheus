import { useState, useRef, useEffect } from 'react';
import {
  Sparkles, Plus, Bot, X
} from 'lucide-react';
import { useBookStore } from '@/stores/bookStore';
import { useEditorStore } from '@/stores/editorStore';
import { useChatStore } from '@/stores/chatStore';
import { useAuthStore } from '@/stores/authStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { useOpenRouter } from '@/hooks/useOpenRouter';
import { buildContextPacket } from '@/lib/contextEngine';
import {
  addChatMessage,
  getChatHistoryBySession,
  getChatSessionsByBook,
  createChatSession,
  deleteChatSession,
  deleteChatMessage,
  updateChatSession,
} from '@/db/chatHistory';
import { toast } from '@/components/common/Toast';
import TierSelectorModal from '@/components/common/TierSelectorModal';
import { getStyleProfile } from '@/db/styleProfiles';
import { generateId } from '@/lib/utils';
import { MODES } from '@/lib/modes';
import ChatSessionList from '@/components/Chat/ChatSessionList';
import ModeSelector from '@/components/Chat/ModeSelector';
import GenreSelector from '@/components/Chat/GenreSelector';
import ChatMessageBubble from '@/components/Chat/ChatMessageBubble';
import ChatInput from '@/components/Chat/ChatInput';
import AISettings from '@/components/Chat/AISettings';
import type { AIMode, ChatMessage, WritingGenre } from '@/types';

interface RightSidebarProps {
  onCloseMobile?: () => void;
}

export default function RightSidebar({ onCloseMobile }: RightSidebarProps) {
  const { activeBook, chapters, characters, loreBible } = useBookStore();
  const { activeChapter } = useEditorStore();
  const {
    messages, sessions, activeSessionId, activeMode, activeGenre, isStreaming, streamContent, contextInfo,
    setMessages, addMessage, updateLastMessage, setSessions, addSession, deleteSession: removeSessionFromStore,
    setActiveSessionId, setActiveMode, setActiveGenre, setIsStreaming,
    setStreamContent, appendStreamContent, setContextInfo,
  } = useChatStore();

  const { openRouterKey, defaultModel, maxTokens, advancedMode, language, aiMode, setTemperature, writingGenre, setWritingGenre, adaptiveMemory } = useSettingsStore();
  const { sendMessage, abort } = useOpenRouter();
  const { profile } = useAuthStore();

  const subscriptionTier = profile?.subscriptionTier || 'free';
  const canUseGenres = subscriptionTier === 'novelist' || subscriptionTier === 'architect';
  const canUseEcho = subscriptionTier === 'architect';

  const [input, setInput] = useState('');
  const [showModeSelect, setShowModeSelect] = useState(false);
  const [hoveredMode, setHoveredMode] = useState<string | null>(null);
  const [modeDescPos, setModeDescPos] = useState<{ top: number; right: number } | null>(null);
  const [showGenreSelect, setShowGenreSelect] = useState(false);
  const [hoveredGenre, setHoveredGenre] = useState<WritingGenre | null>(null);
  const [genreDescPos, setGenreDescPos] = useState<{ top: number; right: number } | null>(null);
  const [lastUserInput, setLastUserInput] = useState('');
  const [showTierModal, setShowTierModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync activeGenre from persisted writingGenre on load / when it changes externally
  useEffect(() => {
    setActiveGenre(writingGenre);
  }, [writingGenre, setActiveGenre]);

  // Load sessions when book changes
  useEffect(() => {
    if (!activeBook) return;
    let cancelled = false;
    async function load() {
      const sess = await getChatSessionsByBook(activeBook!.id);
      if (cancelled) return;
      setSessions(sess);
      if (sess.length > 0) {
        const mostRecent = sess[sess.length - 1];
        setActiveSessionId(mostRecent.id);
        const msgs = await getChatHistoryBySession(mostRecent.id);
        if (!cancelled) setMessages(msgs);
      } else {
        const newSess = await createChatSession(activeBook!.id, 'Chat');
        if (cancelled) return;
        setSessions([newSess]);
        setActiveSessionId(newSess.id);
        setMessages([]);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [activeBook?.id, setSessions, setActiveSessionId, setMessages]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamContent]);

  const handleModeChange = (mode: AIMode) => {
    setActiveMode(mode);
    setShowModeSelect(false);
    if (!advancedMode) {
      const modeConfig = MODES.find(m => m.id === mode);
      if (modeConfig) {
        setTemperature(modeConfig.baseTemp);
      }
    }
  };

  const handleGenreChange = (genre: WritingGenre) => {
    if (genre !== 'general' && !canUseGenres) {
      toast('Genre tuning is reserved for Novelist tier and above.', 'error');
      return;
    }
    setActiveGenre(genre);
    setWritingGenre(genre);
    setShowGenreSelect(false);
  };

  const handleNewSession = async () => {
    if (!activeBook) return;
    const title = `Chat ${sessions.length + 1}`;
    const newSess = await createChatSession(activeBook.id, title);
    addSession(newSess);
    setActiveSessionId(newSess.id);
    setMessages([]);
    setContextInfo({ characters: 0, summaries: 0, tokens: 0 });
  };

  const handleSwitchSession = async (sessionId: string) => {
    if (isStreaming) {
      abort();
      setIsStreaming(false);
      setStreamContent('');
    }
    setActiveSessionId(sessionId);
    const msgs = await getChatHistoryBySession(sessionId);
    setMessages(msgs);
    setContextInfo({ characters: 0, summaries: 0, tokens: 0 });
  };

  const handleDeleteSession = async (sessionId: string) => {
    await deleteChatSession(sessionId);
    removeSessionFromStore(sessionId);
    if (activeSessionId === sessionId) {
      const remaining = sessions.filter(s => s.id !== sessionId);
      if (remaining.length > 0) {
        const next = remaining[remaining.length - 1];
        setActiveSessionId(next.id);
        const msgs = await getChatHistoryBySession(next.id);
        setMessages(msgs);
      } else if (activeBook) {
        const newSess = await createChatSession(activeBook.id, 'Chat');
        addSession(newSess);
        setActiveSessionId(newSess.id);
        setMessages([]);
      }
    }
  };

  const handleRetry = async (msg: ChatMessage) => {
    setInput(lastUserInput);
    const withoutError = messages.filter(m => m.id !== msg.id);
    setMessages(withoutError);
    await deleteChatMessage(msg.id);
  };

  const handleSend = async () => {
    if (!input.trim() || !activeBook || !activeChapter || isStreaming) return;
    if (aiMode === 'byok' && !openRouterKey) {
      toast('Please set your OpenRouter API key in Settings.', 'error');
      return;
    }
    if (!activeSessionId) {
      toast('No active chat session.', 'error');
      return;
    }

    const trimmedInput = input.trim();
    setLastUserInput(trimmedInput);

    const userMsg: ChatMessage = {
      id: generateId(),
      bookId: activeBook.id,
      sessionId: activeSessionId,
      role: 'user',
      content: trimmedInput,
      mode: activeMode,
      genre: activeGenre,
      timestamp: Date.now(),
    };

    addMessage(userMsg);
    await addChatMessage({
      bookId: activeBook.id,
      sessionId: activeSessionId,
      role: 'user',
      content: trimmedInput,
      mode: activeMode,
      genre: activeGenre,
    });

    const activeSession = sessions.find(s => s.id === activeSessionId);
    if (activeSession && (activeSession.title === 'Chat' || activeSession.title.startsWith('Chat ')) && messages.length === 0) {
      const newTitle = input.trim().slice(0, 30) + (input.trim().length > 30 ? '...' : '');
      await updateChatSession(activeSessionId, { title: newTitle });
      setSessions(sessions.map(s => s.id === activeSessionId ? { ...s, title: newTitle } : s));
    }

    setInput('');
    setIsStreaming(true);
    setStreamContent('');

    let styleProfile: string | undefined;
    if (adaptiveMemory && canUseEcho) {
      const profile = await getStyleProfile(activeBook.id);
      styleProfile = profile?.content;
    }

    const packet = buildContextPacket({
      mode: activeMode,
      genre: activeGenre,
      styleProfile,
      book: activeBook,
      currentChapter: activeChapter,
      allChapters: chapters,
      allCharacters: characters,
      loreBibleContent: loreBible?.content || {},
      userMessage: input.trim(),
      chatHistory: messages,
      model: defaultModel,
      maxTokens,
      language,
    });

    setContextInfo(packet.contextInfo);

    const aiMsg: ChatMessage = {
      id: generateId(),
      bookId: activeBook.id,
      sessionId: activeSessionId,
      role: 'assistant',
      content: '',
      mode: activeMode,
      genre: activeGenre,
      timestamp: Date.now(),
    };
    addMessage(aiMsg);

    let fullContent = '';
    let hasError = false;
    let errorMsg = '';

    try {
      await sendMessage(
        packet.system,
        packet.messages,
        (chunk) => {
          fullContent += chunk;
          appendStreamContent(chunk);
        },
        (error) => {
          hasError = true;
          errorMsg = error;
          const isTokenLimit =
            error.includes('Token limit reached') ||
            error.includes('token limit') ||
            error.includes('limit reached') ||
            error.includes('429') ||
            error.includes('insufficient_quota');
          if (isTokenLimit) {
            if (subscriptionTier === 'architect') {
              toast('Your weekly token allowance has been exhausted. Tokens reset every 7 days.', 'error');
            } else {
              toast('Token limit reached. Upgrade your plan to continue.', 'error');
              setShowTierModal(true);
            }
          }
        },
        activeMode
      );
    } catch (err) {
      hasError = true;
      errorMsg = err instanceof Error ? err.message : String(err);
      console.error('[Chat] sendMessage threw:', err);
      toast('An unexpected error occurred. Please try again.', 'error');
    } finally {
      setIsStreaming(false);
      setStreamContent('');
    }

    const finalContent = hasError
      ? (fullContent || streamContent || '') + '\n\n[Error: ' + errorMsg + ']'
      : (fullContent || streamContent || 'No response received.');

    await addChatMessage({
      bookId: activeBook.id,
      sessionId: activeSessionId,
      role: 'assistant',
      content: finalContent,
      mode: activeMode,
      genre: activeGenre,
    });

    updateLastMessage(finalContent);
  };

  if (!activeBook) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 p-6 text-center">
        <Bot className="w-12 h-12 mb-3" />
        <p className="text-sm">Open a book to chat with Morpheus</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-gray-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">MORPHEUS</h2>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleNewSession}
              className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium px-2 py-1 rounded hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
            >
              <Plus className="w-3 h-3" />
              New Chat
            </button>
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
        </div>

        <ChatSessionList
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSwitch={handleSwitchSession}
          onDelete={handleDeleteSession}
        />

        <ModeSelector
          activeMode={activeMode}
          show={showModeSelect}
          hoveredMode={hoveredMode}
          modeDescPos={modeDescPos}
          onToggle={() => { setShowModeSelect(!showModeSelect); setShowGenreSelect(false); }}
          onSelect={handleModeChange}
          onHover={(mode, pos) => { setHoveredMode(mode); if (pos) setModeDescPos(pos); }}
        />

        <GenreSelector
          activeGenre={activeGenre}
          show={showGenreSelect}
          hoveredGenre={hoveredGenre}
          genreDescPos={genreDescPos}
          canUseGenres={canUseGenres}
          onToggle={() => { setShowGenreSelect(!showGenreSelect); setShowModeSelect(false); }}
          onSelect={handleGenreChange}
          onHover={(genre, pos) => { setHoveredGenre(genre); if (pos) setGenreDescPos(pos); }}
        />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <Bot className="w-10 h-10 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Ask Morpheus anything about your story...
            </p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <ChatMessageBubble
            key={msg.id}
            msg={msg}
            isStreaming={isStreaming}
            isLast={idx === messages.length - 1}
            streamContent={streamContent}
            lastUserInput={lastUserInput}
            onRetry={handleRetry}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Context Indicator */}
      {contextInfo.tokens > 0 && (
        <div className="px-3 py-1.5 border-t border-gray-200 dark:border-slate-800 flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${
            contextInfo.tokens < 4000 ? 'bg-emerald-500' :
            contextInfo.tokens < 8000 ? 'bg-amber-500' : 'bg-red-500'
          }`} />
          <span className="text-xs text-gray-500 dark:text-gray-500">
            {contextInfo.characters} chars, {contextInfo.summaries} summaries, ~{contextInfo.tokens.toLocaleString()} tokens
          </span>
        </div>
      )}

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={handleSend}
        disabled={isStreaming}
      />

      <AISettings />

      {showTierModal && (
        <TierSelectorModal
          currentTier={subscriptionTier}
          onClose={() => setShowTierModal(false)}
        />
      )}
    </div>
  );
}
