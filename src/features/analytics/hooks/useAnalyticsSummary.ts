import { useQuery } from '@tanstack/react-query';
import { fetchAnalyticsSummary } from '../api';

export const analyticsSummaryQueryKey = ['analytics', 'summary'] as const;

export function useAnalyticsSummary() {
  return useQuery({
    queryKey: analyticsSummaryQueryKey,
    queryFn: fetchAnalyticsSummary,
  });
}
