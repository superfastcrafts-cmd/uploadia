import getBaseUrl from '@/lib/baseUrl';

export default async function DashboardPage() {
  const base = getBaseUrl();

  let data = [];
  let error = null;

  try {
    const res = await fetch(`${base}/api/mock/batches`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch data');
    data = await res.json();
  } catch (err) {
    error = err.message;
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your mock batches</h1>
      {error && <div className="text-red-500">Error: {error}</div>}
      <ul>
        {data.map((batch) => (
          <li key={batch.id} className="border-b py-2">
            {batch.name}
          </li>
        ))}
      </ul>
    </main>
  );
}