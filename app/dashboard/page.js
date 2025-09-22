'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [batches, setBatches] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/mock/batches');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setBatches(data);
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to load');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Your mock batches</h1>
      {loading && <p>Loading…</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <ul className="space-y-3">
          {batches.map(b => (
            <li key={b.id} className="rounded border border-white/10 p-4">
              <div className="font-medium">{b.name}</div>
              <div className="text-sm opacity-70">{b.items} items</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}