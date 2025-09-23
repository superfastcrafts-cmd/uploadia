cat > app/batches/[id]/page.js <<'EOF'
import getBaseUrl from '@/lib/baseUrl';
export const dynamic = 'force-dynamic';

async function fetchBatch(id) {
  try {
    const url = `${getBaseUrl()}/api/mock/batches/${encodeURIComponent(id)}`;
    const res = await fetch(url, { cache: 'no-store' });
    const data = await res.json().catch(() => null);
    return data && typeof data === 'object' ? data : {};
  } catch {
    return {};
  }
}

export default async function BatchPage({ params }) {
  const batch = await fetchBatch(params?.id);
  const rawItems = batch?.items ?? batch?.data?.items ?? [];
  const items = Array.isArray(rawItems) ? rawItems : [];

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Batch {batch?.name ?? params?.id ?? ''}
      </h1>

      {items.length === 0 ? (
        <div className="text-sm opacity-70">No items in this batch.</div>
      ) : (
        <ul className="grid gap-3">
          {items.map((it, idx) => (
            <li key={it?.sku ?? it?.id ?? idx} className="rounded border border-white/10 p-4">
              <div className="font-medium">{it?.title ?? `Item ${idx + 1}`}</div>
              <div className="text-xs opacity-70">sku: {it?.sku ?? '—'}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
EOF