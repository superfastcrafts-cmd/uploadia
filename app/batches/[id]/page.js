mkdir -p "app/batches/[id]"
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
  const id = params?.id ?? '';
  const batch = await fetchBatch(id);

  if (!batch?.id) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-semibold">Batch not found</h1>
        <p className="mt-2 text-sm text-gray-500">ID: {id}</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Batch {batch.id}</h1>
      <p className="text-sm text-gray-600">Status: {batch.status}</p>
      {Array.isArray(batch.items) && batch.items.length > 0 && (
        <ul className="list-disc pl-6">
          {batch.items.map((it, idx) => (
            <li key={idx}>{it?.name ?? `Item ${idx + 1}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
EOF