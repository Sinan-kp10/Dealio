export function ChatPanelSkeleton() {
  return (
    <div className="flex-1 flex flex-col bg-[#e6edf5] animate-pulse">
      <div className="p-3.5 sm:px-6 sm:py-3.5 bg-[#f4f7fb] border-b border-slate-200/90 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0" />
          <div className="h-4 w-36 bg-slate-200 rounded" />
        </div>
        <div className="h-8 w-24 bg-slate-200 rounded-xl" />
      </div>
      <div className="flex-1 p-6 space-y-4">
        <div className="h-12 w-56 bg-white/80 rounded-2xl" />
        <div className="h-10 w-44 bg-[#2f5581]/20 rounded-2xl ml-auto" />
        <div className="h-14 w-64 bg-white/80 rounded-2xl" />
      </div>
      <div className="p-3 sm:p-3.5 border-t border-slate-200/90 bg-[#f4f7fb] flex items-center gap-2.5 shrink-0">
        <div className="flex-1 h-10 bg-white rounded-xl" />
        <div className="h-10 w-20 bg-slate-200 rounded-xl" />
      </div>
    </div>
  );
}

export default ChatPanelSkeleton;
