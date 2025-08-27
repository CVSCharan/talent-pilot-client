import { create } from 'zustand';
import type { IN8nUserResponse } from '../types';

interface ResultsState {
  results: IN8nUserResponse[] | null;
  loading: boolean;
  error: string | null;
  setResults: (results: IN8nUserResponse[] | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useResultsStore = create<ResultsState>((set) => ({
  results: null,
  loading: false,
  error: null,
  setResults: (results) => set({ results, loading: false, error: null }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error, results: null, loading: false }),
}));