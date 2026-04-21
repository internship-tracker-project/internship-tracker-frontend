import { useEffect } from 'react';
import type { Application } from '../../../types/application';
import { StatusBadge } from './StatusBadge';

type Props = {
  application: Application;
  onClose: () => void;
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function ApplicationDetailModal({ application, onClose }: Props) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

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
          {application.company}
        </h2>
        <p className="text-sm text-slate-700 mb-4">{application.role}</p>

        <dl className="space-y-3 mb-6">
          <Field label="Status">
            <StatusBadge status={application.status} />
          </Field>
          <Field label="Location">
            <span className="text-sm text-slate-700">
              {application.location ?? '—'}
            </span>
          </Field>
          <Field label="Applied">
            <span className="text-sm text-slate-700">
              {formatDate(application.appliedAt)}
            </span>
          </Field>
          <Field label="Notes">
            {application.notes ? (
              <p className="whitespace-pre-wrap text-sm text-slate-700">
                {application.notes}
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
        </div>
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
