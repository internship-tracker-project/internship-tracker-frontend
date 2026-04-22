import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const WEEKS_BACK = 12;

type WeekPoint = { weekStart: string; count: number };

function fillWeekGaps(
  series: WeekPoint[],
  weeksBack: number = WEEKS_BACK,
  today: Date = new Date(),
): WeekPoint[] {
  const byDate = new Map(series.map((p) => [p.weekStart, p.count]));
  const thisMonday = startOfIsoWeekUTC(today);
  const result: WeekPoint[] = [];
  for (let i = weeksBack - 1; i >= 0; i--) {
    const d = new Date(thisMonday);
    d.setUTCDate(d.getUTCDate() - i * 7);
    const key = d.toISOString().slice(0, 10);
    result.push({ weekStart: key, count: byDate.get(key) ?? 0 });
  }
  return result;
}

function startOfIsoWeekUTC(date: Date): Date {
  const d = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
  const dayOfWeek = d.getUTCDay();
  const shift = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  d.setUTCDate(d.getUTCDate() + shift);
  return d;
}

function formatTick(weekStart: string): string {
  const d = new Date(`${weekStart}T00:00:00Z`);
  return d.toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
    timeZone: 'UTC',
  });
}

type Props = {
  timeSeries: WeekPoint[];
};

export function WeeklyTimeseriesChart({ timeSeries }: Props) {
  const data = fillWeekGaps(timeSeries);

  return (
    <section className="bg-white rounded-lg border border-slate-200 p-6">
      <h2 className="text-sm font-medium text-slate-900 mb-4">
        Applications per week
      </h2>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 16, bottom: 4, left: 8 }}
          >
            <CartesianGrid stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="weekStart"
              tickFormatter={formatTick}
              tick={{ fontSize: 12, fill: '#64748b' }}
              stroke="#e2e8f0"
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
              stroke="#e2e8f0"
              width={28}
            />
            <Tooltip
              labelFormatter={(label) => formatTick(String(label))}
              contentStyle={{
                fontSize: 12,
                borderRadius: 6,
                border: '1px solid #e2e8f0',
              }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#4f46e5"
              fill="#c7d2fe"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
