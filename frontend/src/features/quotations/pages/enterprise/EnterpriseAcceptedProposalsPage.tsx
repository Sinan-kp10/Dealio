import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SquareCheckBig } from "lucide-react";
import { Pagination } from "../../../../components/common/pagination/Pagination";
import { Select } from "../../../../components/common/select/Select";
import { EnterpriseAcceptedProposalCard } from "../../components/enterprise/EnterpriseAcceptedProposalCard";
import { EnterpriseAvailableQuotationSkeleton } from "../../components/enterprise/loading/EnterpriseAvailableQuotationSkeleton";
import { getEnterpriseAcceptedProposals } from "../../services/enterprise-quotation.service";
import useDebounce from "../../../../hook/useDebounce";
import { handleApiError } from "../../../../utils/errorHandler";
import type {
  AcceptedProposalStatus,
  EnterpriseAcceptedProposalListItem,
} from "../../types/enterprise-accepted-proposal.types";

const PAGE_SIZE = 9;
const SKELETON_ITEMS = [1, 2, 3, 4, 5, 6];

const STATUS_OPTIONS = [
  { label: "Status: All", value: "ALL" },
  { label: "Status: Accepted", value: "ACCEPTED" },
  { label: "Status: Paid", value: "PAID" },
  { label: "Status: Completed", value: "COMPLETED" },
];

export function EnterpriseAcceptedProposalsPage() {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState<EnterpriseAcceptedProposalListItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    let cancelled = false;

    const fetchAcceptedProposals = async () => {
      setLoading(true);
      try {
        const response = await getEnterpriseAcceptedProposals({
          search: debouncedSearch.trim() || undefined,
          status: selectedStatus === "ALL" ? undefined : (selectedStatus as AcceptedProposalStatus),
          page: currentPage,
          limit: PAGE_SIZE,
        });

        if (cancelled) return;

        setProposals(response.data.items);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        if (!cancelled) {
          handleApiError(error, "Failed to load accepted requests");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchAcceptedProposals();

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

  const handleChat = (item: EnterpriseAcceptedProposalListItem) => {
    navigate(`/enterprise/chat?targetId=${item.customerId}`);
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0e2238] tracking-tight m-0">
          Accepted Requests
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 m-0">
          Proposals accepted by customers. Track payment confirmation, coordinate fulfillment, and manage active deals.
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
            aria-label="Search accepted requests"
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
      ) : proposals.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-10 sm:p-14 text-center flex flex-col items-center justify-center shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="w-12 h-12 rounded-2xl bg-[#edf4fb] text-[#204066] flex items-center justify-center mb-3.5 border border-[#d8e7f5]">
            <SquareCheckBig size={22} />
          </div>
          <h3 className="text-base font-bold text-[#0e2238] m-0">No Accepted Requests Found</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md m-0">
            No accepted deals match your current search or status filter. Try clearing your filters to view all deals.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {proposals.map((item) => (
              <EnterpriseAcceptedProposalCard
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

export default EnterpriseAcceptedProposalsPage;
