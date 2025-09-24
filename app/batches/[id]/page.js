# from your repo root
cat > "app/batches/[id]/page.js" <<'EOF'
import getBaseUrl from '@/lib/baseUrl';

export const dynamic = 'force-dynamic';

async function fetchBatch(id) {
  try {
    const url = `${getBaseUrl()}/api/mock/batches/${encodeURIComponent(id)}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return {};
    const data = await res.json();
    return data && typeof data === 'object' ? data : {};
  } catch {
    return {};
  }
}

export default async function Page({ params }) {
  const { id } = params || {};
  const batch = await fetchBatch(id);

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, marginBottom: 12 }}>Batch: {id}</h1>
      <pre style={{ background: '#111', color: '#eee', padding: 16, borderRadius: 8, overflowX: 'auto' }}>
        {JSON.stringify(batch, null, 2)}
      </pre>
      {!batch || Object.keys(batch).length === 0 ? <p>No items in this batch.</p> : null}
    </main>
  );
}
EOF