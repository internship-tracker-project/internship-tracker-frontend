import type { Application } from "../types/application";

// Temporary mock data until backend endpoints are integrated.
const mockApplications: Application[] = [
  {
    id: "app-001",
    company: "Acme Software",
    role: "Frontend Intern",
    status: "APPLIED",
    appliedAt: "2026-04-03",
  },
  {
    id: "app-002",
    company: "Northwind Labs",
    role: "Full Stack Intern",
    status: "INTERVIEW",
    appliedAt: "2026-04-05",
  },
  {
    id: "app-003",
    company: "Globex Systems",
    role: "Software Engineering Intern",
    status: "OFFER",
    appliedAt: "2026-03-28",
  },
];

export const getApplications = async (): Promise<Application[]> => {
  return mockApplications;
};