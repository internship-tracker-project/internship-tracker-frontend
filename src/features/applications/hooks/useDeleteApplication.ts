import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteApplication } from '../api';
import { applicationsQueryKey } from './useApplications';
import { analyticsSummaryQueryKey } from '../../analytics/hooks/useAnalyticsSummary';

export function useDeleteApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationsQueryKey });
      queryClient.invalidateQueries({ queryKey: analyticsSummaryQueryKey });
    },
  });
}
