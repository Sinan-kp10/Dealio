export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 0) return null;

    const pages: (number | "...")[] = [];

    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i)
        }
    } else {
        pages.push(1);

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        if (start > 2) pages.push("...");
        for (let i = start; i <= end; i++) pages.push(i);
        if (end < totalPages - 1) pages.push("...");

        pages.push(totalPages);
    }

    return (
        <div className="border-t border-slate-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white"aria-label="Pagination Navigation">
            <p className="text-xs sm:text-sm text-slate-500 font-normal m-0">
                Showing {currentPage} of {totalPages} pages
            </p>

            <nav className="flex items-center gap-1.5" aria-label="Pagination">
                <button
                    type="button"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="h-8 px-3 text-xs sm:text-sm font-medium bg-white border border-slate-200/80 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-400 transition-colors cursor-pointer"
                >
                Previous
                </button>

                {pages.map((item, index) => {
                if (item === "...") {
                    return (
                    <span
                        key={`ellipsis-${index}`}
                        className="h-8 min-w-[24px] flex items-center justify-center text-xs sm:text-sm text-slate-400 select-none"
                    >
                        ...
                    </span>
                    );
                }

                const isActive = item === currentPage;

                return (
                    <button
                        key={item}
                        type="button"
                        onClick={() => onPageChange(item)}
                        aria-current={isActive ? "page" : undefined}
                        className={`h-8 min-w-[32px] px-2.5 text-xs sm:text-sm rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                            isActive
                            ? "bg-[#244673] border border-[#244673] text-white font-semibold shadow-xs"
                            : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                        }`}
                    >
                        {item}
                    </button>
                );
                })}

                <button
                    type="button"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="h-8 px-3 text-xs sm:text-sm font-medium bg-white border border-slate-200/80 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-400 transition-colors cursor-pointer"
                >
                Next
                </button>
            </nav>
        </div>
    )
}

export default Pagination;
