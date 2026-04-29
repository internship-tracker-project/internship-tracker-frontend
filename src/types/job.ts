export interface JobListing {
  id: string;
  source: string;
  sourceId: string;
  title: string;
  company: string;
  location: string | null;
  description: string | null;
  applyUrl: string;
  salary: string | null;
  postedAt: string;
  fetchedAt: string;
}

export interface JobsFilters {
  q?: string;
  location?: string;
}

export interface JobsResponse {
  results: JobListing[];
  total: number;
  page: number;
  pageSize: number;
}
