import { useState, useRef, useEffect } from 'react';
import {
  Compass, Search, Network, Sparkles, Send, Bot, User, Lock,
  Loader2, Plus, Trash2, MessageSquare, AlertTriangle, RefreshCw
} from 'lucide-react';
import CustomSelect from '@/components/common/CustomSelect';
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
import { STANDARD_MODELS, PREMIUM_MODELS, MODEL_DESCRIPTIONS, DEFAULT_STANDARD_MODEL, DEFAULT_PREMIUM_MODEL } from '@/lib/models';
import type { AIMode, ChatMessage } from '@/types';

const MODES: { id: AIMode; label: string; icon: typeof Compass; color: string; baseTemp: number; adj: number }[] = [
  { id: 'companion', label: "Scribe's Companion", icon: Compass, color: 'text-primary-600 dark:text-primary-400', baseTemp: 0.7, adj: 0 },
  { id: 'continuity', label: 'Continuity Keeper', icon: Search, color: 'text-amber-600 dark:text-amber-400', baseTemp: 0.5, adj: -0.2 },
  { id: 'plotWeaver', label: 'Plot Weaver', icon: Network, color: 'text-violet-600 dark:text-violet-400', baseTemp: 0.75, adj: 0.05 },
  { id: 'twistForge', label: 'Twist Forge', icon: Sparkles, color: 'text-rose-600 dark:text-rose-400', baseTemp: 0.85, adj: 0.15 },
];

const MODE_DESCRIPTIONS: Record<string, string> = {
  companion: 'Your everyday writing partner. Great for prose refinement, dialogue polishing, scene expansion, and general creative feedback.',
  continuity: 'The lore guardian. Cross-checks your story against the lore bible, flags contradictions, and hunts for forgotten plot threads.',
  plotWeaver: 'The narrative architect. Helps weave new ideas into your existing structure, suggests connections, and explores ripple effects.',
  twistForge: 'The creative provocateur. Generates bold, unexpected plot twists grounded in your existing characters and world.',
};

