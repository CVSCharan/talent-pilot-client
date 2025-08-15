import { create } from 'zustand';
import type { Results } from '../types';

interface ResultsState {
  results: Results | null;
  loading: boolean;
  setResults: (results: Results | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useResultsStore = create<ResultsState>((set) => ({
  results: null,
  loading: false,
  setResults: (results) => set({ results }),
  setLoading: (loading) => set({ loading }),
}));
