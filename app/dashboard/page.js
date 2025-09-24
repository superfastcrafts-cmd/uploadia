import getBaseUrl from '@/lib/baseUrl';
export const dynamic = 'force-dynamic';

export default async function Page() {
  const url = `${getBaseUrl()}/api/mock/batches`;
  let items = [];

  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) items = data;
    }
  } catch {}

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <a href="/upload" className="inline-block px-4 py-2 rounded bg-black text-white">New upload</a>

      <div className="mt-6 grid gap-4">
        {items.length === 0 ? (
          <p className="text-gray-500">No batches yet.</p>
        ) : (
          items.map((b) => (
            <a key={b.id} href={`/batches/${b.id}`} className="block border p-4 rounded hover:bg-gray-50">
              <div className="font-medium">Batch {b.id}</div>
              <div className="text-sm text-gray-600">Status: {b.status}</div>
            </a>
          ))
        )}
      </div>
    </main>
  );
}