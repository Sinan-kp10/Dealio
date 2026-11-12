export function EnterpriseApprovalCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between animate-pulse">
            <div>
                <div className="flex items-center justify-between gap-3">
                    <div className="h-5 bg-slate-200 rounded-md w-1/2" />
                    <div className="h-5 bg-amber-100 rounded-full w-24" />
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 mt-4 grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                        <div className="h-3 bg-slate-200 rounded w-16" />
                        <div className="h-4 bg-slate-200 rounded w-24" />
                    </div>
                    <div className="space-y-1.5">
                        <div className="h-3 bg-slate-200 rounded w-16" />
                        <div className="h-4 bg-slate-200 rounded w-24" />
                    </div>
                    <div className="space-y-1.5">
                        <div className="h-3 bg-slate-200 rounded w-16" />
                        <div className="h-4 bg-slate-200 rounded w-28" />
                    </div>
                    <div className="space-y-1.5">
                        <div className="h-3 bg-slate-200 rounded w-16" />
                        <div className="h-4 bg-slate-200 rounded w-20" />
                    </div>
                </div>
            </div>

            <div className="h-10 bg-slate-200 rounded-xl mt-4 w-full" />
        </div>
    );
}

export default EnterpriseApprovalCardSkeleton;

