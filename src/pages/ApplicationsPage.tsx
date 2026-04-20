import { useNavigate } from 'react-router-dom';
import { useApplications } from '../features/applications/hooks/useApplications';
import { useAuth } from '../context/useAuth';
import type { Application, ApplicationStatus } from '../types/application';

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  APPLIED: 'bg-slate-100 text-slate-700',
  INTERVIEW: 'bg-amber-100 text-amber-800',
  OFFER: 'bg-emerald-100 text-emerald-800',
  REJECTED: 'bg-rose-100 text-rose-800',
};

function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function ApplicationsPage() {
  const { data, isLoading, isError, error, refetch, isFetching } = useApplications();
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  function renderContent() {
    if (isLoading) return <LoadingState />;
    if (isError) return <ErrorState message={errorMessage(error)} onRetry={() => refetch()} />;
    if (!data || data.length === 0) return <EmptyState />;
    return <ApplicationsTable applications={data} isRefetching={isFetching} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-900">Applications</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

function LoadingState() {
  return <p className="text-slate-500">Loading applications…</p>;
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="bg-white border border-rose-200 rounded-lg p-6">
      <p className="text-rose-800 font-medium mb-2">Couldn&apos;t load applications</p>
      <p className="text-sm text-slate-600 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="text-sm bg-slate-900 text-white px-3 py-1.5 rounded-md hover:bg-slate-700"
      >
        Try again
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-10 text-center">
      <p className="text-slate-900 font-medium mb-1">No applications yet</p>
      <p className="text-sm text-slate-500">
        Your tracked internship applications will appear here.
      </p>
    </div>
  );
}

function ApplicationsTable({
  applications,
  isRefetching,
}: {
  applications: Application[];
  isRefetching: boolean;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      {isRefetching && (
        <div className="px-6 py-2 text-xs text-slate-500 bg-slate-50 border-b border-slate-200">
          Updating…
        </div>
      )}
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <Th>Company</Th>
            <Th>Role</Th>
            <Th>Status</Th>
            <Th>Location</Th>
            <Th>Applied</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {applications.map((app) => (
            <tr key={app.id} className="hover:bg-slate-50">
              <Td className="font-medium text-slate-900">{app.company}</Td>
              <Td>{app.role}</Td>
              <Td>
                <StatusBadge status={app.status} />
              </Td>
              <Td>{app.location ?? '—'}</Td>
              <Td>{formatDate(app.appliedAt)}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left text-xs font-medium text-slate-600 uppercase tracking-wide px-6 py-3">
      {children}
    </th>
  );
}

function Td({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-6 py-3 text-sm text-slate-700 ${className}`}>{children}</td>;
}

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return 'Unknown error';
}
