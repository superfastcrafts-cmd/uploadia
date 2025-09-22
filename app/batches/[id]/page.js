
async function getBatch(id) {
  const res = await fetch(`/api/mock/batches/${id}`, { cache: 'no-store' });
  return res.json();
}
export default async function Batch({ params }) {
  const data = await getBatch(params.id);
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{data.name}</h2>
        <span className="pill">{data.status}</span>
      </div>
      <div className="card">
        <table className="w-full text-left">
          <thead><tr className="text-slate-300"><th>Listing</th><th>Status</th><th>Etsy link</th></tr></thead>
          <tbody>
            {data.items.map((it, i) => (
              <tr key={i} className="border-t border-white/10">
                <td className="py-2">{it.title}</td>
                <td className="py-2">{it.status}</td>
                <td className="py-2">{it.etsy_listing_id ? <a className="underline" href={`https://www.etsy.com/listing/${it.etsy_listing_id}`} target="_blank">Open</a> : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
