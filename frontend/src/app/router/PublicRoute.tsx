import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../features/auth/stores/auth.store";

export function PublicRoute() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    const isLoading = useAuthStore((state) => state.isLoading)

    const user = useAuthStore((state) => state.user);

    if(isLoading){
        return <div>Loading...</div>;
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

    return <Outlet />;
}