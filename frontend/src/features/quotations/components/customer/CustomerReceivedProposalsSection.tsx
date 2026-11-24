import { useState, useEffect } from "react";
import { ArrowLeftRight, Search, RotateCcw } from "lucide-react";
import { toast } from "react-toastify";
import { CustomerReceivedProposalCard } from "./CustomerReceivedProposalCard";
import { CustomerReceivedProposalSkeleton } from "./loading/CustomerReceivedProposalSkeleton";
import { CustomerReceivedProposalDetailsDrawer } from "./CustomerReceivedProposalDetailsDrawer";
import { Pagination } from "../../../../components/common/pagination/Pagination";
import { getCustomerReceivedProposals } from "../../services/quotation.service";
import { handleApiError } from "../../../../utils/errorHandler";
import useDebounce from "../../../../hook/useDebounce";
import type { CustomerReceivedProposal } from "../../types/customer-received-proposal.types";

interface CustomerReceivedProposalsSectionProps {
  quotationId: string;
  onProposalAccepted?: () => void;
}
const PAGE_LIMIT = 9;

export function CustomerReceivedProposalsSection({quotationId, onProposalAccepted}: CustomerReceivedProposalsSectionProps) {
  const [proposals, setProposals] = useState<CustomerReceivedProposal[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    if (!quotationId) return;

    let cancelled = false;

    const fetchProposals = async () => {
      setLoading(true);
      try {
        const response = await getCustomerReceivedProposals(quotationId, {
          page: currentPage,
          limit: PAGE_LIMIT,
          search: debouncedSearch.trim() || undefined,
        });
        if (cancelled) return;
        setProposals(response.data.items ?? []);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        if (cancelled) return;
        handleApiError(error, "Failed to load received proposals");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchProposals();

    return () => {
      cancelled = true;
    };
  }, [quotationId, debouncedSearch, currentPage, refreshKey]);

  const handleCompareProposals = () => {
    toast.info("Proposal comparison will be available here soon");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="relative w-full sm:w-80 md:w-96">
          <Search
            size={16}
            className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by enterprise or item..."
            aria-label="Search received proposals"
            className="w-full h-10 pl-10 pr-3.5 bg-white border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#355982]/20 focus:border-[#355982] shadow-2xs transition-colors [&::-webkit-search-cancel-button]:cursor-pointer"
          />
        </div>

        <button
          type="button"
          onClick={handleCompareProposals}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-[#1e3a5f] bg-[#edf4fb] hover:bg-[#e0effa] border border-[#b8d6f2] hover:border-[#8bbce8] active:scale-[0.98] rounded-xl transition-all shadow-2xs cursor-pointer shrink-0 self-stretch sm:self-auto"
        >
          <ArrowLeftRight size={15} strokeWidth={2.4} className="text-[#204066]" />
          <span>Compare Proposals</span>
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((key) => (
            <CustomerReceivedProposalSkeleton key={key} />
          ))}
        </div>
      ) : proposals.length === 0 && !debouncedSearch ? (
        <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[340px] sm:min-h-[380px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <h3 className="text-base sm:text-lg font-bold text-[#0e2238] m-0 tracking-tight">
            No Proposals Received Yet
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-2 leading-relaxed m-0 font-normal">
            Enterprises matching your product category are reviewing your quotation request. You will be notified when proposals arrive.
          </p>
        </div>
      ) : proposals.length === 0 ? (
        <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[340px] sm:min-h-[380px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-400 flex items-center justify-center mb-3 shadow-2xs">
            <Search size={18} strokeWidth={2} className="text-slate-400" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#0e2238] m-0 tracking-tight">
            No proposals matching "{debouncedSearch}"
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-2 leading-relaxed m-0 font-normal">
            Try checking for typos or searching with different keywords.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCurrentPage(1);
            }}
            className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1e3a5f] bg-[#edf4fb] hover:bg-[#e2effa] border border-[#d3e4f5] rounded-lg transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
          >
            <RotateCcw size={12} strokeWidth={2.2} className="text-[#1e3a5f]" />
            <span>Clear Search</span>
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...proposals]
              .sort((a, b) => {
                if (a.status === "ACCEPTED") return -1;
                if (b.status === "ACCEPTED") return 1;
                return 0;
              })
              .map((proposal) => (
                <CustomerReceivedProposalCard
                  key={proposal.id}
                  proposal={proposal}
                  onViewDetails={setSelectedProposalId}
                />
              ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              variant="standalone"
            />
          )}
        </>
      )}

      <CustomerReceivedProposalDetailsDrawer
        isOpen={Boolean(selectedProposalId)}
        onClose={() => setSelectedProposalId(null)}
        quotationId={quotationId}
        proposalId={selectedProposalId}
        onProposalAccepted={() => {
          setRefreshKey((prev) => prev + 1);
          onProposalAccepted?.();
        }}
      />
    </div>
  );
}

export default CustomerReceivedProposalsSection;
