export interface IUser {
  _id: string;
  // other user fields
}

export interface IN8nUserResponse {
  user: IUser['_id'];
  jdContext: {
    jobDescription: string;
    jobDetails: {
      positionTitle: string;
      requiredSkills: string[];
      coreResponsibilities: string[];
      seniorityLevel: string;
      preferredLocation: string;
      minimumExperience: string;
      educationRequirement: string;
      bonusSkills: string[];
    };
  };
  candidateResume: {
    candidateDetails: {
      "Candidate Name": string;
      "Candidate Email": string;
      "Candidate Contact": string;
      Education: {
        Degree: string;
        Institution: string;
        "Graduation Year": string;
      }[];
      "Technical Skills": {
        "Programming Languages": string[];
        Frameworks: string[];
        Databases: string[];
        Tools: string[];
        Methodologies: string[];
      };
      Experience: {
        "Job Title": string;
        Company: string;
        "Start Date": string;
        "End Date": string;
        Responsibilities: string[];
        Achievements: string[];
      }[];
      Projects: {
        "Project Name": string;
        Objective: string;
        "Technologies Used": string[];
        Outcome: string;
      }[];
      "Certifications & Training": {
        Certification: string;
        "Issuing Organization": string;
        Year: string;
      }[];
      "Other Notable Information": {
        Awards: { name: string; year: string; issuer: string; }[];
        Publications: { title: string; year: string; journalOrVenue: string; }[];
        "Volunteer Work": string[];
        "Open Source Contributions": { projectName: string; repository: string; }[];
        Languages: string[];
      };
      "Resume Summary": string;
    };
  };
  results: {
    final_score: string;
    confidence_score: string;
    recommendation: string;
    justification: string;
    key_strengths: string[];
    key_gaps: string[];
    hard_blockers: string[];
  };
  createdAt: Date;
}

export interface ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IN8nUserResponse[];
}

export type Results = IN8nUserResponse[];

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
  pendingSubmission?: boolean;
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
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setTokenAndFetchUser: (token: string) => Promise<void>;
  setError: (error: string | null) => void;
  initializeAuth: () => void;
};

export type AuthStore = AuthState & AuthActions;
