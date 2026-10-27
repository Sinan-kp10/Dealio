import { Search, ChevronDown } from "lucide-react";
import Pagination from "../../../components/common/pagination/Pagination";
import TableSkeleton from "../../../components/common/loading/TableSkeleton";
import { useEffect, useState } from "react";
import type { Customer, CustomerStatus } from "../types/user-management.types";
import axios from "axios";
import { toast } from "react-toastify";
import ReasonModal from "../../../components/common/ReasonModal/ReasonModel";
import ConfirmationModal from "../../../components/common/confirmationModel/ConfirmationModal";
import { getCustomers, reactivateCustomerAccount, suspendCustomerAccount } from "../service/user-management.service";

const PAGE_LIMIT = 5;

function CustomerManagementPage() {
    const [customer, setCustomer] = useState<Customer[]>([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<"ALL" | CustomerStatus>("ALL");
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const fetchCustomer = async () => {
            setLoading(true)
            try {
                const response = await getCustomers({
                    search: search.trim() || undefined,
                    status: status === "ALL" ? undefined : status,
                    page,
                    limit: PAGE_LIMIT,
                });

                if (cancelled) return;

                setCustomer(response.data.items);
                setTotalPages(response.data.totalPages)

            } catch (error) {

                if (cancelled) return

                if (axios.isAxiosError(error)) {
                    toast.error(error.response?.data?.message ?? "Unable to load customers");
                } else {
                    toast.error("Something went wrong. Please try again.");
                }

            } finally {

                if (!cancelled) {
                    setLoading(false);
                }
            }
        };
        void fetchCustomer();

        return () => {
            cancelled = true;
        };
    }, [search, status, page]);

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const handleStatusChange = (value: "ALL" | CustomerStatus) => {
        setStatus(value);
        setPage(1);
    };

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    const handleSuspend = async (reason: string) => {
        if (!selectedCustomer) return;
        try {
            setActionLoading(true);
            await suspendCustomerAccount(selectedCustomer.id, reason);
            toast.success("Customer suspended successfully");
            setCustomer((prev) =>
                prev.map((c) =>
                    c.id === selectedCustomer.id
                        ? { ...c, status: "SUSPENDED" }
                        : c
                )
            );
            setSelectedCustomer(null);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "Unable to suspend customer");
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            setActionLoading(false);
        }
    };

    const handleReactivate = async () => {
        if (!selectedCustomer) return;
        try {
            setActionLoading(true);
            await reactivateCustomerAccount(selectedCustomer.id);
            toast.success("Customer reactivated successfully");
            setCustomer((prev) =>
                prev.map((c) =>
                    c.id === selectedCustomer.id
                        ? { ...c, status: "ACTIVE" }
                        : c
                )
            );
            setSelectedCustomer(null);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "Unable to reactivate customer");
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
                Customer Management
                </h1>
                <p className="text-slate-500 text-sm sm:text-[0.9375rem] mt-1.5 m-0">
                Manage customers across the Dealio platform.
                </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="relative flex-1 sm:flex-initial">
                    <Search size={16}  className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"/>
                    <input
                        type="search"
                        value={search}
                        onChange={(event) => handleSearchChange(event.target.value)}
                        placeholder="Search by name, email or phone"
                        aria-label="Search customers"
                        className="w-full sm:w-[330px] h-10 pl-10 pr-3.5 bg-white border border-slate-200/90 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#355982]/20 focus:border-[#355982] shadow-xs transition-colors [&::-webkit-search-cancel-button]:cursor-pointer"
                    />
                </div>

                <div className="relative">
                    <select 
                        value={status}
                        onChange={(event) => handleStatusChange(event.target.value as "ALL" | CustomerStatus)}
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
            </div>

            <div className="w-full bg-white rounded-xl shadow-[0_2px_8px_rgba(15,30,60,0.04),0_0_1px_rgba(15,30,60,0.08)] border border-slate-200/80 overflow-hidden">
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[840px]">
                        <thead>
                            <tr className="bg-[#2d5178] text-white">
                                <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider uppercase">User</th>
                                <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider uppercase">Email</th>
                                <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider uppercase">Phone Number</th>
                                <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider uppercase">Account Created</th>
                                <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider uppercase text-center">Status</th>
                                <th className="py-3.5 px-6 text-[11px] font-bold tracking-wider uppercase text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <TableSkeleton rows={PAGE_LIMIT} columns={6} />
                            ) : customer.length === 0 ? (
                                <tr>
                                <td colSpan={6} className="py-12 text-center">
                                    <p className="text-sm font-medium text-slate-600 m-0">
                                    No customers found
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1 m-0">
                                    Try changing your search or status filter.
                                    </p>
                                </td>
                                </tr>
                            ) : (
                                customer.map((customer) => (
                                <tr key={customer.id}className="hover:bg-slate-50/60 transition-colors">
 
                                    <td className="py-4 px-6 align-middle">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#eef4fa] border border-[#d2e2f0] text-[#244673] flex items-center justify-center shrink-0 shadow-2xs">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
                                            </svg>
                                        </div>

                                        <span className="font-bold text-[#0F1D2F] text-[13.5px] whitespace-nowrap">
                                            {customer.name}
                                        </span>
                                    </div>
                                    </td>

                                    <td className="py-4 px-6 text-sm text-slate-600 whitespace-nowrap align-middle">
                                        {customer.email}
                                    </td>

                                    <td className="py-4 px-6 text-sm text-slate-700 font-medium whitespace-nowrap align-middle">
                                        {customer.phone ?? "-"}
                                    </td>

                                    <td className="py-4 px-6 text-sm text-slate-600 whitespace-nowrap align-middle">
                                        {formatDate(customer.createdAt)}
                                    </td>

                                    <td className="py-4 px-6 text-center align-middle whitespace-nowrap">
                                        {customer.status === "ACTIVE" ? (
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
                                        onClick={() => setSelectedCustomer(customer)}
                                        disabled={actionLoading}
                                        className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer shadow-2xs min-w-[78px] disabled:opacity-50 disabled:cursor-not-allowed ${
                                            customer.status === "ACTIVE"
                                            ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                                            : "bg-white border-red-200 text-[#e04f5f] hover:bg-red-50/50 hover:border-red-300"
                                        }`}
                                        >
                                        {customer.status === "ACTIVE" ? "Suspend" : "Reactivate"}
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

            {selectedCustomer && selectedCustomer.status === "ACTIVE" && (
                <ReasonModal
                    title="Suspend Customer Account"
                    description={`Provide a reason for suspending ${selectedCustomer.name}'s account.`}
                    onClose={() => setSelectedCustomer(null)}
                    onConfirm={handleSuspend}
                />
            )}

            <ConfirmationModal
                isOpen={Boolean(selectedCustomer && selectedCustomer.status === "SUSPENDED")}
                title="Reactivate Customer Account"
                message={`Are you sure you want to reactivate ${selectedCustomer?.name}'s account?`}
                onClose={() => setSelectedCustomer(null)}
                onConfirm={handleReactivate}
            />
        </div>
    );
}

export default CustomerManagementPage;