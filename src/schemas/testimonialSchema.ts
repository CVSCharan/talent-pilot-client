import { z } from "zod";

export const testimonialSchema = z.object({
  author: z.string().min(2, "Name is too short").max(50, "Name is too long"),
  designation: z
    .string()
    .min(2, "Designation is too short")
    .max(50, "Designation is too long"),
  rating: z.number().min(1, "Rating is required"),
  content: z
    .string()
    .min(10, "Testimonial is too short")
    .max(500, "Testimonial is too long"),
});