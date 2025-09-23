cat > app/dashboard/page.js <<'EOF'
import getBaseUrl from '@/lib/baseUrl';
export const dynamic = 'force-dynamic'; // ensure fresh data in dev

async function fetchBatches() {
  try {
    const url = `${getBaseUrl()}/api/mock/batches`;
    const res = await fetch(url, { cache: 'no-store' });
    const data = await res.json().catch(() => null);
    // support shapes: {items:[...]} OR [...]
    return Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : [];
  } catch {
    return [];
  }
}

export default async function DashboardPage() {
  const items = await fetchBatches();

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Dashboard</h1>

      {items.length === 0 ? (
        <div className="text-sm opacity-70">No batches yet.</div>
      ) : (
        <ul className="grid gap-3">
          {items.map((it, idx) => (
            <li key={it?.id ?? idx} className="rounded border border-white/10 p-4">
              <div className="font-medium">{it?.title ?? `Item ${idx + 1}`}</div>
              <div className="text-xs opacity-70">id: {it?.id ?? '—'}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
EOF