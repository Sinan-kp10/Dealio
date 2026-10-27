import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../features/auth/stores/auth.store";
import FullPageSpinner from "../../components/common/loading/FullPageSpinner";

export function PublicRoute() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    const isLoading = useAuthStore((state) => state.isLoading)

    const user = useAuthStore((state) => state.user);

    if(isLoading){
        return <FullPageSpinner />
    }

    if(isAuthenticated && user){
        switch (user.role) {
            case "ADMIN":
                return <Navigate to="/admin" replace />

            case "ENTERPRISE_MANAGER":
                return <Navigate to="/enterprise" replace />

            case "CUSTOMER":
                return <Navigate to="/customer" replace />
        }
    }

    return <Outlet />
}