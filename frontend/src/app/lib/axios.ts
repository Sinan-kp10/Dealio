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

let refreshPromise: Promise<unknown> | null = null;

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (axios.isAxiosError(error) && error.response) {
            const { status, data } = error.response;
            const errorCode = data?.errorCode;
            const originalRequest = error.config as (typeof error.config & { _retry?: boolean }) | undefined;
            const { isAuthenticated, clearAuth } = useAuthStore.getState();

            if (errorCode === "ACCOUNT_SUSPENDED") {
                if (isAuthenticated) {
                    clearAuth();
                    toast.error("Your account has been suspended by the administration");
                }
                return Promise.reject(error);
            }

            if (
                status === 401 &&
                (errorCode === "TOKEN_EXPIRED" || (isAuthenticated && errorCode === "UNAUTHENTICATED")) &&
                originalRequest &&
                !originalRequest._retry &&
                !originalRequest.url?.includes("/auth/refresh") &&
                !originalRequest.url?.includes("/auth/login")
            ) {
                originalRequest._retry = true;

                if (!refreshPromise) {
                    refreshPromise = axiosInstance.post("/auth/refresh").finally(() => {
                        refreshPromise = null;
                    });
                }

                try {
                    await refreshPromise;
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    return Promise.reject(refreshError);
                }
            }

            if (isAuthenticated && (errorCode === "UNAUTHENTICATED" || errorCode === "REFRESH_TOKEN_EXPIRED" || status === 401)) {
                clearAuth();
                toast.error("Session expired. Please log in again");
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
