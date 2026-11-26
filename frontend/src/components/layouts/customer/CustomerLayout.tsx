import { Outlet, useLocation } from "react-router-dom";
import { CustomerNavbar } from "./CustomerNavbar";

function CustomerLayout() {
    const location = useLocation();
    const isConversations = location.pathname.startsWith("/customer/chat");

    return (
        <div className="h-screen bg-[#F4F7FB] text-slate-800 flex flex-col antialiased overflow-hidden">
            <CustomerNavbar />
            <main
                className={`flex-1 w-full min-h-0 ${
                    isConversations
                        ? "p-0 h-[calc(100vh-64px)] md:h-[calc(100vh-68px)] overflow-hidden"
                        : "px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-y-auto"
                }`}
            >
                <Outlet />
            </main>
        </div>
    );
}

export default CustomerLayout;
