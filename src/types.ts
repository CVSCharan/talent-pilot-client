export interface Match {
  name: string;
  score: number;
  experience: string;
  skills: string[];
  status: string;
}

export interface Results {
  totalResumes: number;
  processed: number;
  matches: Match[];
}
