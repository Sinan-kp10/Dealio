import { LayoutDashboard, FileCheck, BriefcaseBusiness, Users, Menu, DollarSign, LogOut, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../../features/auth/services/auth.service";
import useAuthStore from "../../../features/auth/stores/auth.store";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    const navigate = useNavigate()
    const clearAuth = useAuthStore((state) => state.clearAuth)

    const handleLogout = async () => {
        try {
            await logout()
            clearAuth()
            toast.success("Successfully logged out");
            navigate("/login", { replace: true });
        } catch {
            toast.error("Failed to log out");
        }
    };

    return (
        <>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            <aside
                className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-white flex flex-col justify-between p-4 shadow-2xl transition-transform duration-300 ease-in-out overflow-y-auto
                lg:sticky lg:top-16 md:lg:top-[68px] lg:z-20 lg:w-64 lg:h-[calc(100vh-68px)] lg:shadow-none lg:border-r lg:border-slate-200/80 lg:translate-x-0 lg:overflow-y-auto
                ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
                aria-label="Admin Navigation"
            >
                <div className="flex flex-col">
 
                <div className="flex items-center justify-between pb-4 mb-2 border-b border-slate-100 lg:hidden">
                    <div className="flex items-center gap-2">
                        <img
                            src="/dealio-logo.png"
                            alt="Dealio"
                            className="h-7 w-auto object-contain"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        aria-label="Close navigation"
                        >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex flex-col gap-1.5" aria-label="Admin navigation">
    
                    <NavLink
                        to="/admin"
                        end
                        onClick={onClose}
                        className={({ isActive }) =>
                            `group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                            isActive
                                ? "bg-[#edf4fb] text-[#204066] font-semibold shadow-xs"
                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                            }`
                        }
                        >
                        {({ isActive }) => (
                            <>
                                <LayoutDashboard
                                    size={18}
                                    className={`shrink-0 transition-colors ${
                                    isActive
                                        ? "text-[#204066]"
                                        : "text-slate-400 group-hover:text-slate-600"
                                    }`}
                                />
                                <span>Dashboard</span>
                            </>
                        )}
                    </NavLink>

                    <NavLink
                        to="/admin/enterprise-approvals"
                        onClick={onClose}
                        className={({ isActive }) =>
                            `group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                            isActive
                                ? "bg-[#edf4fb] text-[#204066] font-semibold shadow-xs"
                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                            }`
                        }
                        >
                        {({ isActive }) => (
                            <>
                            <FileCheck
                                size={18}
                                className={`shrink-0 transition-colors ${
                                isActive
                                    ? "text-[#204066]"
                                    : "text-slate-400 group-hover:text-slate-600"
                                }`}
                            />
                            <span>Enterprise Approvals</span>
                            </>
                        )}
                    </NavLink>

                    {/* 3. Enterprise Management */}
                    <NavLink
                        to="/admin/enterprises"
                        onClick={onClose}
                        className={({ isActive }) =>
                            `group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                            isActive
                                ? "bg-[#edf4fb] text-[#204066] font-semibold shadow-xs"
                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                            }`
                        }
                        >
                        {({ isActive }) => (
                            <>
                            <BriefcaseBusiness
                                size={18}
                                className={`shrink-0 transition-colors ${
                                isActive
                                    ? "text-[#204066]"
                                    : "text-slate-400 group-hover:text-slate-600"
                                }`}
                            />
                            <span>Enterprise Management</span>
                            </>
                        )}
                    </NavLink>

                    <NavLink
                        to="/admin/customers"
                        onClick={onClose}
                        className={({ isActive }) =>
                            `group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                            isActive
                                ? "bg-[#edf4fb] text-[#204066] font-semibold shadow-xs"
                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                            }`
                        }
                        >
                        {({ isActive }) => (
                            <>
                            <Users
                                size={18}
                                className={`shrink-0 transition-colors ${
                                isActive
                                    ? "text-[#204066]"
                                    : "text-slate-400 group-hover:text-slate-600"
                                }`}
                            />
                            <span>Customer Management</span>
                            </>
                        )}
                    </NavLink>

                    <NavLink
                        to="/admin/categories"
                        onClick={onClose}
                        className={({ isActive }) =>
                            `group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                            isActive
                                ? "bg-[#edf4fb] text-[#204066] font-semibold shadow-xs"
                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                            }`
                        }
                        >
                        {({ isActive }) => (
                            <>
                            <Menu
                                size={18}
                                className={`shrink-0 transition-colors ${
                                isActive
                                    ? "text-[#204066]"
                                    : "text-slate-400 group-hover:text-slate-600"
                                }`}
                            />
                            <span>Category Management</span>
                            </>
                        )}
                    </NavLink>

                    <NavLink
                        to="/admin/payments"
                        onClick={onClose}
                        className={({ isActive }) =>
                            `group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                            isActive
                                ? "bg-[#edf4fb] text-[#204066] font-semibold shadow-xs"
                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                            }`
                        }
                        >
                        {({ isActive }) => (
                            <>
                            <DollarSign
                                size={18}
                                className={`shrink-0 transition-colors ${
                                isActive
                                    ? "text-[#204066]"
                                    : "text-slate-400 group-hover:text-slate-600"
                                }`}
                            />
                            <span>Payments</span>
                            </>
                        )}
                    </NavLink>
                </nav>
                </div>

                <div className="pt-4 border-t border-slate-200/80 mt-auto">
                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3.5 py-2.5 w-full rounded-xl text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50/50 transition-colors cursor-pointer text-left"
                >
                    <LogOut size={18} className="shrink-0" />
                    <span>Logout</span>
                </button>
                </div>
            </aside>
        </>
    );
}

export default AdminSidebar;
