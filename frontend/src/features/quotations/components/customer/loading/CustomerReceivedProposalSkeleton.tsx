export function CustomerReceivedProposalSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4 animate-pulse">
      <div className="space-y-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5 flex-1">
            <div className="h-4 w-40 bg-slate-200 rounded" />
            <div className="h-3 w-24 bg-slate-100 rounded" />
          </div>
          <div className="h-6 w-20 bg-slate-100 rounded-full" />
        </div>

        <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200/80 space-y-2">
          <div className="flex justify-between">
            <div className="h-3 w-16 bg-slate-200 rounded" />
            <div className="h-3 w-20 bg-slate-100 rounded" />
          </div>
          <div className="h-7 w-28 bg-slate-200 rounded" />
        </div>

        <div className="flex gap-2">
          <div className="h-6 w-20 bg-slate-100 rounded-lg" />
          <div className="h-6 w-28 bg-slate-100 rounded-lg" />
        </div>

        <div className="space-y-1.5">
          <div className="h-3.5 w-48 bg-slate-200 rounded" />
          <div className="h-3 w-full bg-slate-100 rounded" />
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex gap-2">
        <div className="h-9 flex-1 bg-slate-100 rounded-xl" />
        <div className="h-9 flex-1 bg-slate-200 rounded-xl" />
      </div>
    </div>
  );
}

export default CustomerReceivedProposalSkeleton;
