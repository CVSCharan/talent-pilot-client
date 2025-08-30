import { create } from 'zustand';
import type { Testimonial } from "../types";
import useAuthStore from "./auth-store";
import api from "../lib/api";

export interface TestimonialsState {
  testimonials: Testimonial[];
  isLoading: boolean;
  error: string | null;
  hasTestimonial: boolean;
  hasTestimonialChecked: boolean;
  fetchApprovedTestimonials: () => Promise<void>;
  checkHasTestimonial: () => Promise<void>;
}

export const useTestimonialsStore = create<TestimonialsState>((set, get) => ({
  testimonials: [],
  isLoading: false,
  error: null,
  hasTestimonial: false,
  hasTestimonialChecked: false,
  fetchApprovedTestimonials: async () => {
    if (get().isLoading) return;
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/testimonials/approved`);
      if (!response.ok) {
        throw new Error('Failed to fetch testimonials');
      }
      const data = await response.json();
      set({ testimonials: data, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  checkHasTestimonial: async () => {
    const token = useAuthStore.getState().token;
    if (!token || get().hasTestimonialChecked) return;

    set({ hasTestimonialChecked: true });

    try {
      const response = await api.fetch(`${import.meta.env.VITE_BASE_API_URL}/testimonials/has-testimonial`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to check testimonial status');
      }
      const data = await response.json();
      set({ hasTestimonial: data.hasTestimonial });
    } catch (error) {
      console.error("Failed to check testimonial status:", error);
      set({ hasTestimonialChecked: false });
    }
  },
}));
