import { ArrowLeft, Video } from "lucide-react";

interface ChatHeaderProps {
  name: string;
  avatarUrl: string | null;
  onBack: () => void;
}

export function ChatHeader({ name, avatarUrl, onBack }: ChatHeaderProps) {
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

        <div className="w-10 h-10 rounded-full bg-[#2f5581] flex items-center justify-center text-white shrink-0 shadow-xs overflow-hidden">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
            </svg>
          )}
        </div>

        <div className="min-w-0">
          <h2 className="text-sm sm:text-base font-bold text-slate-800 truncate leading-tight">
            {name}
          </h2>
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
