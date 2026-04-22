import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { ApplicationStatus } from '../../../types/application';

const STATUS_COLOURS: Record<ApplicationStatus, string> = {
  APPLIED: '#94a3b8',
  INTERVIEW: '#f59e0b',
  OFFER: '#10b981',
  REJECTED: '#f43f5e',
};

const STATUS_ORDER: ApplicationStatus[] = [
  'APPLIED',
  'INTERVIEW',
  'OFFER',
  'REJECTED',
];

type Props = {
  statusCounts: Record<ApplicationStatus, number>;
};

export function StatusDistributionChart({ statusCounts }: Props) {
  const data = STATUS_ORDER.map((status) => ({
    status,
    count: statusCounts[status],
  }));

  return (
    <section className="bg-white rounded-lg border border-slate-200 p-6">
      <h2 className="text-sm font-medium text-slate-900 mb-4">Status distribution</h2>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 16, bottom: 4, left: 8 }}
          >
            <XAxis
              type="number"
              allowDecimals={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
              stroke="#e2e8f0"
            />
            <YAxis
              type="category"
              dataKey="status"
              tick={{ fontSize: 12, fill: '#334155' }}
              width={80}
              stroke="#e2e8f0"
            />
            <Tooltip
              cursor={{ fill: '#f1f5f9' }}
              contentStyle={{
                fontSize: 12,
                borderRadius: 6,
                border: '1px solid #e2e8f0',
              }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]}>
              {data.map((entry) => (
                <Cell key={entry.status} fill={STATUS_COLOURS[entry.status]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
