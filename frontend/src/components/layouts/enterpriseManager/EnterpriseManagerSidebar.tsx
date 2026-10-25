import { LayoutDashboard, FileText, SquareCheckBig, MessageSquare, CreditCard, BriefcaseBusiness, LogOut, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../../features/auth/services/auth.service";

interface EnterpriseManagerSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EnterpriseManagerSidebar({ isOpen, onClose }: EnterpriseManagerSidebarProps) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
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
                fixed inset-y-0 left-0 z-50 w-72 bg-white flex flex-col justify-between p-4 shadow-2xl transition-transform duration-300 ease-in-out
                lg:static lg:z-auto lg:w-64 lg:shadow-none lg:border-r lg:border-slate-200/80 lg:min-h-[calc(100vh-68px)] lg:translate-x-0
                ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
                aria-label="Enterprise Manager Navigation"
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

                    <nav
                        className="flex flex-col gap-1.5"
                        aria-label="Enterprise Manager navigation"
                    >
                        <NavLink
                            to="/enterprise"
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
                            to="/enterprise/quotations"
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
                                <FileText
                                    size={18}
                                    className={`shrink-0 transition-colors ${
                                    isActive
                                        ? "text-[#204066]"
                                        : "text-slate-400 group-hover:text-slate-600"
                                    }`}
                                />
                                <span>Quotation Requests</span>
                                </>
                            )}
                        </NavLink>

                        <NavLink
                            to="/enterprise/accepted-requests"
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
                                <SquareCheckBig
                                    size={18}
                                    className={`shrink-0 transition-colors ${
                                    isActive
                                        ? "text-[#204066]"
                                        : "text-slate-400 group-hover:text-slate-600"
                                    }`}
                                />
                                <span>Accepted Requests</span>
                                </>
                            )}
                        </NavLink>

                        <NavLink
                            to="/enterprise/conversations"
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
                                <MessageSquare
                                    size={18}
                                    className={`shrink-0 transition-colors ${
                                    isActive
                                        ? "text-[#204066]"
                                        : "text-slate-400 group-hover:text-slate-600"
                                    }`}
                                />
                                <span>Conversations</span>
                                </>
                            )}
                        </NavLink>

                        <NavLink
                            to="/enterprise/financial-overview"
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
                                <CreditCard
                                    size={18}
                                    className={`shrink-0 transition-colors ${
                                    isActive
                                        ? "text-[#204066]"
                                        : "text-slate-400 group-hover:text-slate-600"
                                    }`}
                                />
                                <span>Financial Overview</span>
                                </>
                            )}
                        </NavLink>

                        <NavLink
                            to="/enterprise/company-profile"
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
                                <span>Company Profile</span>
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

export default EnterpriseManagerSidebar;
