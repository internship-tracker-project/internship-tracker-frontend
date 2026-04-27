import type { JobListing } from '../../../types/job';

type Props = {
  job: JobListing;
  onTrack: (job: JobListing) => void;
};

function formatPostedDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  });
}

export function JobCard({ job, onTrack }: Props) {
  const subtitle = [job.company, job.location, job.salary]
    .filter((part): part is string => Boolean(part))
    .join(' · ');

  return (
    <article className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col gap-2">
      <h3 className="text-base font-semibold text-slate-900">{job.title}</h3>
      {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
      {job.description && (
        <p className="text-sm text-slate-700 line-clamp-2">{job.description}</p>
      )}
      <div className="flex items-center justify-between gap-2 mt-2">
        <p className="text-xs text-slate-500">
          Posted {formatPostedDate(job.postedAt)}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onTrack(job)}
            className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-3 py-1.5 rounded-md transition"
          >
            Track this
          </button>
          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-700 hover:text-slate-900 border border-slate-300 hover:border-slate-400 font-medium px-3 py-1.5 rounded-md transition"
          >
            View →
          </a>
        </div>
      </div>
    </article>
  );
}
