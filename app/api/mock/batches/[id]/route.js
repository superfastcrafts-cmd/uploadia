
export async function GET(_, { params }) {
  const id = params.id;
  const items = Array.from({ length: 8 }).map((_,i)=> ({
    title: `Listing ${i+1}`,
    status: i < 5 ? 'uploaded' : i === 5 ? 'error' : 'queued',
    etsy_listing_id: i < 5 ? 123456789 + i : null
  }));
  return Response.json({ id, name: `Batch ${id}`, status: 'running', items });
}
