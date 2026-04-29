import { useState } from 'react';
import { useApplications } from '../features/applications/hooks/useApplications';
import { CreateApplicationModal } from '../features/applications/components/CreateApplicationModal';
import { ApplicationCard } from '../features/applications/components/ApplicationCard';
import { ApplicationDetailModal } from '../features/applications/components/ApplicationDetailModal';
import { AppHeader } from '../components/AppHeader';
import type { Application } from '../types/application';

export function ApplicationsPage() {
  const { data, isLoading, isError, error, refetch, isFetching } = useApplications();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  function renderContent() {
    if (isLoading) return <LoadingState />;
    if (isError) return <ErrorState message={errorMessage(error)} onRetry={() => refetch()} />;
    if (!data || data.length === 0) return <EmptyState />;
    return (
      <ApplicationsGrid
        applications={data}
        isRefetching={isFetching}
        onSelect={setSelectedApplication}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-3 py-1.5 rounded-md transition"
        >
          New application
        </button>
      </AppHeader>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {renderContent()}
      </main>

      {isCreateOpen && (
        <CreateApplicationModal onClose={() => setIsCreateOpen(false)} />
      )}
      {selectedApplication && (
        <ApplicationDetailModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}
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

function ApplicationsGrid({
  applications,
  isRefetching,
  onSelect,
}: {
  applications: Application[];
  isRefetching: boolean;
  onSelect: (application: Application) => void;
}) {
  return (
    <div>
      {isRefetching && (
        <p className="text-xs text-slate-500 mb-3">Updating…</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {applications.map((app) => (
          <ApplicationCard
            key={app.id}
            application={app}
            onClick={() => onSelect(app)}
          />
        ))}
      </div>
    </div>
  );
}

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return 'Unknown error';
}
