export default function getBaseUrl() {
  // On the browser, use relative paths
  if (typeof window !== 'undefined') return '';

  // On the server (Vercel), prefer the provided URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  // Local dev fallback
  const port = process.env.PORT || 3000;
  return `http://localhost:${port}`;
}