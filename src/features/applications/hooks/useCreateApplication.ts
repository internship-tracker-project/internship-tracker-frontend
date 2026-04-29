import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createApplication } from '../api';
import { applicationsQueryKey } from './useApplications';
import { analyticsSummaryQueryKey } from '../../analytics/hooks/useAnalyticsSummary';

export function useCreateApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationsQueryKey });
      queryClient.invalidateQueries({ queryKey: analyticsSummaryQueryKey });
    },
  });
}
