export async function fetchJson(url, init = {}) {
  const res = await fetch(url, { cache: 'no-store', ...init });
  const text = await res.text();
  let body;
  try { body = text ? JSON.parse(text) : null; } catch { body = { raw: text }; }
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status} on ${url}`);
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return body;
}