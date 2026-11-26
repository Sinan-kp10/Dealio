import { Loader2 } from "lucide-react";

export function ChatPanelSkeleton() {
  return (
    <div className="flex-1 flex flex-col bg-[#e6edf5]">
      <div className="p-3.5 sm:px-6 sm:py-3.5 bg-[#f4f7fb] border-b border-slate-200/90 flex items-center justify-between gap-3 shrink-0 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0" />
          <div className="h-4 w-36 bg-slate-200 rounded" />
        </div>
        <div className="h-8 w-24 bg-slate-200 rounded-xl" />
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <Loader2 size={24} className="animate-spin text-[#2f5581]" />
      </div>
      <div className="p-3 sm:p-3.5 border-t border-slate-200/90 bg-[#f4f7fb] flex items-center gap-2.5 shrink-0 animate-pulse">
        <div className="flex-1 h-10 bg-white rounded-xl" />
        <div className="h-10 w-20 bg-slate-200 rounded-xl" />
      </div>
    </div>
  );
}

export default ChatPanelSkeleton;
