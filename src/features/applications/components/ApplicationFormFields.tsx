import type { ApplicationStatus } from '../../../types/application';

const STATUS_OPTIONS: ApplicationStatus[] = [
  'APPLIED',
  'INTERVIEW',
  'OFFER',
  'REJECTED',
];

export type ApplicationFormValues = {
  company: string;
  role: string;
  status: ApplicationStatus;
  location: string;
  notes: string;
};

export type ApplicationFormFieldErrors = {
  company?: string;
  role?: string;
};

type Props = {
  values: ApplicationFormValues;
  onChange: (patch: Partial<ApplicationFormValues>) => void;
  errors: ApplicationFormFieldErrors;
  disabled: boolean;
  autoFocusCompany?: boolean;
};

export function ApplicationFormFields({
  values,
  onChange,
  errors,
  disabled,
  autoFocusCompany = false,
}: Props) {
  return (
    <>
      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Company
        </label>
        <input
          id="company"
          type="text"
          autoFocus={autoFocusCompany}
          required
          maxLength={100}
          disabled={disabled}
          value={values.company}
          onChange={(e) => onChange({ company: e.target.value })}
          className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
        />
        {errors.company && (
          <p className="text-sm text-red-600 mt-1">{errors.company}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Role
        </label>
        <input
          id="role"
          type="text"
          required
          maxLength={200}
          disabled={disabled}
          value={values.role}
          onChange={(e) => onChange({ role: e.target.value })}
          className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
        />
        {errors.role && (
          <p className="text-sm text-red-600 mt-1">{errors.role}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Status
        </label>
        <select
          id="status"
          disabled={disabled}
          value={values.status}
          onChange={(e) =>
            onChange({ status: e.target.value as ApplicationStatus })
          }
          className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Location <span className="text-slate-400">(optional)</span>
        </label>
        <input
          id="location"
          type="text"
          maxLength={200}
          disabled={disabled}
          value={values.location}
          onChange={(e) => onChange({ location: e.target.value })}
          className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
        />
      </div>

      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Notes <span className="text-slate-400">(optional)</span>
        </label>
        <textarea
          id="notes"
          rows={3}
          maxLength={2000}
          disabled={disabled}
          value={values.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
          className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
        />
      </div>
    </>
  );
}
