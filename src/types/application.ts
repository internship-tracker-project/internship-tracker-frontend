export type ApplicationStatus =
  | "APPLIED"
  | "INTERVIEW"
  | "OFFER"
  | "REJECTED";

export interface Application {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  location: string | null;
  notes: string | null;
  appliedAt: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}
