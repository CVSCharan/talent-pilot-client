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

interface FormDataState {
  formData: Partial<FormData>;
  resume: File | null;
  setFormField: (field: keyof FormData, value: any) => void;
  setResume: (resume: File | null) => void;
  clearFormData: () => void;
  setEntireFormData: (data: Partial<FormData>) => void;
}

const initialFormData: Partial<FormData> = {
  jobTitle: "",
  requiredSkills: "",
  coreResponsibilities: "",
  seniorityLevel: "",
  preferredLocation: "",
  minimumExperience: "",
  educationRequirement: "",
  bonusSkills: "",
  pendingSubmission: false,
};

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export const useFormDataStore = create(
  persist<FormDataState>(
    (set) => ({
      formData: initialFormData,
      resume: null,
      setFormField: (field, value) =>
        set((state) => ({
          formData: { ...state.formData, [field]: value },
        })),
      setResume: (resume) => set({ resume }),
      clearFormData: () => set({ formData: initialFormData, resume: null }),
      setEntireFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
    }),
    {
      name: "form-data-storage",
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);
          if (state.resume) {
            const resumeFile = base64ToFile(
              state.resume.data,
              state.resume.name
            );
            return { state: { ...state, resume: resumeFile } };
          }
          return { state };
        },
        setItem: async (name, newValue) => {
          const { state } = newValue;
          if (state.resume) {
            const base64Resume = await fileToBase64(state.resume as File);
            const newResumeState = { name: state.resume.name, data: base64Resume };
            localStorage.setItem(
              name,
              JSON.stringify({ state: { ...state, resume: newResumeState } })
            );
          } else {
            localStorage.setItem(name, JSON.stringify({ state }));
          }
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);