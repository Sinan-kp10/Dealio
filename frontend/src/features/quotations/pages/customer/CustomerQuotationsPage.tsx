import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Eye, ChevronRight } from "lucide-react";
import { Select } from "../../../../components/common/select/Select";
import { Pagination } from "../../../../components/common/pagination/Pagination";
import useDebounce from "../../../../hook/useDebounce";
import useCategoryStore from "../../../../stores/category.store";
import { formatDate } from "../../../../utils/dateFormatter";
import { handleApiError } from "../../../../utils/errorHandler";
import { getCustomerQuotations } from "../../services/quotation.service";
import type { QuotationRequestListItem, QuotationRequestStatus } from "../../types/quotation.types";
import { QuotationCardSkeleton } from "../../components/customer/QuotationCardSkeleton";
import { StatusBadge } from "../../../../components/common/badge/StatusBadge";

const PAGE_LIMIT = 9;
const SKELETON_ITEMS = [1, 2, 3, 4, 5, 6];

export function CustomerQuotationsPage() {
  const navigate = useNavigate();
  const categories = useCategoryStore((state) => state.categories);

  const [quotations, setQuotations] = useState<QuotationRequestListItem[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    let cancelled = false;

    const fetchQuotations = async () => {
      setLoading(true);
      try {
        const response = await getCustomerQuotations({
          search: debouncedSearch.trim() || undefined,
          status: statusFilter === "ALL" ? undefined : (statusFilter as QuotationRequestStatus),
          categoryId: categoryFilter === "ALL" ? undefined : categoryFilter,
          page: currentPage,
          limit: PAGE_LIMIT,
        });

        if (cancelled) return;

        setQuotations(response.data.items);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        if (cancelled) return;
        handleApiError(error, "Failed to load quotation requests");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchQuotations();

    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, statusFilter, categoryFilter, currentPage]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleCategoryFilterChange = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  return (
    <div className="w-full space-y-6 pb-12 animate-in fade-in duration-200">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0e2238] tracking-tight leading-tight m-0">
            My Quotation Requests
          </h1>
        </div>
        <p className="text-slate-500 text-sm sm:text-[0.9375rem] mt-1.5 m-0">
          Manage, track, and review all your submitted quotation requests.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 sm:flex-initial">
            <Search
              size={16}
              className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search quotation requests..."
              aria-label="Search quotation requests"
              className="w-full sm:w-[280px] md:w-[320px] h-10 pl-10 pr-3.5 bg-white border border-slate-200/90 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#355982]/20 focus:border-[#355982] shadow-xs transition-colors [&::-webkit-search-cancel-button]:cursor-pointer"
            />
          </div>

          <Select
            value={categoryFilter}
            onChange={handleCategoryFilterChange}
            aria-label="Filter by category"
            options={[
              { label: "Category: All", value: "ALL" },
              ...categories.map((cat) => ({
                label: cat.name,
                value: cat.id,
              })),
            ]}
          />

          <Select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            aria-label="Filter by status"
            options={[
              { label: "Status: All", value: "ALL" },
              { label: "Status: Pending", value: "PENDING" },
              { label: "Status: Proposal Received", value: "PROPOSAL_RECEIVED" },
              { label: "Status: Accepted", value: "ACCEPTED" },
              { label: "Status: Completed", value: "COMPLETED" },
              { label: "Status: Cancelled", value: "CANCELLED" },
            ]}
          />
        </div>

        <button
          type="button"
          onClick={() => navigate("/customer/quotations/create")}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#1e3a5f] hover:bg-[#152a45] text-white text-sm font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer shrink-0 self-start sm:self-auto active:scale-[0.98]"
        >
          <Plus size={16} strokeWidth={2.4} />
          <span>Create Quotation</span>
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {SKELETON_ITEMS.map((key) => (
            <QuotationCardSkeleton key={key} />
          ))}
        </div>
      ) : quotations.length === 0 ? (
        <div className="w-full py-20 sm:py-28 text-center bg-white rounded-2xl border border-dashed border-slate-300 flex flex-col items-center justify-center px-4">
          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-400 mb-3">
            <Search size={22} className="text-slate-400" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#0e2238] m-0">
            No quotation requests found
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-md leading-relaxed m-0">
            We couldn't find any quotation requests matching your criteria. Try adjusting your search keywords or filter options.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {quotations.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                  <h2
                    className="text-base sm:text-[17px] font-bold text-[#0e2238] tracking-tight truncate leading-snug flex-1 min-w-0"
                    title={item.productName}
                  >
                    {item.productName}
                  </h2>
                  <div className="shrink-0">
                    <StatusBadge status={item.status} />
                  </div>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[11px] font-medium text-slate-400 block">Category</span>
                    <span className="font-semibold text-slate-800 truncate block">
                      {item.category.name}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-medium text-slate-400 block">Sub Category</span>
                    <span className="font-semibold text-slate-800 truncate block">
                      {item.subCategory.name}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-medium text-slate-400 block">Quantity</span>
                    <span className="font-semibold text-slate-800">{item.quantity} Units</span>
                  </div>

                  <div>
                    <span className="text-[11px] font-medium text-slate-400 block">Requested</span>
                    <span className="font-semibold text-slate-800">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    navigate(`/customer/quotations/${item.id}`);
                  }}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs sm:text-[13px] font-semibold text-[#1e3a5f] bg-[#edf4fb] hover:bg-[#e2effa] border border-[#d3e4f5] rounded-xl transition-colors cursor-pointer active:scale-[0.99]"
                >
                  <Eye size={14} className="text-[#1e3a5f]" />
                  <span>View Details</span>
                  <ChevronRight size={14} className="text-[#1e3a5f] ml-auto" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          variant="standalone"
        />
      )}
    </div>
  );
}

export default CustomerQuotationsPage;
