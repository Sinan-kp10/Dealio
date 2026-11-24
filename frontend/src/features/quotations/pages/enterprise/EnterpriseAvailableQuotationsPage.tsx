import { useState, useEffect } from "react";
import { Search, FileText } from "lucide-react";
import { toast } from "react-toastify";
import { Pagination } from "../../../../components/common/pagination/Pagination";
import { Select } from "../../../../components/common/select/Select";
import { EnterpriseAvailableQuotationCard } from "../../components/enterprise/EnterpriseAvailableQuotationCard";
import { EnterpriseAvailableQuotationSkeleton } from "../../components/enterprise/loading/EnterpriseAvailableQuotationSkeleton";
import { getAvailableEnterpriseQuotations } from "../../services/enterprise-quotation.service";
import type { AvailableQuotation, AvailableQuotationStatus } from "../../types/enterprise-available-quotation.types";
import useDebounce from "../../../../hook/useDebounce";
import { handleApiError } from "../../../../utils/errorHandler";

const PAGE_SIZE = 6;
const SKELETON_ITEMS = [1, 2, 3, 4, 5, 6];

const STATUS_OPTIONS = [
  { label: "Status: All", value: "ALL" },
  { label: "Status: Open", value: "OPEN" },
  { label: "Status: Proposal Sent", value: "PROPOSAL_SENT" },
  { label: "Status: Closed", value: "CLOSED" },
  { label: "Status: Cancelled", value: "CANCELLED" },
];

export function EnterpriseAvailableQuotationsPage() {
  const [quotations, setQuotations] = useState<AvailableQuotation[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(searchQuery, 400);

  useEffect(() => {
    let cancelled = false;

    const fetchQuotations = async () => {
      setLoading(true);
      try {
        const response = await getAvailableEnterpriseQuotations({
          search: debouncedSearch.trim() || undefined,
          status: selectedStatus === "ALL" ? undefined : (selectedStatus as AvailableQuotationStatus),
          page: currentPage,
          limit: PAGE_SIZE,
        });

        if (cancelled) return;

        setQuotations(response.data.items);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        if (!cancelled) {
          handleApiError(error, "Failed to load quotation requests");
        }
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
  }, [debouncedSearch, selectedStatus, currentPage]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  const handleChat = (item: AvailableQuotation) => {
    toast.info(`Opening chat with customer for "${item.productName}"...`);
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0e2238] tracking-tight m-0">
          Quotation Requests
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 m-0">
          Customer inquiries matching your enterprise categories. Review requirements, inspect full specifications, and submit proposals.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:w-80 md:w-96">
          <Search
            size={16}
            className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by product name..."
            aria-label="Search quotation requests"
            className="w-full h-10 pl-10 pr-3.5 bg-white border border-slate-200/90 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#355982]/20 focus:border-[#355982] shadow-xs transition-colors [&::-webkit-search-cancel-button]:cursor-pointer"
          />
        </div>

        <Select
          value={selectedStatus}
          onChange={handleStatusChange}
          aria-label="Filter by status"
          options={STATUS_OPTIONS}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKELETON_ITEMS.map((key) => (
            <EnterpriseAvailableQuotationSkeleton key={key} />
          ))}
        </div>
      ) : quotations.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <FileText size={24} />
          </div>
          <h3 className="text-base font-bold text-[#0e2238] m-0">No Quotations Found</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto m-0">
            No quotation requests matched your filters. Try clearing your search or selecting another status.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {quotations.map((item) => (
              <EnterpriseAvailableQuotationCard
                key={item.id}
                item={item}
                onChat={handleChat}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            variant="standalone"
          />
        </div>
      )}
    </div>
  );
}

export default EnterpriseAvailableQuotationsPage;
