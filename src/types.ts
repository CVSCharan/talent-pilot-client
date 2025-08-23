export interface ScreeningResult {
  candidate_name: string;
  final_score: number;
  confidence_score: number;
  recommendation: "Yes" | "No" | "Maybe";
  justification: string;
  key_strengths: string[];
  key_gaps: string[];
  hard_blockers: string[];
  email_address: string;
  contact_number: string;
}

export interface ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ScreeningResult[];
}

export type Results = ScreeningResult[];

export type Testimonial = {
  _id: string;
  author: string;
  content: string;
  rating: number;
  approved: boolean;
  designation: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
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
