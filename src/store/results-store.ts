import { create } from 'zustand';
import type { ScreeningResult } from '../types';

interface ResultsState {
  results: ScreeningResult[] | null;
  loading: boolean;
  setResults: (results: ScreeningResult[] | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useResultsStore = create<ResultsState>((set) => ({
  results: null,
  loading: false,
  setResults: (results) => set({ results }),
  setLoading: (loading) => set({ loading }),
}));
