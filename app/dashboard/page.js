<<<<<<< HEAD
cat > app/dashboard/page.js <<'EOF'
import getBaseUrl from '@/lib/baseUrl';
export const dynamic = 'force-dynamic'; // ensure fresh data in dev

async function fetchBatches() {
  try {
    const url = `${getBaseUrl()}/api/mock/batches`;
    const res = await fetch(url, { cache: 'no-store' });
    const data = await res.json().catch(() => null);
    // support shapes: {items:[...]} OR [...]
    return Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : [];
  } catch {
    return [];
  }
}

export default async function DashboardPage() {
  const items = await fetchBatches();

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Dashboard</h1>

      {items.length === 0 ? (
        <div className="text-sm opacity-70">No batches yet.</div>
      ) : (
        <ul className="grid gap-3">
          {items.map((it, idx) => (
            <li key={it?.id ?? idx} className="rounded border border-white/10 p-4">
              <div className="font-medium">{it?.title ?? `Item ${idx + 1}`}</div>
              <div className="text-xs opacity-70">id: {it?.id ?? '—'}</div>
=======
'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const res = await fetch('/api/mock/batches');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancel) setBatches(data);
      } catch (e) {
        if (!cancel) setErr(e.message || 'Failed to load');
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, []);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Your mock batches</h1>
      {loading && <p>Loading…</p>}
      {err && <p className="text-red-500">Error: {err}</p>}
      {!loading && !err && (
        <ul className="space-y-3">
          {batches.map(b => (
            <li key={b.id} className="rounded border border-white/10 p-4">
              <div className="font-medium">{b.name}</div>
              <div className="text-sm opacity-70">{b.items} items</div>
>>>>>>> d4e5e4bf (feat: fresh Next 15 app with dashboard + mock API)
            </li>
          ))}
        </ul>
      )}
<<<<<<< HEAD
    </div>
  );
}
EOF
=======
    </main>
  );
}
>>>>>>> d4e5e4bf (feat: fresh Next 15 app with dashboard + mock API)
