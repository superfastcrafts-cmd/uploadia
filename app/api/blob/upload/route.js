import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Optional: prefix to organize uploads
    const key = `uploads/${Date.now()}-${file.name}`;

    const blob = await put(key, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN, // required on server
    });

    return NextResponse.json({ ok: true, url: blob.url, pathname: blob.pathname });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

// Optional health check while testing
export async function GET() {
  return NextResponse.json({ ok: true, route: '/api/blob/upload', method: 'GET' });
}