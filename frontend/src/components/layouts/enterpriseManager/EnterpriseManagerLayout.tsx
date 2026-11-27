import { useState, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { EnterpriseManagerNavbar } from "./EnterpriseManagerNavbar";
import { EnterpriseManagerSidebar } from "./EnterpriseManagerSidebar";

function EnterpriseManagerLayout() {
    const location = useLocation();
    const isChat = location.pathname.startsWith("/enterprise/chat");
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const handleCloseSidebar = useCallback(() => {
      setIsMobileSidebarOpen(false);
    }, []);

    const handleToggleSidebar = useCallback(() => {
      setIsMobileSidebarOpen((prev) => !prev);
    }, []);

    return (
      <div className="h-screen bg-[#F4F7FB] text-slate-800 flex flex-col antialiased overflow-hidden">
        <EnterpriseManagerNavbar
          onToggleSidebar={handleToggleSidebar}
          isSidebarOpen={isMobileSidebarOpen}
        />

        <div className="flex-1 flex w-full min-h-0 relative">
          <EnterpriseManagerSidebar
            isOpen={isMobileSidebarOpen}
            onClose={handleCloseSidebar}
          />
          <main
            className={`flex-1 min-w-0 ${
              isChat
                ? "p-0 h-[calc(100vh-64px)] md:h-[calc(100vh-68px)] overflow-hidden"
                : "p-4 sm:p-6 lg:p-8 overflow-y-auto"
            }`}
          >
            <Outlet />
          </main>
        </div>
      </div>
    );
}

export default EnterpriseManagerLayout;