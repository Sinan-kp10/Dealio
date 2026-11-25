export function EnterpriseAcceptedProposalQuotationDrawerSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="pb-4 border-b border-slate-100 flex items-start justify-between gap-3">
        <div className="space-y-2 min-w-0">
          <div className="h-3.5 w-32 bg-slate-100 rounded" />
          <div className="h-7 w-52 sm:w-64 bg-slate-200 rounded-lg" />
          <div className="h-3.5 w-40 bg-slate-100 rounded" />
        </div>
        <div className="h-6 w-20 bg-slate-100 rounded-md shrink-0 mt-1" />
      </div>
      <div className="flex flex-wrap gap-2.5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-9 w-32 bg-slate-100 rounded-xl" />
        ))}
      </div>
      <div className="h-32 bg-slate-100/80 rounded-xl border border-slate-200/70" />
    </div>
  );
}

export default EnterpriseAcceptedProposalQuotationDrawerSkeleton;
