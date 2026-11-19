const METADATA_PLACEHOLDERS = ["category", "subCategory", "quantity", "requestedDate"] as const;

export function QuotationCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4 animate-pulse">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="h-5 bg-slate-200 rounded-md w-1/2" />
          <div className="h-5 bg-slate-200 rounded-md w-16" />
        </div>

        <div className="space-y-2">
          <div className="h-3 bg-slate-200 rounded-md w-full" />
          <div className="h-3 bg-slate-200 rounded-md w-3/4" />
        </div>

        <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-3">
          {METADATA_PLACEHOLDERS.map((field) => (
            <div key={field} className="space-y-1">
              <div className="h-2.5 bg-slate-200 rounded-md w-1/3" />
              <div className="h-3.5 bg-slate-200 rounded-md w-2/3" />
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100">
        <div className="h-9 bg-slate-200 rounded-xl w-full" />
      </div>
    </div>
  );
}

export default QuotationCardSkeleton;
