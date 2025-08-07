import { create } from "zustand";

interface FormData {
  jobTitle: string;
  skills: string;
  jobDescription: string;
  resumes: File[];
}

interface FormDataStore {
  formData: FormData | null;
  setFormData: (data: FormData) => void;
  clearFormData: () => void;
}

export const useFormDataStore = create<FormDataStore>((set) => ({
  formData: null,
  setFormData: (data) => set({ formData: data }),
  clearFormData: () => set({ formData: null }),
}));