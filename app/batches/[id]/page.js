import getBaseUrl from '@/lib/baseUrl';
export const dynamic = 'force-dynamic';

export default async function BatchPage({ params }) {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/batches/${params.id}`);
  
  if (!res.ok) {
    return <div className="p-6 text-center">Error loading batch.</div>;
  }

  const batch = await res.json();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Batch #{batch.id}</h1>
      <ul className="space-y-2">
        {batch.files?.map((file, i) => (
          <li
            key={i}
            className="p-3 rounded bg-slate-800 border border-slate-700"
          >
            {file}
          </li>
        ))}
      </ul>
    </div>
  );
}