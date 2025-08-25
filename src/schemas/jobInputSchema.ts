import { z } from "zod";

export const jobInputSchema = z.object({
  jobTitle: z.string().min(3, "Job title must be at least 3 characters"),
  requiredSkills: z.string().min(2, "Required skills must be at least 2 characters"),
  coreResponsibilities: z.string().min(10, "Core responsibilities must be at least 10 characters"),
  seniorityLevel: z.string().min(2, "Seniority level must be at least 2 characters"),
  preferredLocation: z.string().min(2, "Preferred location must be at least 2 characters"),
  minimumExperience: z.string().refine(value => !isNaN(parseFloat(value)) && parseFloat(value) >= 0, {
    message: "Minimum experience must be a non-negative number",
  }),
  educationRequirement: z.string().min(2, "Education requirement must be at least 2 characters"),
  bonusSkills: z.string().optional(),
});
