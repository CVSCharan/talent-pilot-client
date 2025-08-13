import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Results } from '../types';

interface ResultsState {
  results: Results | null;
  loading: boolean;
  hasHydrated: boolean;
  setResults: (results: Results | null) => void;
  setLoading: (loading: boolean) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export const useResultsStore = create(
  persist<ResultsState>(
    (set) => ({
      results: null,
      loading: false,
      hasHydrated: false,
      setResults: (results) => set({ results }),
      setLoading: (loading) => set({ loading }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: 'results-storage', // name of the item in the storage (must be unique)
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    }
  )
);
