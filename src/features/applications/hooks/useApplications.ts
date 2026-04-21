import { useQuery } from '@tanstack/react-query';
import { fetchApplications } from '../api';

export const applicationsQueryKey = ['applications'] as const;

export function useApplications() {
  return useQuery({
    queryKey: applicationsQueryKey,
    queryFn: fetchApplications,
  });
}
