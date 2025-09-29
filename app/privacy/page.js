export const metadata = {
  title: 'Privacy Policy – Uploadia',
  description:
    'How Uploadia collects, uses, stores, and deletes your data.',
};

const SUPPORT = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@getuploadia.com';

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 prose prose-invert">
      <h1>Privacy Policy</h1>
      <p><em>Last updated: {new Date().toISOString().slice(0,10)}</em></p>

      <h2>Who we are</h2>
      <p>
        Uploadia helps Etsy sellers bulk-create <strong>draft</strong> listings from
        organized design folders. We preserve your image order, attach your digital
        files, and optionally generate titles, descriptions, and tags (or import them via CSV).
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>Account &amp; auth info (email, session tokens).</li>
        <li>Uploaded assets (images, digital files) and batch/job metadata.</li>
        <li>Operational analytics (errors, performance, usage counts) in aggregate.</li>
      </ul>

      <h2>How we use your data</h2>
      <ul>
        <li>To process batches, generate metadata, and create <strong>draft</strong> listings on Etsy.</li>
        <li>To provide support and improve reliability and performance.</li>
        <li>Never to sell your data to third parties.</li>
      </ul>

      <h2>Where we store it</h2>
      <p>
        Assets and metadata are stored with our cloud providers (e.g., Supabase storage &amp; database).
        Providers are chosen for security and availability.
      </p>

      <h2>Retention</h2>
      <ul>
        <li>Draft batches &amp; generated metadata: kept until you delete them, or 180 days after last activity (whichever comes first).</li>
        <li>Uploaded assets (images / digital files): tied to the batch lifecycle and removed when the batch is deleted.</li>
        <li>Logs/analytics: short-lived rollups (typically 30–90 days) for reliability and abuse prevention.</li>
      </ul>

      <h2>Deletion</h2>
      <p>
        You can delete batches and their assets from the dashboard at any time.
        If you want us to remove all of your data (account, assets, logs), email{' '}
        <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a> and we’ll confirm deletion within 7 days.
      </p>

      <h2>Sharing</h2>
      <p>
        We only share data with sub-processors needed to provide the service
        (e.g., hosting, storage, analytics). We do not sell personal data.
      </p>

      <h2>Security</h2>
      <p>
        We use industry-standard security practices, role-based access, and encrypted transport.
        No method is perfect, so please contact us if you spot an issue.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Email <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a>.
      </p>

      <hr />
      <p className="text-sm opacity-70">
        This policy may change over time. We’ll update the date above when it does.
      </p>
    </main>
  );
}