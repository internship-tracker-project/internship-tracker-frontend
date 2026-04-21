import { api } from '../../lib/axios';
import type {
  Application,
  CreateApplicationInput,
  UpdateApplicationInput,
} from '../../types/application';

export async function fetchApplications(): Promise<Application[]> {
  const response = await api.get<Application[]>('/applications');
  return response.data;
}

export async function createApplication(
  input: CreateApplicationInput,
): Promise<Application> {
  const response = await api.post<Application>('/applications', input);
  return response.data;
}

export async function updateApplication(
  id: string,
  input: UpdateApplicationInput,
): Promise<Application> {
  const response = await api.patch<Application>(`/applications/${id}`, input);
  return response.data;
}
