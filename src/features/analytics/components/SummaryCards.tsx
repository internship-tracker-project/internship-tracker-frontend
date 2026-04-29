type Props = {
  total: number;
  offerRate: number;
};

function formatOfferRate(rate: number, total: number): string {
  if (total === 0) return '—';
  const pct = rate * 100;
  return Number.isInteger(pct) ? `${pct}%` : `${(Math.round(pct * 10) / 10).toFixed(1)}%`;
}

export function SummaryCards({ total, offerRate }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <StatCard label="Total applications" value={String(total)} />
      <StatCard label="Offer rate" value={formatOfferRate(offerRate, total)} />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-1">
        {label}
      </p>
      <p className="text-3xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}
