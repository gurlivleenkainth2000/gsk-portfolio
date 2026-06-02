export type EmploymentType = "full-time" | "contract" | "part-time";

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  employmentType: EmploymentType;
  period: string;
  location: string;
  current: boolean;
  summary: string;
  highlights: string[];
  tech: string[];
}
