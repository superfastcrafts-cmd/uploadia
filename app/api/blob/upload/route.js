import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ ok: true, route: '/api/blob/upload', method: 'GET' });
}

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: 'Missing file' }, { status: 400 });
    }

    const key = `uploads/${Date.now()}-${file.name}`;
    const token = process.env.BLOB_READ_WRITE_TOKEN;

    const { url } = await put(key, file, {
      access: 'public',
      token, // works for Preview/Production when the env var is set in Vercel
    });

    return NextResponse.json({
      ok: true,
      url,
      pathname: new URL(url).pathname,
      name: file.name,
      size: file.size,
      type: file.type,
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
