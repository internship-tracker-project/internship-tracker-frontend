import type { Application } from '../../../types/application';
import { StatusBadge } from './StatusBadge';

type Props = {
  application: Application;
  onClick: () => void;
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function ApplicationCard({ application, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left bg-white border border-slate-200 rounded-lg p-4 hover:border-indigo-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
    >
      <p className="text-base font-semibold text-slate-900 mb-1">
        {application.company}
      </p>
      <p className="text-sm text-slate-700 mb-3">{application.role}</p>
      <div className="flex items-center gap-2 mb-3">
        <StatusBadge status={application.status} />
        {application.location && (
          <span className="text-xs text-slate-500">{application.location}</span>
        )}
      </div>
      <p className="text-xs text-slate-500">
        Applied {formatDate(application.appliedAt)}
      </p>
    </button>
  );
}
