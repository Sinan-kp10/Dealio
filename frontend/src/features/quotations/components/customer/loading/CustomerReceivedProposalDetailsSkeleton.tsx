export function CustomerReceivedProposalDetailsSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-3 w-20 bg-slate-200 rounded" />
          <div className="h-6 w-48 sm:w-64 bg-slate-200 rounded-lg" />
          <div className="h-4 w-32 bg-slate-100 rounded" />
        </div>
        <div className="h-6 w-24 bg-slate-100 rounded-full" />
      </div>

      <div className="flex flex-wrap gap-2.5">
        <div className="h-8 w-28 bg-slate-100 rounded-xl" />
        <div className="h-8 w-36 bg-slate-100 rounded-xl" />
        <div className="h-8 w-32 bg-slate-100 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="h-20 bg-slate-50 border border-slate-200/80 rounded-xl" />
        <div className="h-20 bg-slate-50 border border-slate-200/80 rounded-xl" />
        <div className="h-20 bg-slate-50 border border-slate-200/80 rounded-xl" />
      </div>

      <div className="h-28 bg-slate-50 border border-slate-200/80 rounded-2xl" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="h-16 bg-slate-50 border border-slate-200/80 rounded-xl" />
        <div className="h-16 bg-slate-50 border border-slate-200/80 rounded-xl" />
      </div>
    </div>
  );
}

export default CustomerReceivedProposalDetailsSkeleton;
