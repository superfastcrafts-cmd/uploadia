import { headers } from 'next/headers';

export default function getBaseUrl() {
  // 1) Prefer a canonical site URL set in env (project settings in Vercel)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }

  // 2) Vercel provides this (no protocol)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/$/, '');
  }

  // 3) Server: infer from incoming request headers
  try {
    const h = headers();
    const host = h.get('x-forwarded-host') || h.get('host');
    const proto = h.get('x-forwarded-proto') || 'https';
    if (host) return `${proto}://${host}`.replace(/\/$/, '');
  } catch (_) {}

  // 4) Local dev fallback
  return 'http://localhost:3000';
}