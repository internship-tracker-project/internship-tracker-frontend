import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateApplication } from '../api';
import { applicationsQueryKey } from './useApplications';
import { analyticsSummaryQueryKey } from '../../analytics/hooks/useAnalyticsSummary';
import type { UpdateApplicationInput } from '../../../types/application';

export function useUpdateApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateApplicationInput }) =>
      updateApplication(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationsQueryKey });
      queryClient.invalidateQueries({ queryKey: analyticsSummaryQueryKey });
    },
  });
}
