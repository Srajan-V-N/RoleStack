export interface ExtractedSkills {
  coreCS: string[];
  languages: string[];
  web: string[];
  data: string[];
  cloud: string[];
  testing: string[];
  other: string[];
}

export interface RoundMapping {
  roundTitle: string;
  focusAreas: string[];
  whyItMatters: string;
}

export interface ChecklistRound {
  roundTitle: string;
  items: string[];
}

export interface PlanDay {
  day: string;
  focus: string;
  tasks: string[];
}

export interface AnalysisEntry {
  id: string;
  createdAt: string;
  updatedAt: string;
  company: string;
  role: string;
  jdText: string;
  extractedSkills: ExtractedSkills;
  roundMapping: RoundMapping[];
  checklist: ChecklistRound[];
  plan7Days: PlanDay[];
  questions: string[];
  baseScore: number;
  skillConfidenceMap: Record<string, 'know' | 'practice'>;
  finalScore: number;
  companyIntel?: {
    name: string;
    industry: string;
    sizeCategory: 'Startup' | 'Mid-size' | 'Enterprise';
    sizeLabel: string;
    hiringFocus: string;
  };
}
