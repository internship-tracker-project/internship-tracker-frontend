import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteApplication } from '../api';
import { applicationsQueryKey } from './useApplications';

export function useDeleteApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationsQueryKey });
    },
  });
}
