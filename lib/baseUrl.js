cat > lib/baseUrl.js <<'JS'
// lib/baseUrl.js
import { headers } from 'next/headers';

export default function getBaseUrl() {
  // 1) Canonical URL from env (set in Vercel Project Settings)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }

  // 2) Vercel-provided URL (no protocol in VERCEL_URL)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/$/, '');
  }

  // 3) Infer from incoming request headers (server)
  try {
    const h = headers();
    const host = h.get('x-forwarded-host') || h.get('host');
    const proto = h.get('x-forwarded-proto') || 'https';
    if (host) return `${proto}://${host}`.replace(/\/$/, '');
  } catch {}

  // 4) Local dev fallback
  return 'http://localhost:3000';
}
JS