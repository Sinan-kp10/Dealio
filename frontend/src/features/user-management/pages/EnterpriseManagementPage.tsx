import { Search, ChevronDown } from "lucide-react";
import Pagination from "../../../components/common/pagination/Pagination";
import TableSkeleton from "../../../components/common/loading/TableSkeleton";
import { useEffect, useState } from "react";
import type { Enterprise, EnterpriseStatus } from "../types/enterprise-management.types";
import axios from "axios";
import { toast } from "react-toastify";
import ReasonModal from "../../../components/common/ReasonModal/ReasonModel";
import ConfirmationModal from "../../../components/common/confirmationModel/ConfirmationModal";
import { getEnterprise, reactivateEnterpriseAccount, suspendEnterpriseAccount } from "../service/user-management.service";

const PAGE_LIMIT = 1;

export function EnterpriseManagementPage() {
    const [enterprise, setEnterprise] = useState<Enterprise[]>([]);
    const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<"ALL" | EnterpriseStatus>("ALL");
    const [category, setCategory] = useState("ALL");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedEnterprise, setSelectedEnterprise] = useState<Enterprise | null>(null);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const fetchEnterprise = async () => {
            setLoading(true);
            try {
                const response = await getEnterprise({
                    search: search.trim() || undefined,
                    status: status === "ALL" ? undefined : status,
                    category: category === "ALL" ? undefined : category,
                    page,
                    limit: PAGE_LIMIT,
                });

                if (cancelled) return;

                setEnterprise(response.data.items);
                setTotalPages(response.data.totalPages);
                setCategoryOptions((prev) => {
                    const next = new Set(prev);
                    response.data.items.forEach((item) => {
                        if (item.category) next.add(item.category);
                    });
                    return Array.from(next);
                });

            } catch (error) {

                if (cancelled) return;

                if (axios.isAxiosError(error)) {
                    toast.error(error.response?.data?.message ?? "Unable to load enterprises");
                } else {
                    toast.error("Something went wrong. Please try again.");
                }

            } finally {

                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        void fetchEnterprise();

        return () => {
            cancelled = true;
        };
    }, [search, status, category, page]);

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const handleStatusChange = (value: "ALL" | EnterpriseStatus) => {
        setStatus(value);
        setPage(1);
    };

    const handleCategoryChange = (value: string) => {
        setCategory(value);
        setPage(1);
    };

    const handleSuspend = async (reason: string) => {
        if (!selectedEnterprise) return;
        try {
            setActionLoading(true);
            await suspendEnterpriseAccount(selectedEnterprise.id, reason);
            toast.success("Enterprise suspended successfully");
            setEnterprise((prev) =>
                prev.map((e) =>
                    e.id === selectedEnterprise.id
                        ? { ...e, status: "SUSPENDED" }
                        : e
                )
            );
            setSelectedEnterprise(null);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "Unable to suspend enterprise");
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            setActionLoading(false);
        }
    };

    const handleReactivate = async () => {
        if (!selectedEnterprise) return;
        try {
            setActionLoading(true);
            await reactivateEnterpriseAccount(selectedEnterprise.id);
            toast.success("Enterprise reactivated successfully");
            setEnterprise((prev) =>
                prev.map((e) =>
                    e.id === selectedEnterprise.id
                        ? { ...e, status: "ACTIVE" }
                        : e
                )
            );
            setSelectedEnterprise(null);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "Unable to reactivate enterprise");
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="w-full">
            <div className="mb-6">
                <h1 className="text-2xl sm:text-[1.75rem] font-bold text-[#0F1D2F] tracking-tight leading-tight m-0">
                    Enterprise Management
                </h1>
                <p className="text-slate-500 text-sm sm:text-[0.9375rem] mt-1.5 m-0">
                    Manage approved enterprises on the Dealio platform.
                </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="relative flex-1 sm:flex-initial">
                    <Search size={16} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                        type="search"
                        value={search}
                        onChange={(event) => handleSearchChange(event.target.value)}
                        placeholder="Search by name, email, or phone"
                        aria-label="Search enterprises"
                        className="w-full sm:w-[330px] h-10 pl-10 pr-3.5 bg-white border border-slate-200/90 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#355982]/20 focus:border-[#355982] shadow-xs transition-colors [&::-webkit-search-cancel-button]:cursor-pointer"
                    />
                </div>

                <div className="relative">
                    <select
                        value={status}
                        onChange={(event) => handleStatusChange(event.target.value as "ALL" | EnterpriseStatus)}
                        aria-label="Filter by status"
                        className="h-10 pl-3.5 pr-8 bg-white border border-slate-200/90 rounded-lg text-sm text-slate-700 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#355982]/20 focus:border-[#355982] shadow-xs cursor-pointer"
                    >
                        <option value="ALL">Status: All</option>
                        <option value="ACTIVE">Status: Active</option>
                        <option value="SUSPENDED">Status: Suspended</option>
                    </select>
                    <ChevronDown
                        size={15}
                        className="text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                </div>

                <div className="relative">
                    <select
                        value={category}
                        onChange={(event) => handleCategoryChange(event.target.value)}
                        aria-label="Filter by category"
                        className="h-10 pl-3.5 pr-8 bg-white border border-slate-200/90 rounded-lg text-sm text-slate-700 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#355982]/20 focus:border-[#355982] shadow-xs cursor-pointer"
                    >
                        <option value="ALL">Category: All</option>
                        {categoryOptions.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                    <ChevronDown
                        size={15}
                        className="text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                </div>
            </div>

            <div className="w-full bg-white rounded-xl shadow-[0_2px_8px_rgba(15,30,60,0.04),0_0_1px_rgba(15,30,60,0.08)] border border-slate-200/80 overflow-hidden">
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[840px]">
                        <thead>
                            <tr className="bg-[#2d5178] text-white">
                                <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider uppercase">Enterprise</th>
                                <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider uppercase">Category</th>
                                <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider uppercase">Phone Number</th>
                                <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider uppercase text-center">Status</th>
                                <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider uppercase text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <TableSkeleton rows={PAGE_LIMIT} columns={5} />
                            ) : enterprise.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center">
                                        <p className="text-sm font-medium text-slate-600 m-0">
                                            No enterprises found
                                        </p>
                                        <p className="text-xs text-slate-400 mt-1 m-0">
                                            Try changing your search, status, or category filter.
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                enterprise.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                                        <td className="py-4 px-6 align-middle">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-[#eef4fa] border border-[#d2e2f0] text-[#244673] flex items-center justify-center shrink-0 shadow-2xs">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                        <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
                                                    </svg>
                                                </div>

                                                <div className="flex flex-col">
                                                    <span className="font-bold text-[#0F1D2F] text-[13.5px] whitespace-nowrap">
                                                        {item.enterpriseName}
                                                    </span>
                                                    <span className="text-xs text-slate-500 whitespace-nowrap mt-0.5">
                                                        {item.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-4 px-6 text-sm text-slate-700 font-medium whitespace-nowrap align-middle">
                                            {item.category ?? "-"}
                                        </td>

                                        <td className="py-4 px-6 text-sm text-slate-700 font-medium whitespace-nowrap align-middle">
                                            {item.phone ?? "-"}
                                        </td>

                                        <td className="py-4 px-6 text-center align-middle whitespace-nowrap">
                                            {item.status === "ACTIVE" ? (
                                                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-md bg-[#eaf8f1] text-[#22a06b]">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-md bg-[#fef1f2] text-[#e04f5f]">
                                                    Suspended
                                                </span>
                                            )}
                                        </td>

                                        <td className="py-4 px-6 text-center align-middle whitespace-nowrap">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    type="button"
                                                    className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer min-w-[62px]"
                                                >
                                                    View
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedEnterprise(item)}
                                                    disabled={actionLoading}
                                                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer shadow-2xs min-w-[78px] disabled:opacity-50 disabled:cursor-not-allowed ${
                                                        item.status === "ACTIVE"
                                                            ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                                                            : "bg-white border-red-200 text-[#e04f5f] hover:bg-red-50/50 hover:border-red-300"
                                                    }`}
                                                >
                                                    {item.status === "ACTIVE" ? "Suspend" : "Reactivate"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 0 && (
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                )}
            </div>

            {selectedEnterprise && selectedEnterprise.status === "ACTIVE" && (
                <ReasonModal
                    title="Suspend Enterprise Account"
                    description={`Provide a reason for suspending ${selectedEnterprise.enterpriseName}'s account.`}
                    onClose={() => setSelectedEnterprise(null)}
                    onConfirm={handleSuspend}
                />
            )}

            <ConfirmationModal
                isOpen={Boolean(selectedEnterprise && selectedEnterprise.status === "SUSPENDED")}
                title="Reactivate Enterprise Account"
                message={`Are you sure you want to reactivate ${selectedEnterprise?.enterpriseName}'s account?`}
                onClose={() => setSelectedEnterprise(null)}
                onConfirm={handleReactivate}
                loading={actionLoading}
            />
        </div>
    );
}

export default EnterpriseManagementPage;
