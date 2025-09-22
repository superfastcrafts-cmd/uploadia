
async function getBatches() {
  const res = await fetch('/api/mock/batches', { cache: 'no-store' });
  return res.json();
}
export default async function Dashboard() {
  const data = await getBatches();
  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="grid gap-3">
        {data.batches.map(b => (
          <a key={b.id} href={`/batches/${b.id}`} className="card hover:outline hover:outline-1 hover:outline-indigo-500/40">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{b.name}</div>
                <div className="text-slate-400 text-sm">{b.total} listings • {b.status}</div>
              </div>
              <div className="text-right">
                <div className="text-sm">Success {b.success}/{b.total}</div>
                <div className="text-sm">Failed {b.failed}</div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
