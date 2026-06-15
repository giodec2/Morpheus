import { Bot, User, AlertTriangle, RefreshCw, Loader2 } from 'lucide-react';
import MarkdownContent from './MarkdownContent';
import { useI18n } from '@/i18n/useI18n';
import type { ChatMessage } from '@/types';

interface ChatMessageBubbleProps {
  msg: ChatMessage;
  isStreaming: boolean;
  isLast: boolean;
  streamContent: string;
  lastUserInput: string;
  onRetry: (msg: ChatMessage) => void;
}

export default function ChatMessageBubble({
  msg, isStreaming, isLast, streamContent, lastUserInput, onRetry,
}: ChatMessageBubbleProps) {
  const { t } = useI18n();
  const showStream = isLast && msg.role === 'assistant' && isStreaming;
  const isError = msg.role === 'assistant' && msg.content.startsWith('Error:');

  return (
    <div className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
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
            {streamContent ? (
              <MarkdownContent text={streamContent} />
            ) : (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
          </div>
        ) : isError ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span className="font-medium">{t('errors.somethingWentWrong')}</span>
            </div>
            <p className="text-xs opacity-90 whitespace-pre-wrap">{msg.content.slice(6).trim()}</p>
            {lastUserInput && (
              <button
                onClick={() => onRetry(msg)}
                className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded bg-red-200 dark:bg-red-800 hover:bg-red-300 dark:hover:bg-red-700 transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> {t('chat.retry')}
              </button>
            )}
          </div>
        ) : msg.role === 'assistant' ? (
          <MarkdownContent text={msg.content} />
        ) : (
          <div className="whitespace-pre-wrap">{msg.content}</div>
        )}
      </div>
    </div>
  );
}
