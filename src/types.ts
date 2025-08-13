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
}

export interface Results {
  success: boolean;
  statusCode: number;
  message: string;
  data: Candidate;
}