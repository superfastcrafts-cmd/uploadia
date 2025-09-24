import getBaseUrl from '@/lib/baseUrl';
export const dynamic = 'force-dynamic';

export default async function Page() {
  const url = `${getBaseUrl()}/api/mock/batches`;

  let items = [];
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        items = data;
      }
    }
  } catch (error) {
    console.error('Failed to fetch batches:', error);
  }

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, marginBottom: 12 }}>Batches</h1>
      {items.length > 0 ? (
        <ul style={{ background: '#111', color: '#eee', padding: 16, borderRadius: 8, overflowX: 'auto' }}>
          {items.map((b) => (
            <li key={b.id} style={{ padding: 12, border: '1px solid #444', borderRadius: 8, marginBottom: 8 }}>
              <strong>ID:</strong> {b.id} <br />
              <em>Name:</em> {b.name || 'Unnamed'}
            </li>
          ))}
        </ul>
      ) : (
        <p>No batches found.</p>
      )}
    </main>
  );
}
