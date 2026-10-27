import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../features/auth/stores/auth.store";
import FullPageSpinner from "../../components/common/loading/FullPageSpinner";

interface ProtectedRouteProps {
  allowedRoles: ("ADMIN" | "ENTERPRISE_MANAGER" | "CUSTOMER")[];
}

function ProtectedRoute({allowedRoles} : ProtectedRouteProps){

    const isAuthenticated = useAuthStore((state)=> state.isAuthenticated)
    const isLoading = useAuthStore((state) => state.isLoading)
    const user = useAuthStore((state) => state.user)

    if (isLoading) {
        return <FullPageSpinner />
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/forbidden" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute