import { create } from "zustand";
import type { AuthState } from "../features/auth/types/auth.types";

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    setUser: (user) =>
        set({
            user,
            isAuthenticated: true,
            isLoading: false,
        }),

    clearAuth: () =>
        set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        }),

    setLoading: (isLoading) => set({ isLoading }),
}))

export default useAuthStore