import type { ApplicationStatus } from './application';

export interface AnalyticsSummary {
  total: number;
  statusCounts: Record<ApplicationStatus, number>;
  offerRate: number;
  timeSeries: { weekStart: string; count: number }[];
}
