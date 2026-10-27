import { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { CustomerNavbar } from "./CustomerNavbar";
import { CustomerSidebar } from "./CustomerSidebar";

function CustomerLayout() {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const handleCloseSidebar = useCallback(() => {
        setIsMobileSidebarOpen(false);
    }, []);

    const handleToggleSidebar = useCallback(() => {
        setIsMobileSidebarOpen((prev) => !prev);
    }, []);

    return (
        <div className="min-h-screen bg-[#F4F7FB] text-slate-800 flex flex-col antialiased">
        <CustomerNavbar
            onToggleSidebar={handleToggleSidebar}
            isSidebarOpen={isMobileSidebarOpen}
        />

        <div className="flex-1 flex w-full relative">
            <CustomerSidebar
            isOpen={isMobileSidebarOpen}
            onClose={handleCloseSidebar}
            />
            <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <Outlet />
            </main>
        </div>
        </div>
    );
}

export default CustomerLayout;
