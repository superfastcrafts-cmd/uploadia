cat > app/dashboard/page.js <<'EOF'
import getBaseUrl from '@/lib/baseUrl';

export const dynamic = 'force-dynamic';

async function fetchBatches() {
  try {
    const res = await fetch(`${getBaseUrl()}/api/mock/batches`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function Page() {
  const items = await fetchBatches();

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, marginBottom: 12 }}>Dashboard</h1>
      {items.length === 0 ? (
        <p>No batches yet.</p>
      ) : (
        <ul style={{ display: 'grid', gap: 12 }}>
          {items.map((b, i) => (
            <li key={b.id ?? i} style={{ padding: 12, border: '1px solid #444', borderRadius: 8 }}>
              <strong>ID:</strong> {String(b.id ?? '')}
              {b.name ? <> — <em>{b.name}</em></> : null}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
EOF