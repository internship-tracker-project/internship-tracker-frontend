import { api } from '../../lib/axios';
import type { AnalyticsSummary } from '../../types/analytics';

export async function fetchAnalyticsSummary(): Promise<AnalyticsSummary> {
  const response = await api.get<AnalyticsSummary>('/analytics/summary');
  return response.data;
}
