// lib/baseUrl.js
import { headers } from 'next/headers';

export default function getBaseUrl() {
  // Prefer explicit environment variable if set in Vercel
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }

  // Vercel provides this automatically in production
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/$/, '');
  }

  // Local development fallback
  try {
    const h = headers();
    const host = h.get('x-forwarded-host') || h.get('host');
    const proto = (h.get('x-forwarded-proto') || 'https').split(',')[0];
    if (host) return `${proto}://${host}`.replace(/\/$/, '');
  } catch (_) {}

  return 'http://localhost:3000';
}// lib/baseUrl.js
import { headers } from 'next/headers';

export function getBaseUrl() {
  // 1) If you set a canonical site URL in Vercel env, prefer it.
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }

  // 2) Vercel provides VERCEL_URL (no protocol)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/$/, '');
  }

  // 3) Fallback: read host from the incoming request headers (server only)
  try {
    const h = headers();
    const host = h.get('x-forwarded-host') || h.get('host');
    const proto = (h.get('x-forwarded-proto') || 'https').split(',')[0];
    if (host) return `${proto}://${host}`.replace(/\/$/, '');
  } catch (_) {
    // headers() not available (build time) — fall through
  }

  // 4) Local dev fallback
  return 'http://localhost:3000';
}
