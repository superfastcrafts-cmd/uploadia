
export async function GET() {
  const batches = [
    { id: 'abc123', name: 'September Uploads', status: 'running', total: 10, success: 6, failed: 1 },
    { id: 'xyz789', name: 'Test Batch', status: 'done', total: 3, success: 3, failed: 0 }
  ];
  return Response.json({ batches });
}
