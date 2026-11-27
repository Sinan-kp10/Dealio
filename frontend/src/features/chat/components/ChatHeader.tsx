import { ArrowLeft, Video } from "lucide-react";
import { ChatAvatar } from "./ChatAvatar";

interface ChatHeaderProps {
  name: string;
  avatarUrl: string | null;
  isOnline?: boolean;
  onBack: () => void;
}

export function ChatHeader({ name, avatarUrl, isOnline = false, onBack }: ChatHeaderProps) {
  return (
    <header className="relative z-10 p-3.5 sm:px-6 sm:py-3.5 bg-[#f4f7fb] border-b border-slate-200/90 shadow-[0_1px_2px_rgba(15,23,42,0.04)] flex items-center justify-between gap-3 shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onBack}
          className="md:hidden p-1.5 -ml-1 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
          aria-label="Back to chats list"
        >
          <ArrowLeft size={19} />
        </button>

        <ChatAvatar name={name} avatarUrl={avatarUrl} />

        <div className="min-w-0">
          <h2 className="text-sm sm:text-base font-bold text-slate-800 truncate leading-tight">
            {name}
          </h2>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                isOnline ? "bg-emerald-500" : "bg-slate-300"
              }`}
            />
            <span className="text-[11px] font-medium text-slate-500 leading-none">
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
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
