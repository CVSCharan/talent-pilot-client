export interface JobHistory {
  company: string;
  role: string;
  duration: string;
}

export interface Project {
  name: string;
  description: string;
}

export interface Candidate {
  name: string;
  email: string;
  contact: string;
  education: string;
  skills: string;
  jobHistory: string;
  projects: string;
  jdAlignment: string;
  score: number;
  justification: string;
  recommendation: string;
  keyObservations: string;
  confidenceScore: string;
}

export interface ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Candidate; // Assuming 'data' always contains a single Candidate object
}

export type Results = Candidate; // Changed from Candidate[] to Candidate

export type Testimonial = {
  id: number;
  author: string;
  testimonial: string;
  rating: number;
};

export type FormData = {
  jobTitle: string;
  requiredSkills: string;
  coreResponsibilities: string;
  seniorityLevel: string;
  preferredLocation: string;
  minimumExperience: string;
  educationRequirement: string;
  bonusSkills: string;
  pendingSubmission: boolean;
};

export type UserProfile = {
  id: string;
  email: string;
  name?: string;
  picture?: string;
};

export type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  userProfile: UserProfile | null;
};

export type AuthActions = {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setTokenAndFetchUser: (token: string) => Promise<void>;
  setError: (error: string | null) => void;
  initializeAuth: () => void;
};

export type AuthStore = AuthState & AuthActions;
