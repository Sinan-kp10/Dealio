import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../features/auth/services/auth.service";
import useAuthStore from "../stores/auth.store";

export function useLogout() {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async (onFinally?: () => void) => {
    setIsLoggingOut(true);
    try {
      await logout();
      clearAuth();
      toast.success("Successfully logged out");
      navigate("/login", { replace: true });
    } catch {
      toast.error("Failed to log out");
    } finally {
      setIsLoggingOut(false);
      onFinally?.();
    }
  };

  return { isLoggingOut, handleLogout };
}
