export interface MasterProfile {
  rawText: string;
}

export interface JobAnalysis {
  jobTitle: string;
  company: string;
  seniorityLevel: "junior" | "mid" | "senior" | "lead" | "director";
  requiredSkills: string[];
  preferredSkills: string[];
  keyResponsibilities: string[];
  atsKeywords: string[];
  industryContext: string;
  remotePolicy: "remote" | "hybrid" | "onsite" | "unspecified";
  standoutRequirements: string[];
}

export interface CVExperience {
  title: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface CVContact {
  email: string;
  phone: string;
  linkedin: string;
  location: string;
}

export interface CVSkills {
  technical: string[];
  tools: string[];
  soft: string[];
}

export interface CVEducation {
  degree: string;
  institution: string;
  period: string;
}

export interface GeneratedCV {
  name: string;
  contact: CVContact;
  summary: string;
  experience: CVExperience[];
  skills: CVSkills;
  education: CVEducation[];
  certifications: string[];
}

export interface InterviewQuestion {
  question: string;
  category: "behavioral" | "technical" | "situational" | "culture";
  whyTheyAsk: string;
  yourAngle: string;
  keyStory: string;
}

export interface InterviewPrep {
  questions: InterviewQuestion[];
}

export interface AppState {
  masterProfile: MasterProfile | null;
  currentJob: JobAnalysis | null;
  generatedCV: GeneratedCV | null;
  interviewPrep: InterviewPrep | null;
  isLoading: boolean;
  error: string | null;
}

export type AppAction =
  | { type: "SET_PROFILE"; payload: MasterProfile }
  | { type: "SET_JOB"; payload: JobAnalysis }
  | { type: "SET_CV"; payload: GeneratedCV }
  | { type: "SET_PREP"; payload: InterviewPrep }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_ERROR" };
