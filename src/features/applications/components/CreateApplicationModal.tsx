import { useEffect, useState, type FormEvent } from 'react';
import axios from 'axios';
import { useCreateApplication } from '../hooks/useCreateApplication';
import type {
  ApplicationStatus,
  CreateApplicationInput,
} from '../../../types/application';

const STATUS_OPTIONS: ApplicationStatus[] = [
  'APPLIED',
  'INTERVIEW',
  'OFFER',
  'REJECTED',
];

type FieldErrors = {
  company?: string;
  role?: string;
  topLevel?: string;
};

type Props = {
  onClose: () => void;
};

export function CreateApplicationModal({ onClose }: Props) {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState<ApplicationStatus>('APPLIED');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const { mutate, isPending } = useCreateApplication();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && !isPending) onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isPending]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});

    const trimmedCompany = company.trim();
    const trimmedRole = role.trim();
    const nextErrors: FieldErrors = {};
    if (!trimmedCompany) nextErrors.company = 'Company is required';
    if (!trimmedRole) nextErrors.role = 'Role is required';
    if (nextErrors.company || nextErrors.role) {
      setErrors(nextErrors);
      return;
    }

    const payload: CreateApplicationInput = {
      company: trimmedCompany,
      role: trimmedRole,
      status,
    };
    const trimmedLocation = location.trim();
    if (trimmedLocation) payload.location = trimmedLocation;
    const trimmedNotes = notes.trim();
    if (trimmedNotes) payload.notes = trimmedNotes;

    mutate(payload, {
      onSuccess: () => onClose(),
      onError: (err) => {
        setErrors({ topLevel: mapServerError(err) });
      },
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-application-title"
        className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
      >
        <h2
          id="create-application-title"
          className="text-lg font-semibold text-slate-900 mb-4"
        >
          New application
        </h2>
        {errors.topLevel && (
          <div className="rounded-md bg-red-50 border border-red-200 text-sm text-red-700 p-3 mb-4">
            {errors.topLevel}
          </div>
        )}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Company
            </label>
            <input
              id="company"
              type="text"
              autoFocus
              required
              maxLength={100}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            {errors.company && (
              <p className="text-sm text-red-600 mt-1">{errors.company}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Role
            </label>
            <input
              id="role"
              type="text"
              required
              maxLength={200}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            {errors.role && (
              <p className="text-sm text-red-600 mt-1">{errors.role}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
              className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Location <span className="text-slate-400">(optional)</span>
            </label>
            <input
              id="location"
              type="text"
              maxLength={200}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Notes <span className="text-slate-400">(optional)</span>
            </label>
            <textarea
              id="notes"
              rows={3}
              maxLength={2000}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-end items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="text-sm text-slate-600 hover:text-slate-900 px-4 py-2 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium px-4 py-2 rounded-md transition"
            >
              {isPending ? 'Saving…' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function mapServerError(err: unknown): string {
  if (axios.isAxiosError(err)) {
    if (!err.response) {
      return 'Network error. Check your connection and try again.';
    }
    if (err.response.status === 400) {
      return 'Please check your details and try again.';
    }
  }
  return 'Something went wrong. Please try again.';
}