export default function RightSidebar() {
  const { activeBook, chapters, characters, loreBible } = useBookStore();
  const { activeChapter } = useEditorStore();
  const {
    messages, sessions, activeSessionId, activeMode, isStreaming, streamContent, contextInfo,
    setMessages, addMessage, updateLastMessage, setSessions, addSession, deleteSession: removeSessionFromStore,
    setActiveSessionId, setActiveMode, setIsStreaming,
    setStreamContent, appendStreamContent, setContextInfo,
  } = useChatStore();

  const { openRouterKey, defaultModel, temperature: _temperature, maxTokens, advancedMode, language, setTemperature } = useSettingsStore();
  const { sendMessage } = useOpenRouter();

  const [input, setInput] = useState('');
  const [showModeSelect, setShowModeSelect] = useState(false);
  const [hoveredMode, setHoveredMode] = useState<string | null>(null);
  const [modeDescPos, setModeDescPos] = useState<{ top: number; right: number } | null>(null);
  const [lastUserInput, setLastUserInput] = useState('');
  const modeMenuRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
        // Create default session
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
    setActiveSessionId(sessionId);
    const msgs = await getChatHistoryBySession(sessionId);
    setMessages(msgs);
    setContextInfo({ characters: 0, summaries: 0, tokens: 0 });
  };

  const handleDeleteSession = async (sessionId: string) => {
    if (!confirm('Delete this chat session?')) return;
    await deleteChatSession(sessionId);
    removeSessionFromStore(sessionId);
    // If we deleted the active session, switch to another
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

  const handleSend = async () => {
    if (!input.trim() || !activeBook || !activeChapter || isStreaming) return;
    if (!openRouterKey) {
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
      id: crypto.randomUUID(),
      bookId: activeBook.id,
      sessionId: activeSessionId,
      role: 'user',
      content: trimmedInput,
      mode: activeMode,
      timestamp: Date.now(),
    };

    addMessage(userMsg);
    await addChatMessage({
      bookId: activeBook.id,
      sessionId: activeSessionId,
      role: 'user',
      content: trimmedInput,
      mode: activeMode,
    });

    // Update session title from first user message if it's still generic
    const activeSession = sessions.find(s => s.id === activeSessionId);
    if (activeSession && (activeSession.title === 'Chat' || activeSession.title.startsWith('Chat ')) && messages.length === 0) {
      const newTitle = input.trim().slice(0, 30) + (input.trim().length > 30 ? '...' : '');
      await updateChatSession(activeSessionId, { title: newTitle });
      setSessions(sessions.map(s => s.id === activeSessionId ? { ...s, title: newTitle } : s));
    }

    setInput('');
    setIsStreaming(true);
    setStreamContent('');

    const packet = buildContextPacket({
      mode: activeMode,
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
      id: crypto.randomUUID(),
      bookId: activeBook.id,
      sessionId: activeSessionId,
      role: 'assistant',
      content: '',
      mode: activeMode,
      timestamp: Date.now(),
    };
    addMessage(aiMsg);

    let fullContent = '';

    await sendMessage(
      packet.system,
      packet.messages,
      (chunk) => {
        fullContent += chunk;
        appendStreamContent(chunk);
      },
      (error) => {
        fullContent = `Error: ${error}`;
      },
      activeMode
    );

    const finalContent = fullContent || streamContent || 'No response received.';
    await addChatMessage({
      bookId: activeBook.id,
      sessionId: activeSessionId,
      role: 'assistant',
      content: finalContent,
      mode: activeMode,
    });

    updateLastMessage(finalContent);
    setIsStreaming(false);
    setStreamContent('');
  };

  const activeModeConfig = MODES.find(m => m.id === activeMode);
  const ModeIcon = activeModeConfig?.icon || Compass;

  if (!activeBook) {
    return (
      <aside className="w-96 panel border-l flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 p-6 text-center">
        <Bot className="w-12 h-12 mb-3" />
        <p className="text-sm">Open a book to chat with Morpheus</p>
      </aside>
    );
  }

  return (
    <aside className="w-96 panel border-l flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-gray-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">MORPHEUS</h2>
          </div>
          <button
            onClick={handleNewSession}
            className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium px-2 py-1 rounded hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
          >
            <Plus className="w-3 h-3" />
            New Chat
          </button>
        </div>

        {/* Session list */}
        {sessions.length > 0 && (
          <div className="mb-2 max-h-20 overflow-y-auto space-y-0.5">
            {sessions.map(session => (
              <div
                key={session.id}
                className={`group flex items-center gap-1.5 px-2 py-1 rounded text-xs cursor-pointer transition-colors ${
                  session.id === activeSessionId
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                    : 'hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                <MessageSquare className="w-3 h-3 shrink-0" />
                <span
                  className="flex-1 truncate"
                  onClick={() => handleSwitchSession(session.id)}
                >
                  {session.title}
                </span>
                {sessions.length > 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteSession(session.id); }}
                    className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-opacity"
                    title="Delete session"
                  >
                    <Trash2 className="w-3 h-3 text-red-400" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Mode Selector */}
        <div className="relative">
          <button
            onClick={() => setShowModeSelect(!showModeSelect)}
            className="w-full flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-slate-800 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <ModeIcon className={`w-4 h-4 ${activeModeConfig?.color}`} />
            <span className="flex-1 text-left">{activeModeConfig?.label}</span>
            <span className="text-xs text-gray-400">▼</span>
          </button>

          {showModeSelect && (
            <div ref={modeMenuRef} className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-10 overflow-hidden">
              {MODES.map(mode => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.id}
                    onClick={() => { handleModeChange(mode.id); setHoveredMode(null); setModeDescPos(null); }}
                    onMouseEnter={() => {
                      setHoveredMode(mode.id);
                      if (modeMenuRef.current) {
                        const rect = modeMenuRef.current.getBoundingClientRect();
                        setModeDescPos({ top: rect.top, right: window.innerWidth - rect.left + 8 });
                      }
                    }}
                    onMouseLeave={() => setHoveredMode(null)}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors ${
                      activeMode === mode.id ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${mode.color}`} />
                    <div className="text-left">
                      <div className="font-medium">{mode.label}</div>
                      <div className="text-xs text-gray-400">
                        Temp: {mode.baseTemp}{mode.adj > 0 ? ` (+${mode.adj})` : mode.adj < 0 ? ` (${mode.adj})` : ''}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Mode description panel — fixed positioned to escape sidebar clipping */}
          {showModeSelect && hoveredMode && MODE_DESCRIPTIONS[hoveredMode] && modeDescPos && (
            <div
              className="fixed z-[100] w-56 p-3 rounded-lg border shadow-lg bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700"
              style={{ top: modeDescPos.top, right: modeDescPos.right }}
            >
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {MODE_DESCRIPTIONS[hoveredMode]}
              </p>
            </div>
          )}
        </div>
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

        {messages.map((msg, idx) => {
          const isLast = idx === messages.length - 1;
          const showStream = isLast && msg.role === 'assistant' && isStreaming;
          const isError = msg.role === 'assistant' && msg.content.startsWith('Error:');

          return (
            <div
              key={msg.id}
              className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user'
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                  : isError
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                msg.role === 'user'
                  ? 'bg-primary-600 text-white'
                  : isError
                    ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200'
              }`}>
                {showStream ? (
                  <div>
                    {streamContent || <Loader2 className="w-4 h-4 animate-spin" />}
                  </div>
                ) : isError ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span className="font-medium">Something went wrong</span>
                    </div>
                    <p className="text-xs opacity-90 whitespace-pre-wrap">{msg.content.slice(6).trim()}</p>
                    {lastUserInput && (
                      <button
                        onClick={async () => {
                          setInput(lastUserInput);
                          // Remove the error message
                          const withoutError = messages.filter(m => m.id !== msg.id);
                          setMessages(withoutError);
                          await deleteChatMessage(msg.id);
                        }}
                        className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded bg-red-200 dark:bg-red-800 hover:bg-red-300 dark:hover:bg-red-700 transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" /> Retry
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                )}
              </div>
            </div>
          );
        })}
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

      {/* Input */}
      <div className="p-3 border-t border-gray-200 dark:border-slate-800">
        <div className="flex gap-2">
          <textarea
            className="textarea flex-1 h-10 min-h-[40px] max-h-32 resize-y"
            placeholder="Ask Morpheus..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            disabled={isStreaming}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            className="btn-primary self-end p-2.5"
          >
            {isStreaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* AI Settings */}
      <AISettings />
    </aside>
  );
}

/* ---------- AI Settings ---------- */
function AISettings() {
  const {
    defaultModel, temperature, maxTokens, advancedMode, modelTier, aiMode,
    setDefaultModel, setTemperature, setMaxTokens, setAdvancedMode, setModelTier,
  } = useSettingsStore();
  const { profile } = useAuthStore();

  const subscriptionTier = profile?.subscriptionTier || 'free';
  const canUsePremium = aiMode === 'byok' || subscriptionTier === 'novelist' || subscriptionTier === 'architect';

  const currentTierModels = modelTier === 'standard' ? STANDARD_MODELS : PREMIUM_MODELS;

  const handleTierChange = (tier: 'standard' | 'premium') => {
    if (tier === 'premium' && !canUsePremium) {
      toast('Premium models are reserved for Novelist tier and above.', 'error');
      return;
    }
    setModelTier(tier);
    const models = tier === 'standard' ? STANDARD_MODELS : PREMIUM_MODELS;
    const stillValid = models.some((m) => m.value === defaultModel);
    if (!stillValid) {
      setDefaultModel(tier === 'standard' ? DEFAULT_STANDARD_MODEL : DEFAULT_PREMIUM_MODEL);
    }
  };

  return (
    <div className="p-3 border-t border-gray-200 dark:border-slate-800 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          AI Settings
        </h3>
        <div className="flex items-center gap-1.5 relative group">
          <span className={`text-xs font-medium transition-colors ${
            modelTier === 'standard' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-600'
          }`}>
            Standard
          </span>
          <button
            type="button"
            onClick={() => handleTierChange(modelTier === 'standard' ? 'premium' : 'standard')}
            className={`relative w-9 h-5 rounded-full transition-colors ${
              modelTier === 'standard' ? 'bg-emerald-500' : 'bg-purple-500'
            } ${!canUsePremium ? 'opacity-60 cursor-not-allowed' : ''}`}
            aria-label="Toggle model tier"
            disabled={!canUsePremium && modelTier === 'standard'}
          >
            <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
              modelTier === 'premium' ? 'translate-x-4' : ''
            }`} />
          </button>
          <span className={`text-xs font-medium transition-colors ${
            modelTier === 'premium' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400 dark:text-gray-600'
          }`}>
            Premium
          </span>

          {!canUsePremium && (
            <div className="absolute -top-7 right-0 px-2 py-0.5 bg-gray-800 dark:bg-gray-700 text-white text-[9px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              Premium models reserved for Novelist+
            </div>
          )}
        </div>
      </div>

      {!canUsePremium && modelTier === 'premium' && (
        <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <Lock className="w-3 h-3 text-amber-500" />
          <span className="text-[10px] text-amber-700 dark:text-amber-400">
            Premium locked. Upgrade to Novelist to unlock.
          </span>
        </div>
      )}

      <div className="space-y-2">
        <CustomSelect
          value={defaultModel}
          options={currentTierModels}
          descriptions={MODEL_DESCRIPTIONS}
          onChange={(val) => setDefaultModel(val)}
        />

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs text-gray-500">Temperature</label>
            <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
              <input
                type="checkbox"
                checked={advancedMode}
                onChange={(e) => setAdvancedMode(e.target.checked)}
                className="rounded accent-primary-600"
              />
              Advanced
            </label>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            disabled={!advancedMode}
            className="w-full accent-primary-600 disabled:opacity-50"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>0</span>
            <span className={advancedMode ? 'text-primary-600 font-medium' : ''}>{temperature.toFixed(2)}</span>
            <span>1</span>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-gray-500">Max Tokens</label>
          <input
            type="range"
            min={512}
            max={4096}
            step={256}
            value={maxTokens}
            onChange={(e) => setMaxTokens(parseInt(e.target.value))}
            className="w-full accent-primary-600"
          />
          <div className="text-xs text-gray-400 text-right">{maxTokens}</div>
        </div>
      </div>
    </div>
  );
}
