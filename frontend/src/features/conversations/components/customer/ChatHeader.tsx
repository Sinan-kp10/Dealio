import { ArrowLeft, FileText, Video } from "lucide-react";
import type { ConversationItem } from "../../types/conversation.types";

interface ChatHeaderProps {
  conversation: ConversationItem;
  onBack: () => void;
}

export function ChatHeader({ conversation, onBack }: ChatHeaderProps) {
  return (
    <header className="p-3.5 sm:px-6 sm:py-3.5 bg-[#f8fafc] border-b border-slate-200/80 flex items-center justify-between gap-3 shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="md:hidden p-1.5 -ml-1 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
          aria-label="Back to conversations list"
        >
          <ArrowLeft size={19} />
        </button>

        {/* Enterprise Profile Avatar Icon */}
        <div className="w-10 h-10 rounded-full bg-[#2f5581] flex items-center justify-center text-white shrink-0 shadow-xs overflow-hidden">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
          </svg>
        </div>

        {/* Enterprise Info */}
        <div className="min-w-0">
          <h2 className="text-sm sm:text-base font-bold text-slate-800 truncate leading-tight">
            {conversation.name}
          </h2>
          <p className="text-xs text-slate-500 truncate mt-0.5">
            {conversation.contactPerson}
          </p>
        </div>
      </div>

      {/* Header Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-semibold text-[#2f5581] bg-white hover:bg-slate-100/80 border border-slate-200/80 rounded-xl transition-all shadow-xs cursor-pointer active:scale-[0.98]"
        >
          <FileText size={14} className="text-[#2f5581]" />
          <span className="hidden sm:inline">View Request</span>
        </button>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-semibold text-white bg-[#2f5581] hover:bg-[#25456b] rounded-xl transition-all shadow-xs cursor-pointer active:scale-[0.98]"
        >
          <Video size={14} />
          <span className="hidden sm:inline">Video Call</span>
        </button>
      </div>
    </header>
  );
}

export default ChatHeader;
