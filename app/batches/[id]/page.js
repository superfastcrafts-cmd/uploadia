import getBaseUrl from '../../../lib/baseUrl'; // relative import

export default async function BatchDetail({ params }) {
  const base = getBaseUrl();

  let batch = null;
  let error = null;

  try {
    const res = await fetch(`${base}/api/mock/batches/${params.id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch batch details');
    batch = await res.json();
  } catch (err) {
    error = err.message;
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      {error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">{batch?.name || 'Batch Details'}</h1>
          <p className="text-gray-700">{batch?.description}</p>
        </>
      )}
    </main>
  );
}