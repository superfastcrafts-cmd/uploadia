cat > app/dashboard/page.js <<'EOF'
import getBaseUrl from '@/lib/baseUrl';
export const dynamic = 'force-dynamic';

async function fetchBatches() {
  try {
    const url = `${getBaseUrl()}/api/mock/batches`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function Page() {
  const batches = await fetchBatches();

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, marginBottom: 12 }}>Dashboard</h1>
      {batches.length === 0 ? (
        <p>No batches yet.</p>
      ) : (
        <ul style={{ lineHeight: 1.8, paddingLeft: 18 }}>
          {batches.map((b) => (
            <li key={b.id}>
              <strong>ID:</strong> {b?.id ?? ''} — {b?.name ?? ''}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
EOF