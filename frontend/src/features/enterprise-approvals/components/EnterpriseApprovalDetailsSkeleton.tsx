export function EnterpriseApprovalDetailsSkeleton() {
    return (
        <div className="w-full space-y-6 animate-pulse">
            {/* Top Card: Company Information Skeleton */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-5">
                <div className="pb-4 border-b border-slate-100">
                    <div className="w-48 h-6 bg-slate-200 rounded-md" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <div className="w-28 h-3 bg-slate-200 rounded" />
                        <div className="w-full h-10 bg-slate-100 rounded-xl" />
                    </div>
                    <div className="space-y-1.5">
                        <div className="w-28 h-3 bg-slate-200 rounded" />
                        <div className="w-full h-10 bg-slate-100 rounded-xl" />
                    </div>
                    <div className="space-y-1.5">
                        <div className="w-28 h-3 bg-slate-200 rounded" />
                        <div className="w-full h-10 bg-slate-100 rounded-xl" />
                    </div>
                    <div className="space-y-1.5">
                        <div className="w-28 h-3 bg-slate-200 rounded" />
                        <div className="w-full h-10 bg-slate-100 rounded-xl" />
                    </div>
                    <div className="space-y-1.5">
                        <div className="w-24 h-3 bg-slate-200 rounded" />
                        <div className="w-full h-10 bg-slate-100 rounded-xl" />
                    </div>
                    <div className="space-y-1.5">
                        <div className="w-32 h-3 bg-slate-200 rounded" />
                        <div className="w-full h-10 bg-slate-100 rounded-xl" />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <div className="w-36 h-3 bg-slate-200 rounded" />
                    <div className="w-full h-20 bg-slate-100 rounded-xl" />
                </div>
            </div>

            {/* Bottom Grid: KYC & Bank Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* KYC Skeleton */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                        <div className="w-44 h-6 bg-slate-200 rounded-md" />
                        <div className="w-20 h-7 bg-slate-200 rounded-lg" />
                    </div>
                    <div className="w-full h-10 bg-slate-100 rounded-xl" />
                    <div className="w-full h-10 bg-slate-100 rounded-xl" />
                    <div className="w-full h-10 bg-slate-100 rounded-xl" />
                    <div className="w-full h-14 bg-slate-100 rounded-xl" />
                </div>

                {/* Bank Skeleton */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                        <div className="w-44 h-6 bg-slate-200 rounded-md" />
                        <div className="w-20 h-7 bg-slate-200 rounded-lg" />
                    </div>
                    <div className="w-full h-10 bg-slate-100 rounded-xl" />
                    <div className="w-full h-10 bg-slate-100 rounded-xl" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="w-full h-10 bg-slate-100 rounded-xl" />
                        <div className="w-full h-10 bg-slate-100 rounded-xl" />
                    </div>
                    <div className="w-full h-10 bg-slate-100 rounded-xl" />
                </div>
            </div>
        </div>
    );
}

export default EnterpriseApprovalDetailsSkeleton;

