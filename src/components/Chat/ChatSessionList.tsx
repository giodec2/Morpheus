import { useState } from 'react';
import { MessageSquare, Trash2, AlertTriangle } from 'lucide-react';
import type { ChatSession } from '@/types';

interface ChatSessionListProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSwitch: (sessionId: string) => void;
  onDelete: (sessionId: string) => void;
}

export default function ChatSessionList({ sessions, activeSessionId, onSwitch, onDelete }: ChatSessionListProps) {
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  if (sessions.length === 0) return null;

  return (
    <div className="mb-2 max-h-20 overflow-y-auto space-y-0.5">
      {sessions.map(session => {
        const isConfirming = confirmingId === session.id;
        return (
          <div
            key={session.id}
            className={`group flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-colors ${
              isConfirming
                ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                : session.id === activeSessionId
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 cursor-pointer'
                  : 'hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-400 cursor-pointer'
            }`}
          >
            {isConfirming ? (
              <>
                <AlertTriangle className="w-3 h-3 shrink-0 text-red-500" />
                <span className="flex-1 truncate text-red-700 dark:text-red-300 font-medium">
                  Delete &quot;{session.title}&quot;?
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); setConfirmingId(null); }}
                  className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(session.id); setConfirmingId(null); }}
                  className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                <MessageSquare className="w-3 h-3 shrink-0" />
                <span
                  className="flex-1 truncate"
                  onClick={() => onSwitch(session.id)}
                >
                  {session.title}
                </span>
                {sessions.length > 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setConfirmingId(session.id); }}
                    className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-opacity"
                    title="Delete session"
                  >
                    <Trash2 className="w-3 h-3 text-red-400" />
                  </button>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
