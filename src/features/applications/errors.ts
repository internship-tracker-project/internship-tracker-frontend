import axios from 'axios';

export function mapServerError(err: unknown): string {
  if (axios.isAxiosError(err)) {
    if (!err.response) {
      return 'Network error. Check your connection and try again.';
    }
    if (err.response.status === 404) {
      return 'That application no longer exists.';
    }
    if (err.response.status === 400) {
      return 'Please check your details and try again.';
    }
  }
  return 'Something went wrong. Please try again.';
}
