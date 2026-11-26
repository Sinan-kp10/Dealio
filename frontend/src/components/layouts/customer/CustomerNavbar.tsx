import { useState, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {Bell,LogOut,UserRound,Settings,Plus,MessageCircleMore,Menu,X,Home,FileText,} from "lucide-react";
import useAuthStore from "../../../stores/auth.store";
import ConfirmationModal from "../../common/confirmationModel/ConfirmationModal";
import { NotificationDropdown } from "../../common/notification/NotificationDropdown";
import { useUnreadNotificationCount } from "../../../hook/useUnreadNotificationCount";
import { useClickOutside } from "../../../hook/useClickOutside";
import { useLogout } from "../../../hook/useLogout";

export function CustomerNavbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const profileRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);
    const user = useAuthStore((state) => state.user);
    const unreadCount = useUnreadNotificationCount();
    const { isLoggingOut, handleLogout } = useLogout();

    useClickOutside(profileRef, () => setIsProfileOpen(false));
    useClickOutside(notificationRef, () => setIsNotificationOpen(false));

    return (
        <header className="sticky top-0 z-30 w-full bg-white border-b border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div className="w-full px-4 sm:px-6 lg:px-8 h-16 md:h-[68px] flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center shrink-0">
                    <Link to="/customer" className="flex items-center gap-2 transition-transform duration-200 hover:scale-[1.01]" aria-label="Dealio home">
                        <img src="/dealio-logo.png" alt="Dealio" className="h-7 sm:h-8 w-auto object-contain"/>
                    </Link>
                </div>

                {/* Desktop Navigation & Actions (visible on md: and above) */}
                <div className="hidden md:flex items-center gap-3 lg:gap-5">
                    <nav className="flex items-center gap-1.5 lg:gap-2.5" aria-label="Customer quick navigation">
                        <NavLink
                            to="/customer"
                            end
                            className={({ isActive }) =>
                                `flex items-center px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
                                    isActive
                                        ? "bg-[#edf4fb] text-[#204066] font-semibold shadow-xs"
                                        : "text-slate-600 hover:text-[#204066] hover:bg-[#f0f6fc]"
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/customer/quotations"
                            end
                            className={({ isActive }) =>
                                `flex items-center px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
                                    isActive
                                        ? "bg-[#edf4fb] text-[#204066] font-semibold shadow-xs"
                                        : "text-slate-600 hover:text-[#204066] hover:bg-[#f0f6fc]"
                                }`
                            }
                        >
                            My Quotation Requests
                        </NavLink>
                    </nav>

                    <button
                        type="button"
                        onClick={() => navigate("/customer/quotations/create")}
                        className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 h-9 text-xs sm:text-[13px] font-semibold rounded-xl transition-all duration-150 cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.03)] active:scale-[0.98] ${
                            location.pathname === "/customer/quotations/create"
                                ? "bg-[#2f5581] text-white border border-[#2f5581]"
                                : "text-[#1e3a5f] bg-[#eef5fc] hover:bg-[#e4effa] border border-[#d3e4f5]"
                        }`}
                    >
                        <Plus size={15} strokeWidth={2.4} className={location.pathname === "/customer/quotations/create" ? "text-white" : "text-[#1e3a5f]"} />
                        <span>Create Quotation</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/customer/chat")}
                        className={`relative p-2.5 rounded-full transition-colors cursor-pointer ${
                            location.pathname.startsWith("/customer/chat")
                                ? "bg-[#edf4fb] text-[#183252]"
                                : "text-[#244673] hover:text-[#183252] hover:bg-[#f0f6fc]"
                        }`}
                        aria-label="Messages"
                        title="Messages"
                    >
                        <MessageCircleMore size={21} strokeWidth={2.2} className="text-[#244673]" />
                    </button>

                    <div className="relative" ref={notificationRef}>
                        <button
                            type="button"
                            onClick={() => {
                                setIsNotificationOpen((prev) => !prev);
                                setIsProfileOpen(false);
                            }}
                            className="relative p-2.5 text-[#244673] hover:text-[#183252] hover:bg-[#f0f6fc] rounded-full transition-colors cursor-pointer"
                            aria-label="Notifications"
                            aria-expanded={isNotificationOpen}
                        >
                            <Bell size={21} strokeWidth={2.2} className="text-[#244673]" />
                            {unreadCount > 0 && (
                                <span className="notification-badge absolute top-[3px] right-[3px] flex items-center justify-center min-w-[17px] h-[17px] px-1 text-[10px] font-bold leading-none text-white bg-[#ea3838] rounded-full shadow-[0_0_0_1.5px_#ffffff,0_2px_5px_rgba(234,56,56,0.35)]">
                                    {unreadCount > 99 ? "99+" : unreadCount}
                                </span>
                            )}
                        </button>

                        {isNotificationOpen && <NotificationDropdown />}
                    </div>

                    <div className="relative" ref={profileRef}>
                        <button
                            type="button"
                            onClick={() => {
                                setIsProfileOpen((prev) => !prev);
                                setIsNotificationOpen(false);
                            }}
                            className="flex items-center gap-3 pl-1.5 pr-4 sm:pr-5 py-1.5 bg-[#f0f6fc] hover:bg-[#e7f0f9] border border-[#dce8f5] rounded-full transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#355982]/20 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                            aria-label="User profile menu"
                            aria-expanded={isProfileOpen}
                        >
                            <div className="w-9 h-9 rounded-full bg-[#2f5581] flex items-center justify-center text-white shrink-0 shadow-xs overflow-hidden">
                                {user?.profilePictureUrl ? (
                                    <img
                                        src={user.profilePictureUrl}
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
                                    </svg>
                                )}
                            </div>

                            <div className="flex flex-col text-left leading-tight">
                                <span className="text-[13.5px] font-bold text-[#0e2238] tracking-[-0.01em] truncate max-w-[120px] sm:max-w-[160px]">
                                    {user?.name}
                                </span>
                                <span className="text-[11.5px] font-medium text-[#5c7797] truncate max-w-[120px] sm:max-w-[160px] hidden sm:inline mt-0.5">
                                    {user?.email}
                                </span>
                            </div>
                        </button>

                        {isProfileOpen && (
                            <div className="absolute right-0 mt-1.5 w-72 bg-white rounded-[22px] shadow-[0_16px_40px_-8px_rgba(15,23,42,0.14),0_4px_16px_rgba(15,23,42,0.06)] border border-slate-200/90 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 origin-top-right">
                                <div className="px-5 pt-3.5 pb-3 border-b border-slate-100 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#2f5581] flex items-center justify-center text-white shrink-0 shadow-xs overflow-hidden">
                                        {user?.profilePictureUrl ? (
                                            <img
                                                src={user.profilePictureUrl}
                                                alt={user.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <p className="text-[15px] font-bold text-[#0e2238] tracking-[-0.01em] truncate m-0">
                                            {user?.name}
                                        </p>
                                        <p className="text-[12.5px] text-slate-500 truncate mt-0.5 m-0">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="py-1.5">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsProfileOpen(false);
                                            navigate("/customer/profile");
                                        }}
                                        className="w-full flex items-center gap-3 px-5 py-3 text-[13.5px] font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50/80 transition-colors text-left cursor-pointer"
                                    >
                                        <UserRound size={18} className="text-slate-400" />
                                        <span>My Profile</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsProfileOpen(false);
                                            navigate("/customer/settings");
                                        }}
                                        className="w-full flex items-center gap-3 px-5 py-3 text-[13.5px] font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50/80 transition-colors text-left cursor-pointer"
                                    >
                                        <Settings size={18} className="text-slate-400" />
                                        <span>Settings</span>
                                    </button>
                                </div>

                                <div className="pt-1.5 border-t border-slate-100">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsProfileOpen(false);
                                            setIsLogoutModalOpen(true);
                                        }}
                                        className="w-full flex items-center gap-3 px-5 py-3 text-[13.5px] font-medium text-red-600 hover:bg-red-50/60 transition-colors text-left cursor-pointer"
                                    >
                                        <LogOut size={18} className="text-red-500" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex md:hidden items-center gap-1.5">
                    <button
                        type="button"
                        onClick={() => navigate("/customer/chat")}
                        className={`relative p-2 rounded-full transition-colors cursor-pointer ${
                            location.pathname.startsWith("/customer/chat")
                                ? "bg-[#edf4fb] text-[#183252]"
                                : "text-[#244673] hover:text-[#183252] hover:bg-[#f0f6fc]"
                        }`}
                        aria-label="Messages"
                        title="Messages"
                    >
                        <MessageCircleMore size={20} strokeWidth={2.2} />
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setIsMobileMenuOpen((prev) => !prev);
                            setIsNotificationOpen(false);
                        }}
                        className="p-2 ml-0.5 text-slate-700 hover:text-[#2f5581] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                        aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    >
                        {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 md:hidden transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-hidden="true"
                />
            )}

            <aside
                className={`
                    fixed inset-y-0 right-0 z-50 w-72 sm:w-80 bg-white flex flex-col justify-between p-4 shadow-2xl transition-transform duration-300 ease-in-out md:hidden overflow-y-auto
                    ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
                `}
                aria-label="Customer Mobile Navigation"
            >
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <img
                            src="/dealio-logo.png"
                            alt="Dealio"
                            className="h-7 w-auto object-contain"
                        />
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            aria-label="Close navigation"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-3 bg-[#f0f6fc] border border-[#dce8f5] rounded-2xl flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#2f5581] flex items-center justify-center text-white shrink-0 shadow-xs overflow-hidden">
                            {user?.profilePictureUrl ? (
                                <img
                                    src={user.profilePictureUrl}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
                                </svg>
                            )}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold text-[#0e2238] truncate">
                                {user?.name || "Customer User"}
                            </span>
                            <span className="text-xs text-[#5c7797] truncate mt-0.5">
                                {user?.email}
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            navigate("/customer/quotations/create");
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#2f5581] hover:bg-[#25456b] text-white text-sm font-semibold rounded-xl shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                    >
                        <Plus size={16} strokeWidth={2.4} />
                        <span>Create Quotation</span>
                    </button>

                    <nav className="flex flex-col space-y-1 pt-1" aria-label="Customer Mobile Links">
                        <NavLink
                            to="/customer"
                            end
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-[#edf4fb] text-[#204066] font-semibold"
                                        : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                                }`
                            }
                        >
                            <Home size={18} className="text-[#2f5581]" />
                            <span>Home</span>
                        </NavLink>

                        <NavLink
                            to="/customer/quotations"
                            end
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-[#edf4fb] text-[#204066] font-semibold"
                                        : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                                }`
                            }
                        >
                            <FileText size={18} className="text-[#2f5581]" />
                            <span>My Quotation Requests</span>
                        </NavLink>

                        <NavLink
                            to="/customer/chat"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-[#edf4fb] text-[#204066] font-semibold"
                                        : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                                }`
                            }
                        >
                            <MessageCircleMore size={18} className="text-[#2f5581]" />
                            <span>Messages</span>
                        </NavLink>

                        <div className="pt-2 pb-1 border-t border-slate-100" />

                        <NavLink
                            to="/customer/profile"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-[#edf4fb] text-[#204066] font-semibold"
                                        : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                                }`
                            }
                        >
                            <UserRound size={18} className="text-slate-400" />
                            <span>My Profile</span>
                        </NavLink>

                        <NavLink
                            to="/customer/settings"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-[#edf4fb] text-[#204066] font-semibold"
                                        : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                                }`
                            }
                        >
                            <Settings size={18} className="text-slate-400" />
                            <span>Settings</span>
                        </NavLink>
                    </nav>
                </div>

                <div className="pt-3 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsLogoutModalOpen(true);
                        }}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                        <LogOut size={18} className="text-red-500" />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>

            <ConfirmationModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={() => handleLogout(() => setIsLogoutModalOpen(false))}
                loading={isLoggingOut}
                title="Log Out"
                message="Are you sure you want to log out?"
            />
        </header>
    );
}

export default CustomerNavbar;
