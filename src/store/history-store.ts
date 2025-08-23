import { create } from 'zustand';
import type { ScreeningResult } from '../types';
import useAuthStore from './auth-store';

interface HistoryState {
  history: ScreeningResult[];
  loading: boolean;
  fetchHistory: () => Promise<void>;
}

const VITE_BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const useHistoryStore = create<HistoryState>((set) => ({
  history: [],
  loading: false,
  fetchHistory: async () => {
    set({ loading: true });
    const token = useAuthStore.getState().token;
    if (!token) {
      set({ loading: false });
      return;
    }

    try {
      const response = await fetch(`${VITE_BASE_API_URL}/n8n/responses`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }
      const data = await response.json();
      // The API returns an array of arrays of ScreeningResult
      const historyData = data.flat().filter((item: any): item is ScreeningResult => !!item);
      set({ history: historyData || [], loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
}));
