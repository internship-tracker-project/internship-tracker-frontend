import { api } from '../../lib/axios';

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
}

export async function login(credentials: AuthCredentials): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  return response.data;
}

export async function register(credentials: AuthCredentials): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/register', credentials);
  return response.data;
}
