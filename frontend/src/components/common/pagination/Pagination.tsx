export interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage = 1, totalPages = 20, onPageChange, className = ""}: PaginationProps) {
    return (
        <div
        className={`border-t border-slate-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white ${className}`}
        aria-label="Pagination Navigation"
        >
        {/* Showing page info */}
        <p className="text-xs sm:text-sm text-slate-500 font-normal m-0">
            Showing {currentPage} of {totalPages} pages
        </p>

        {/* Pagination controls */}
        <nav className="flex items-center gap-1.5" aria-label="Pagination">
            <button
                type="button"
                onClick={() => onPageChange?.(currentPage - 1)}
                disabled={currentPage <= 1}
                className="h-8 px-3 text-xs sm:text-sm font-medium text-slate-400 bg-white border border-slate-200/80 rounded-lg hover:text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-slate-400 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
            Previous
            </button>

            <button
                type="button"
                onClick={() => onPageChange?.(1)}
                aria-current={currentPage === 1 ? "page" : undefined}
                className={`h-8 min-w-[32px] px-2.5 text-xs sm:text-sm rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                    currentPage === 1
                    ? "bg-[#244673] border border-[#244673] text-white font-semibold shadow-xs"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                }`}
            >
            1
            </button>

            <span className="h-8 min-w-[24px] flex items-center justify-center text-xs sm:text-sm text-slate-400 select-none">
            ...
            </span>

            <button
                type="button"
                onClick={() => onPageChange?.(totalPages)}
                aria-current={currentPage === totalPages ? "page" : undefined}
                className={`h-8 min-w-[32px] px-2.5 text-xs sm:text-sm rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                    currentPage === totalPages
                    ? "bg-[#244673] border border-[#244673] text-white font-semibold shadow-xs"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                }`}
            >
            {totalPages}
            </button>

            <button
                type="button"
                onClick={() => onPageChange?.(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="h-8 px-3 text-xs sm:text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:text-slate-900 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-slate-400 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
            Next
            </button>
        </nav>
        </div>
    );
}

export default Pagination;
