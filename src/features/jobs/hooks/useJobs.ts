import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchJobs } from '../api';
import type { JobsFilters } from '../../../types/job';

export const jobsQueryKey = (filters: JobsFilters) =>
  ['jobs', filters] as const;

export function useJobs(filters: JobsFilters) {
  return useQuery({
    queryKey: jobsQueryKey(filters),
    queryFn: () => fetchJobs(filters),
    placeholderData: keepPreviousData,
  });
}
