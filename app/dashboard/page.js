// Force dynamic rendering so we can use request headers to detect host
export const dynamic = 'force-dynamic';

import { getBaseUrl } from '@/lib/baseUrl';

async function getBatches() {
  // Build the absolute URL
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/mock/batches`, {
    method: 'GET',
    cache: 'no-store', // Ensure no stale data is cached
  });

  if (!res.ok) {
    throw new Error(`Failed to load batches: ${res.status}`);
  }

  return res.json();
}

export default async function DashboardPage() {
  let batches = [];

  try {
    batches = await getBatches();
  } catch (error) {
    console.error('Error loading batches:', error);
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {batches.length === 0 ? (
        <p className="text-gray-400">No batches found.</p>
      ) : (
        <ul className="space-y-4">
          {batches.map((batch) => (
            <li
              key={batch.id}
              className="p-4 bg-gray-800 rounded-md shadow-md hover:bg-gray-700 transition"
            >
              <h2 className="text-xl font-semibold">{batch.name}</h2>
              <p className="text-gray-400 text-sm">
                {batch.items?.length || 0} items
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}