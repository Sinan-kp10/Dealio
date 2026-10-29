import axios from "axios";
import useAuthStore from "../../features/auth/stores/auth.store";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isAxiosError(error) && error.response) {
            const { status, data } = error.response;
            const errorCode = data?.errorCode;
            const { isAuthenticated, clearAuth } = useAuthStore.getState();

            if (isAuthenticated) {
                if (errorCode === "ACCOUNT_SUSPENDED") {
                    clearAuth();
                    return Promise.reject(error);
                }

                if (errorCode === "UNAUTHENTICATED" || status === 401) {
                    clearAuth();
                    toast.error("Session expired. Please log in again.");
                    return Promise.reject(error);
                }
            }

        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
