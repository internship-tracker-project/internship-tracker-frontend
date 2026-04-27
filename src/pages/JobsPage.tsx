import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { CreateApplicationModal } from '../features/applications/components/CreateApplicationModal';
import { JobCard } from '../features/jobs/components/JobCard';
import { useJobs } from '../features/jobs/hooks/useJobs';
import type { JobListing, JobsFilters, JobsResponse } from '../types/job';

export function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [qInput, setQInput] = useState(() => searchParams.get('q') ?? '');
  const [locationInput, setLocationInput] = useState(
    () => searchParams.get('location') ?? '',
  );

  const debouncedQ = useDebouncedValue(qInput, 300);
  const debouncedLocation = useDebouncedValue(locationInput, 300);

  const trimmedQ = debouncedQ.trim();
  const trimmedLocation = debouncedLocation.trim();
  const hasFilters = trimmedQ.length > 0 || trimmedLocation.length > 0;

  useEffect(() => {
    const next = new URLSearchParams();
    if (trimmedQ) next.set('q', trimmedQ);
    if (trimmedLocation) next.set('location', trimmedLocation);
    setSearchParams(next, { replace: true });
  }, [trimmedQ, trimmedLocation, setSearchParams]);

  const filters: JobsFilters = {
    q: trimmedQ || undefined,
    location: trimmedLocation || undefined,
  };

  const { data, isLoading, isError, error, refetch, isFetching } =
    useJobs(filters);

  const [trackingJob, setTrackingJob] = useState<JobListing | null>(null);

  function handleTrack(job: JobListing) {
    setTrackingJob(job);
  }

  function renderContent() {
    if (isLoading) return <LoadingState />;
    if (isError)
      return (
        <ErrorState message={errorMessage(error)} onRetry={() => refetch()} />
      );
    if (!data || data.results.length === 0)
      return <EmptyState hasFilters={hasFilters} />;
    return (
      <JobsList
        data={data}
        onTrack={handleTrack}
        isRefetching={isFetching}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />
      <main className="max-w-5xl mx-auto px-6 py-8">
        <FilterRow
          qValue={qInput}
          locationValue={locationInput}
          onQChange={setQInput}
          onLocationChange={setLocationInput}
        />
        {renderContent()}
      </main>
      {trackingJob && (
        <CreateApplicationModal
          onClose={() => setTrackingJob(null)}
          initialValues={{
            company: trackingJob.company,
            role: trackingJob.title,
            location: trackingJob.location ?? '',
            notes: `Source: Adzuna\nApply: ${trackingJob.applyUrl}`,
          }}
        />
      )}
    </div>
  );
}

function FilterRow({
  qValue,
  locationValue,
  onQChange,
  onLocationChange,
}: {
  qValue: string;
  locationValue: string;
  onQChange: (value: string) => void;
  onLocationChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        type="text"
        value={qValue}
        onChange={(e) => onQChange(e.target.value)}
        placeholder="Search title or company"
        className="flex-1 border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      <input
        type="text"
        value={locationValue}
        onChange={(e) => onLocationChange(e.target.value)}
        placeholder="Location"
        className="flex-1 border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
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

function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  if (hasFilters) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-10 text-center">
        <p className="text-slate-900 font-medium mb-1">
          No jobs match your filters
        </p>
        <p className="text-sm text-slate-500">
          Try a broader keyword or clear the location filter.
        </p>
      </div>
    );
  }
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
  isRefetching,
}: {
  data: JobsResponse;
  onTrack: (job: JobListing) => void;
  isRefetching: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-600">
          Showing {data.results.length} of {data.total} jobs
        </p>
        {isRefetching && (
          <p className="text-xs text-slate-500">Updating…</p>
        )}
      </div>
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

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}
