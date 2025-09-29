import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

/** TEMP: simple GET so Vercel picks up the route */
export async function GET() {
  return NextResponse.json({ ok: true, route: '/api/blob/upload' });
}
