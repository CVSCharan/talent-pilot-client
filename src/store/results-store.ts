
import { create } from 'zustand';
import type { IN8nUserResponse } from '../types';

interface ResultsState {
  results: IN8nUserResponse[] | null;
  loading: boolean;
  error: string | null;
  isRedirecting: boolean;
  setResults: (results: IN8nUserResponse[] | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setIsRedirecting: (isRedirecting: boolean) => void;
}

export const useResultsStore = create<ResultsState>((set) => ({
  results: null,
  loading: false,
  error: null,
  isRedirecting: false,
  setResults: (results) => set({ results, error: null }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error, results: null, loading: false }),
  setIsRedirecting: (isRedirecting) => set({ isRedirecting }),
}));
