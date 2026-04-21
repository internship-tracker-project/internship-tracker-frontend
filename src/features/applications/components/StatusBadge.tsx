import type { ApplicationStatus } from '../../../types/application';

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  APPLIED: 'bg-slate-100 text-slate-700',
  INTERVIEW: 'bg-amber-100 text-amber-800',
  OFFER: 'bg-emerald-100 text-emerald-800',
  REJECTED: 'bg-rose-100 text-rose-800',
};

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}
