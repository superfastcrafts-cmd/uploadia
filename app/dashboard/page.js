cat > app/dashboard/page.js <<'EOF'
import getBaseUrl from '@/lib/baseUrl';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const url = `${getBaseUrl()}/api/mock/batches`;
  let items = [];
  try {
    const res = await fetch(url, { cache: 'no-store' });
    items = res.ok ? await res.json() : [];
    if (!Array.isArray(items)) items = [];
  } catch {
    items = [];
  }

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, marginBottom: 12 }}>Dashboard</h1>
      <p>{items.length ? `${items.length} batches` : 'No batches yet.'}</p>
      <ul style={{ marginTop: 12 }}>
        {items.map((b) => (
          <li key={String(b.id ?? b.name)} style={{ padding: 8, border: '1px solid #444', borderRadius: 8, marginBottom: 8 }}>
            <strong>ID:</strong> {String(b.id ?? '')} &nbsp; • &nbsp; <em>{b.name ?? ''}</em>
          </li>
        ))}
      </ul>
    </main>
  );
}
EOF