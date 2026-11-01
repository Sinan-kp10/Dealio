import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Menu, X, LogOut, UserRound} from "lucide-react";
import { toast } from "react-toastify";
import { logout } from "../../../features/auth/services/auth.service";
import useAuthStore from "../../../features/auth/stores/auth.store";
import ConfirmationModal from "../../common/confirmationModel/ConfirmationModal";

interface EnterpriseManagerNavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function EnterpriseManagerNavbar({ onToggleSidebar, isSidebarOpen,}: EnterpriseManagerNavbarProps) {
  const navigate = useNavigate()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const user = useAuthStore((state) => state.user)
  const clearAuth = useAuthStore((state) => state.clearAuth)




  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if ( profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      clearAuth();
      toast.success("Successfully logged out");
      navigate("/login", { replace: true });
    } catch {
      toast.error("Failed to log out");
    } finally {
      setIsLogoutModalOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 md:h-[68px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="lg:hidden p-2 -ml-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link
            to="/enterprise"
            className="flex items-center gap-2 transition-transform duration-200 hover:scale-[1.01]"
            aria-label="Dealio home"
          >
            <img src="/dealio-logo.png" alt="Dealio" className="h-7 sm:h-8 w-auto object-contain"/>
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative">
            <button
              type="button"
              className="relative p-2 text-[#244673] hover:text-[#183252] hover:bg-[#f0f6fc] rounded-full transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell size={21} strokeWidth={2.2} className="text-[#244673]" />
              <span className="notification-badge absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[19px] h-[19px] px-1 text-[11px] font-bold text-white bg-[#ea3838] rounded-full shadow-[0_0_0_2px_#ffffff,0_2px_6px_rgba(234,56,56,0.35)]">
                2
              </span>
            </button>
          </div>

          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="flex items-center gap-3 pl-1.5 pr-4 sm:pr-5 py-1.5 bg-[#f0f6fc] hover:bg-[#e7f0f9] border border-[#dce8f5] rounded-full transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#355982]/20 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              aria-label="User profile menu"
              aria-expanded={isProfileOpen}
            >
              <div className="w-9 h-9 rounded-full bg-[#2f5581] flex items-center justify-center text-white shrink-0 shadow-xs">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
                </svg>
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
              <div className="absolute right-0 mt-3 w-72 bg-white rounded-[20px] shadow-[0_12px_36px_-6px_rgba(15,23,42,0.12),0_4px_12px_rgba(15,23,42,0.06)] border border-slate-200/80 py-2.5 z-50 animate-in fade-in duration-150">
                <div className="px-5 pt-3.5 pb-3 border-b border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2f5581] flex items-center justify-center text-white shrink-0 shadow-xs">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
                    </svg>
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
                      navigate("/enterprise/profile");
                    }}
                    className="w-full flex items-center gap-3 px-5 py-3 text-[13.5px] font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50/80 transition-colors text-left cursor-pointer"
                  >
                    <UserRound size={18} className="text-slate-400" />
                    <span>My Profile</span>
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
      </div>

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Log Out"
        message="Are you sure you want to log out?"
      />
    </header>
  );
}

export default EnterpriseManagerNavbar;
