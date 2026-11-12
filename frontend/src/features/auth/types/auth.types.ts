export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "ENTERPRISE_MANAGER" | "CUSTOMER";
  phone: string | null;
  phoneVerified: boolean;
  profilePictureUrl?: string | null;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: AuthUser) => void
  clearAuth: () => void
  setLoading: (isLoading: boolean) => void
}


export interface CurrentUserResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
  };
}