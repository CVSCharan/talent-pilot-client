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
  googleLogin: (googleToken: string) => Promise<void>; // Assuming backend exchanges Google token for JWT
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: string | null) => set({ error }),

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          // Replace with your actual backend login endpoint
          const response = await fetch("http://localhost:9090/api/auth/login", {
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
        }
      },

      signup: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          // Replace with your actual backend signup endpoint
          const response = await fetch(
            "http://localhost:9090/api/auth/signup",
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
            user: data.user, // Assuming your backend returns user data
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
        }
      },

      googleLogin: async (googleToken) => {
        set({ isLoading: true, error: null });
        try {
          // Replace with your actual backend Google login endpoint
          // This endpoint should exchange the Google token (e.g., ID token) for your backend's JWT
          const response = await fetch(
            "http://localhost:9090/api/auth/google",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token: googleToken }), // Send the Google token
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Google login failed");
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
        }
      },

      logout: () => {
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
      name: "auth-storage", // unique name
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
    }
  )
);

export default useAuthStore;
