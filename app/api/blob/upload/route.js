mkdir -p app/api/blob/upload
cat > app/api/blob/upload/route.js <<'EOF'
import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// Health check
export async function GET() {
  return NextResponse.json({ ok: true, route: '/api/blob/upload', method: 'GET' });
}

// File upload
export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: 'Missing file' }, { status: 400 });
    }

    const key = `uploads/${Date.now()}-${file.name}`;
    const token = process.env.BLOB_READ_WRITE_TOKEN; // set this in Vercel → Project → Settings → Environment Variables

    const { url } = await put(key, file, {
      access: 'public',
      token, // required in Preview/Production if not using automatic token
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
EOF