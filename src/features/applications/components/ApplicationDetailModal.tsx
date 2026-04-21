import { useEffect, useState, type FormEvent } from 'react';
import axios from 'axios';
import type {
  Application,
  UpdateApplicationInput,
} from '../../../types/application';
import { useUpdateApplication } from '../hooks/useUpdateApplication';
import { mapServerError } from '../errors';
import { StatusBadge } from './StatusBadge';
import {
  ApplicationFormFields,
  type ApplicationFormValues,
} from './ApplicationFormFields';

type Props = {
  application: Application;
  onClose: () => void;
};

type Mode = 'view' | 'edit';

type FieldErrors = {
  company?: string;
  role?: string;
  topLevel?: string;
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function valuesFromApplication(app: Application): ApplicationFormValues {
  return {
    company: app.company,
    role: app.role,
    status: app.status,
    location: app.location ?? '',
    notes: app.notes ?? '',
  };
}

export function ApplicationDetailModal({ application, onClose }: Props) {
  const [mode, setMode] = useState<Mode>('view');
  const [displayed, setDisplayed] = useState<Application>(application);
  const [values, setValues] = useState<ApplicationFormValues>(() =>
    valuesFromApplication(application),
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const updateMutation = useUpdateApplication();
  const isPending = updateMutation.isPending;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      if (mode === 'edit') return;
      if (isPending) return;
      onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, isPending, onClose]);

  function enterEditMode() {
    setValues(valuesFromApplication(displayed));
    setErrors({});
    setMode('edit');
  }

  function cancelEdit() {
    setErrors({});
    setValues(valuesFromApplication(displayed));
    setMode('view');
  }

  function handleChange(patch: Partial<ApplicationFormValues>) {
    setValues((prev) => ({ ...prev, ...patch }));
  }

  function handleEditSubmit(event: FormEvent<HTMLFormElement>) {
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

    const payload: UpdateApplicationInput = {
      company: trimmedCompany,
      role: trimmedRole,
      status: values.status,
      location: values.location.trim(),
      notes: values.notes.trim(),
    };

    updateMutation.mutate(
      { id: displayed.id, input: payload },
      {
        onSuccess: (updated) => {
          setDisplayed(updated);
          setValues(valuesFromApplication(updated));
          setErrors({});
          setMode('view');
        },
        onError: (err) => {
          if (isMissingResource(err)) {
            onClose();
            return;
          }
          setErrors({ topLevel: mapServerError(err) });
        },
      },
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="application-detail-title"
        className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
      >
        <h2
          id="application-detail-title"
          className="text-xl font-semibold text-slate-900 mb-1"
        >
          {mode === 'edit' ? 'Edit application' : displayed.company}
        </h2>
        {mode === 'view' && (
          <p className="text-sm text-slate-700 mb-4">{displayed.role}</p>
        )}

        {errors.topLevel && (
          <div className="rounded-md bg-red-50 border border-red-200 text-sm text-red-700 p-3 mb-4">
            {errors.topLevel}
          </div>
        )}

        {mode === 'view' ? (
          <>
            <dl className="space-y-3 mb-6">
              <Field label="Status">
                <StatusBadge status={displayed.status} />
              </Field>
              <Field label="Location">
                <span className="text-sm text-slate-700">
                  {displayed.location ? displayed.location : '—'}
                </span>
              </Field>
              <Field label="Applied">
                <span className="text-sm text-slate-700">
                  {formatDate(displayed.appliedAt)}
                </span>
              </Field>
              <Field label="Notes">
                {displayed.notes ? (
                  <p className="whitespace-pre-wrap text-sm text-slate-700">
                    {displayed.notes}
                  </p>
                ) : (
                  <span className="text-sm italic text-slate-400">—</span>
                )}
              </Field>
            </dl>

            <div className="flex justify-end items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="text-sm text-slate-600 hover:text-slate-900 px-4 py-2"
              >
                Close
              </button>
              <button
                type="button"
                onClick={enterEditMode}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-md transition"
              >
                Edit
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleEditSubmit} noValidate className="space-y-4">
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
                onClick={cancelEdit}
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
                {isPending ? 'Saving…' : 'Save'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-1">
        {label}
      </dt>
      <dd>{children}</dd>
    </div>
  );
}

function isMissingResource(err: unknown): boolean {
  return axios.isAxiosError(err) && err.response?.status === 404;
}
