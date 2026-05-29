import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled: boolean;
  maxLength?: number;
}

export default function ChatInput({ value, onChange, onSend, disabled, maxLength = 4000 }: ChatInputProps) {
  return (
    <div className="p-3 border-t border-gray-200 dark:border-slate-800">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <textarea
            className="textarea w-full h-10 min-h-[40px] max-h-32 resize-y pr-16"
            placeholder="Ask Morpheus..."
            value={value}
            maxLength={maxLength}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            disabled={disabled}
          />
          <span className={`absolute bottom-1 right-2 text-[10px] ${value.length > maxLength * 0.875 ? 'text-red-500' : 'text-gray-400 dark:text-gray-600'}`}>
            {value.length}/{maxLength}
          </span>
        </div>
        <button
          onClick={onSend}
          disabled={!value.trim() || disabled}
          className="btn-primary self-end p-2.5"
        >
          {disabled ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
