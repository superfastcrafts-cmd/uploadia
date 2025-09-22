// lib/baseUrl.js
import { headers } from 'next/headers';

export default function getBaseUrl() {
  // 1) Use site URL from environment variable if set
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }

  // 2) Use Vercel-provided URL in production
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/$/, '');
  }

  // 3) Fallback: read from request headers (server only)
  try {
    const h = headers();
    const host = h.get('x-forwarded-host') || h.get('host');
    const proto = h.get('x-forwarded-proto') || 'https';
    if (host) return `${proto}://${host}`.replace(/\/$/, '');
  } catch (err) {
    // Ignore during build
  }

  // 4) Local dev fallback
  return 'http://localhost:3000';
}