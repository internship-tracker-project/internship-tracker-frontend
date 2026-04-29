import { useEffect, useState, type FormEvent } from 'react';
import { useCreateApplication } from '../hooks/useCreateApplication';
import { mapServerError } from '../errors';
import {
  ApplicationFormFields,
  type ApplicationFormValues,
  type ApplicationFormFieldErrors,
} from './ApplicationFormFields';
import type { CreateApplicationInput } from '../../../types/application';

type FieldErrors = ApplicationFormFieldErrors & { topLevel?: string };

const INITIAL_VALUES: ApplicationFormValues = {
  company: '',
  role: '',
  status: 'APPLIED',
  location: '',
  notes: '',
};

type Props = {
  onClose: () => void;
  initialValues?: Partial<ApplicationFormValues>;
};

export function CreateApplicationModal({ onClose, initialValues }: Props) {
  const [values, setValues] = useState<ApplicationFormValues>(() => ({
    ...INITIAL_VALUES,
    ...initialValues,
  }));
  const [errors, setErrors] = useState<FieldErrors>({});
  const { mutate, isPending } = useCreateApplication();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && !isPending) onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isPending]);

  function handleChange(patch: Partial<ApplicationFormValues>) {
    setValues((prev) => ({ ...prev, ...patch }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});

    const trimmedCompany = values.company.trim();
    const trimmedRole = values.role.trim();
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
      status: values.status,
    };
    const trimmedLocation = values.location.trim();
    if (trimmedLocation) payload.location = trimmedLocation;
    const trimmedNotes = values.notes.trim();
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
          <ApplicationFormFields
            values={values}
            onChange={handleChange}
            errors={errors}
            disabled={isPending}
            autoFocusCompany
          />
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

