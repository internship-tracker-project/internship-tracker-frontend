import { api } from '../../lib/axios';
import type { JobsFilters, JobsResponse } from '../../types/job';

const PAGE_SIZE = 50;

export async function fetchJobs(filters: JobsFilters): Promise<JobsResponse> {
  const params: Record<string, string | number> = {
    page: 1,
    pageSize: PAGE_SIZE,
  };
  if (filters.q) params.q = filters.q;
  if (filters.location) params.location = filters.location;
  const response = await api.get<JobsResponse>('/jobs', { params });
  return response.data;
}
