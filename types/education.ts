export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  institutionUrl?: string;
  location: string;
  period: string;
  description?: string;
  highlights?: string[];
  units?: string[];
}
