import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserProfile {
  displayName: string;
  email: string;
  photoUrl?: string;
}

interface UserProfileStore {
  userProfile: UserProfile | null;
  isHydrated: boolean;
  setUserProfile: (profile: UserProfile | null) => void;
}

export const useUserProfileStore = create<UserProfileStore>()(
  persist(
    (set) => ({
      userProfile: null,
      isHydrated: false,
      setUserProfile: (profile) => set({ userProfile: profile }),
    }),
    {
      name: "user-profile-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isHydrated = true;
        }
      },
    }
  )
);
