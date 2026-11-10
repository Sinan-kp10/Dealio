import { useEffect, useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../components/common/pagination/Pagination";
import Select from "../../../components/common/select/Select";
import useDebounce from "../../../hook/useDebounce";
import { handleApiError } from "../../../utils/errorHandler";
import { getPendingEnterprises } from "../services/enterprise-approvals.service";
import type { PendingEnterprise } from "../types/enterprise-approvals.types";
import { EnterpriseApprovalCard } from "../components/EnterpriseApprovalCard";
import { EnterpriseApprovalCardSkeleton } from "../components/EnterpriseApprovalCardSkeleton";
import { getCategories } from "../../category-management/sevices/category-management.service";

const PAGE_LIMIT = 12;
const SKELETON_CARDS = [1, 2, 3, 4, 5, 6];

export function EnterpriseApprovalsPage() {
    const navigate = useNavigate();
    const [enterprises, setEnterprises] = useState<PendingEnterprise[]>([]);
    const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("ALL");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        let cancelled = false;

        const loadCategories = async () => {
            try {
                const response = await getCategories({ page: 1, limit: 100 });
                if (!cancelled && response.data?.items) {
                    const names = response.data.items.map((c) => c.name);
                    setCategoryOptions(names);
                }
            } catch(error) {
                handleApiError(error, "Unable to load categories")
                
            }
        };

        void loadCategories();
        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        let cancelled = false;

        const fetchApprovals = async () => {
            setLoading(true);
            try {
                const response = await getPendingEnterprises({
                    search: debouncedSearch.trim() || undefined,
                    category: category === "ALL" ? undefined : category,
                    page,
                    limit: PAGE_LIMIT,
                });

                if (cancelled) return;

                setEnterprises(response.data.items);
                setTotalPages(response.data.totalPages);
                setTotalItems(response.data.total);


            } catch (error) {
                if (cancelled) return;
                handleApiError(error, "Unable to load enterprise approval requests")
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        void fetchApprovals();

        return () => {
            cancelled = true;
        };
    }, [debouncedSearch, category, page]);

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const handleCategoryChange = (value: string) => {
        setCategory(value);
        setPage(1);
    };

    const handleViewDetails = (id: string) => {
        navigate(`/admin/enterprise-approvals/${id}`);
    };

    return (
        <div className="w-full space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <div className="flex items-center gap-2.5">
                        <h1 className="text-2xl sm:text-[1.75rem] font-bold text-[#0F1D2F] tracking-tight leading-tight m-0">
                            Enterprise Approvals
                        </h1>
                        {!loading && totalItems > 0 && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#edf4fb] text-[#204066] border border-[#204066]/15">
                                pending {totalItems}
                            </span>
                        )}
                    </div>
                    <p className="text-slate-500 text-sm sm:text-[0.9375rem] mt-1 m-0">
                        Review and verify enterprise registration and onboarding requests.
                    </p>
                </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 sm:flex-initial">
                    <Search
                        size={16}
                        className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                    <input
                        type="search"
                        value={search}
                        onChange={(event) => handleSearchChange(event.target.value)}
                        placeholder="Search by enterprise, contact, or email"
                        aria-label="Search enterprise requests"
                        className="w-full sm:w-[380px] md:w-[420px] h-10 pl-10 pr-3.5 bg-white border border-slate-200/90 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#355982]/20 focus:border-[#355982] shadow-xs transition-colors [&::-webkit-search-cancel-button]:cursor-pointer"
                    />
                </div>

                <Select
                    value={category}
                    onChange={handleCategoryChange}
                    aria-label="Filter by category"
                    options={[
                        { label: "Category: All", value: "ALL" },
                        ...categoryOptions.map((cat) => ({
                            label: cat,
                            value: cat,
                        })),
                    ]}
                />
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {SKELETON_CARDS.map((key) => (
                        <EnterpriseApprovalCardSkeleton key={key} />
                    ))}
                </div>
            ) : enterprises.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {enterprises.map((item) => (
                        <EnterpriseApprovalCard
                            key={item.id}
                            enterprise={item}
                            onViewDetails={handleViewDetails}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs">
                    
                    <h3 className="text-base font-bold text-slate-800 m-0">
                        No pending requests found
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        {debouncedSearch || category !== "ALL"
                            ? "No enterprise requests match your search or filter criteria."
                            : "There are currently no enterprise registration requests awaiting review."}
                    </p>
                    {(debouncedSearch || category !== "ALL") && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearch("");
                                setCategory("ALL");
                                setPage(1);
                            }}
                            className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#204066] bg-[#edf4fb] hover:bg-[#dbe9f6] transition-colors cursor-pointer"
                        >
                            <RefreshCw size={13} />
                            <span>Reset Filters</span>
                        </button>
                    )}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 0 && (
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={(newPage) => setPage(newPage)}
                    variant="standalone"
                />
            )}
        </div>
    );
}

export default EnterpriseApprovalsPage;

