import { create } from 'zustand';
import type { Testimonial } from "../types";

interface TestimonialsState {
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
}

export const useTestimonialsStore = create<TestimonialsState>((set) => ({
  testimonials: [],
  addTestimonial: (testimonial) =>
    set((state) => ({
      testimonials: [
        ...state.testimonials,
        { ...testimonial, id: state.testimonials.length + 1 },
      ],
    })),
}));
