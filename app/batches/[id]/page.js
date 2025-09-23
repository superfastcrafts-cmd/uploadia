cat > app/batches/[id]/page.js <<'EOF'
import getBaseUrl from '@/lib/baseUrl';
export const dynamic = 'force-dynamic';

<<<<<<< HEAD
async function fetchBatch(id) {
  try {
    const url = `${getBaseUrl()}/api/mock/batches/${encodeURIComponent(id)}`;
    const res = await fetch(url, { cache: 'no-store' });
    const data = await res.json().catch(() => null);
    return data && typeof data === 'object' ? data : {};
  } catch {
    return {};
=======
export default async function Page({ params }) {
  const { id } = params || {};
  const url = `${getBaseUrl()}/api/mock/batches/${encodeURIComponent(id)}`;
  let batch = null;
  let items = [];

  try {
    const res = await fetch(url, { cache: 'no-store' });
    const data = res.ok ? await res.json() : null;

    if (data) {
      batch = data.batch ?? data;
      const raw = data.items ?? data;
      items = Array.isArray(raw) ? raw : [];
    }
  } catch {
    items = [];
>>>>>>> 1e8669e9 (WIP: save local changes before rebase)
  }
}

export default async function BatchPage({ params }) {
  const batch = await fetchBatch(params?.id);
  const rawItems = batch?.items ?? batch?.data?.items ?? [];
  const items = Array.isArray(rawItems) ? rawItems : [];

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
<<<<<<< HEAD
        Batch {batch?.name ?? params?.id ?? ''}
=======
        Batch {batch?.name ?? id}
>>>>>>> 1e8669e9 (WIP: save local changes before rebase)
      </h1>

      {items.length === 0 ? (
        <div className="text-sm opacity-70">No items in this batch.</div>
      ) : (
        <ul className="grid gap-3">
          {items.map((it, idx) => (
<<<<<<< HEAD
            <li key={it?.sku ?? it?.id ?? idx} className="rounded border border-white/10 p-4">
              <div className="font-medium">{it?.title ?? `Item ${idx + 1}`}</div>
              <div className="text-xs opacity-70">sku: {it?.sku ?? '—'}</div>
=======
            <li key={it.id ?? idx} className="rounded border border-white/10 p-4">
              <div className="font-medium">{it.title ?? `Item ${idx + 1}`}</div>
              <div className="text-xs opacity-70">{it.sku ?? ''}</div>
>>>>>>> 1e8669e9 (WIP: save local changes before rebase)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
EOF