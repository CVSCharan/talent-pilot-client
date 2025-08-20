import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useUserProfileStore } from "../hooks/use-user-profile";

interface User {
  id: string;
  email: string;
  displayName: string;
  googleId?: string;
  isVerified: boolean;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  setTokenAndFetchUser: (token: string) => Promise<void>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  initializeAuth: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({ // Added 'get' here
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: string | null) => set({ error }),

      initializeAuth: async () => {
        const currentToken = get().token;
        if (currentToken) {
          await get().setTokenAndFetchUser(currentToken);
        }
      },

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Login failed");
          }

          set({
            token: data.token,
            user: data.user,
            isAuthenticated: true,
            isLoading: false,
          });
          useUserProfileStore.getState().setUserProfile(data.user);
        } catch (err) {
          set({
            error: (err as Error).message,
            isLoading: false,
            isAuthenticated: false,
            token: null,
            user: null,
          });
          throw err;
        }
      },

      signup: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_API_URL}/auth/signup`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Signup failed");
          }

          set({
            token: data.token,
            user: data.user,
            isAuthenticated: true,
            isLoading: false,
          });
          useUserProfileStore.getState().setUserProfile(data.user);
        } catch (err) {
          set({
            error: (err as Error).message,
            isLoading: false,
            isAuthenticated: false,
            token: null,
            user: null,
          });
          throw err;
        }
      },

      setTokenAndFetchUser: async (token: string) => {
        if (get().isLoading) return;
        set({ isLoading: true, error: null });
        try {
          set({ token, isAuthenticated: true });

          const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/auth/me`, {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch user profile");
          }

          const data = await response.json();
          const user = data.user;

          set({ user, isLoading: false });
          useUserProfileStore.getState().setUserProfile(user);
        } catch (err) {
          set({
            error: (err as Error).message,
            isLoading: false,
            isAuthenticated: false,
            token: null,
            user: null,
          });
          throw err;
        }
      },

      logout: async () => {
        const currentToken = get().token; // Get current token from state

        if (currentToken) {
          try {
            await fetch(`${import.meta.env.VITE_BASE_API_URL}/auth/logout`, {
              method: "POST", // Or DELETE, depending on backend
              headers: {
                "Authorization": `Bearer ${currentToken}`,
              },
            });
            console.log("Backend logout call successful (or ignored if 404/500)");
          } catch (err) {
            console.error("Error during backend logout call:", err);
          }
        }

        set({
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
        useUserProfileStore.getState().setUserProfile(null);
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
