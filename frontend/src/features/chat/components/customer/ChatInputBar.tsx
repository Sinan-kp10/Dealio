import { Paperclip, Smile, Send } from "lucide-react";

interface ChatInputBarProps {
  placeholder?: string;
  onSend?: (message: string) => void;
}

export function ChatInputBar({placeholder = "Type a message"}: ChatInputBarProps) {
  return (
    <div className="relative z-10 p-2.5 sm:p-3.5 border-t border-slate-200/90 bg-[#f4f7fb] shadow-[0_-1px_2px_rgba(15,23,42,0.03)] shrink-0">
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* Attachment Icon Button */}
        <button
          type="button"
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer shrink-0"
          aria-label="Attach file"
        >
          <Paperclip size={18} />
        </button>

        {/* Emoji Icon Button */}
        <button
          type="button"
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer shrink-0"
          aria-label="Add emoji"
        >
          <Smile size={18} />
        </button>

        {/* Input Field */}
        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 min-w-0 h-10 px-3 sm:px-4 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-white border border-slate-200/90 rounded-xl focus:outline-none focus:border-[#2f5581] shadow-2xs"
        />

        {/* Send Button */}
        <button
          type="button"
          className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-5 h-10 bg-[#2f5581] hover:bg-[#25456b] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs cursor-pointer active:scale-[0.98] shrink-0"
          aria-label="Send message"
        >
          <span className="hidden sm:inline">Send</span>
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}

export default ChatInputBar;
