
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FormData {
  jobTitle: string;
  requiredSkills: string;
  coreResponsibilities: string;
  seniorityLevel: string;
  preferredLocation: string;
  minimumExperience: string;
  educationRequirement: string;
  bonusSkills: string;
  pendingSubmission: boolean;
}

interface FormDataStore {
  formData: Partial<FormData> | null;
  setFormData: (data: Partial<FormData>) => void;
  clearFormData: () => void;
}

export const useFormDataStore = create(
  persist<FormDataStore>(
    (set) => ({
      formData: null,
      setFormData: (data) =>
        set((state) => ({ formData: { ...state.formData, ...data } })),
      clearFormData: () => set({ formData: null }),
    }),
    {
      name: "form-data-storage", // name of the item in the storage (must be unique)
    }
  )
);
