import { AppHeader } from '../components/AppHeader';
import { JobCard } from '../features/jobs/components/JobCard';
import { useJobs } from '../features/jobs/hooks/useJobs';
import type { JobListing, JobsResponse } from '../types/job';

export function JobsPage() {
  const { data, isLoading, isError, error, refetch } = useJobs({});

  function handleTrack(job: JobListing) {
    // Wired in c5
    void job;
  }

  function renderContent() {
    if (isLoading) return <LoadingState />;
    if (isError)
      return (
        <ErrorState message={errorMessage(error)} onRetry={() => refetch()} />
      );
    if (!data || data.results.length === 0) return <EmptyState />;
    return <JobsList data={data} onTrack={handleTrack} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />
      <main className="max-w-5xl mx-auto px-6 py-8">{renderContent()}</main>
    </div>
  );
}

function LoadingState() {
  return <p className="text-slate-500">Loading jobs…</p>;
}

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="bg-white border border-rose-200 rounded-lg p-6">
      <p className="text-rose-800 font-medium mb-2">Couldn&apos;t load jobs</p>
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
      <p className="text-slate-900 font-medium mb-1">No jobs available yet</p>
      <p className="text-sm text-slate-500">
        Check back once new internship listings have been ingested.
      </p>
    </div>
  );
}

function JobsList({
  data,
  onTrack,
}: {
  data: JobsResponse;
  onTrack: (job: JobListing) => void;
}) {
  return (
    <div>
      <p className="text-sm text-slate-600 mb-4">
        Showing {data.results.length} of {data.total} jobs
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.results.map((job) => (
          <JobCard key={job.id} job={job} onTrack={onTrack} />
        ))}
      </div>
    </div>
  );
}

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return 'Unknown error';
}
