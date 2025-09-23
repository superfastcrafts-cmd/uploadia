export async function GET() {
  const data = [
    { id: 'batch-1', name: 'Sample Batch A', items: 5 },
    { id: 'batch-2', name: 'Sample Batch B', items: 12 },
  ];
  return new Response(JSON.stringify(data), { headers: { 'content-type': 'application/json' } });
}
