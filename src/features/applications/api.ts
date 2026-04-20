import { api } from '../../lib/axios';
import type { Application } from '../../types/application';

export async function fetchApplications(): Promise<Application[]> {
  const response = await api.get<Application[]>('/applications');
  return response.data;
}
