import { Link } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { useAnalyticsSummary } from '../features/analytics/hooks/useAnalyticsSummary';
import { SummaryCards } from '../features/analytics/components/SummaryCards';
import { StatusDistributionChart } from '../features/analytics/components/StatusDistributionChart';
import type { AnalyticsSummary } from '../types/analytics';

export function AnalyticsPage() {
  const { data, isLoading, isError, error, refetch } = useAnalyticsSummary();

  function renderContent() {
    if (isLoading) return <LoadingState />;
    if (isError)
      return <ErrorState message={errorMessage(error)} onRetry={() => refetch()} />;
    if (!data || data.total === 0) return <EmptyState />;
    return <Dashboard summary={data} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />
      <main className="max-w-5xl mx-auto px-6 py-8">{renderContent()}</main>
    </div>
  );
}

function LoadingState() {
  return <p className="text-slate-500">Loading analytics…</p>;
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="bg-white border border-rose-200 rounded-lg p-6">
      <p className="text-rose-800 font-medium mb-2">Couldn&apos;t load analytics</p>
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
      <p className="text-sm text-slate-500 mb-4">
        Track some applications to see your stats here.
      </p>
      <Link
        to="/applications"
        className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
      >
        Go to applications →
      </Link>
    </div>
  );
}

function Dashboard({ summary }: { summary: AnalyticsSummary }) {
  return (
    <div className="space-y-6">
      <SummaryCards total={summary.total} offerRate={summary.offerRate} />
      <StatusDistributionChart statusCounts={summary.statusCounts} />
    </div>
  );
}

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return 'Unknown error';
}
