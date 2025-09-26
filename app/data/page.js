export const metadata = {
  title: 'Data Retention & Deletion – Uploadia',
  description: 'How long we keep data and how you can delete it.',
};

const SUPPORT = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@getuploadia.com';

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 prose prose-invert">
      <h1>Data Retention &amp; Deletion</h1>
      <p><em>Last updated: {new Date().toISOString().slice(0,10)}</em></p>

      <h2>Retention policy</h2>
      <ul>
        <li>
          <strong>Batches &amp; metadata:</strong> retained until you delete them, or
          automatically removed after 180 days of inactivity.
        </li>
        <li>
          <strong>Uploaded assets:</strong> images and digital files are tied to the batch lifecycle and
          are deleted when a batch is deleted.
        </li>
        <li>
          <strong>Operational logs:</strong> short-lived (typically 30–90 days) for reliability and abuse prevention.
        </li>
      </ul>

      <h2>How to delete</h2>
      <ol>
        <li>From your dashboard, delete a batch to remove its assets and metadata.</li>
        <li>
          For account-level deletion (all data), email{' '}
          <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a>. We’ll confirm deletion within 7 days.
        </li>
      </ol>

      <h2>Exports</h2>
      <p>
        If you need a copy of your metadata (e.g., CSV of titles/tags), contact us at{' '}
        <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a>.
      </p>
    </main>
  );
}