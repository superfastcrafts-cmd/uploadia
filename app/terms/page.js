export const metadata = {
  title: 'Terms of Service – Uploadia',
  description: 'Terms that govern your use of Uploadia.',
};

const SUPPORT = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@getuploadia.com';

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 prose prose-invert">
      <h1>Terms of Service</h1>
      <p><em>Last updated: {new Date().toISOString().slice(0,10)}</em></p>

      <h2>Summary</h2>
      <ul>
        <li>Uploadia helps you create <strong>draft</strong> Etsy listings in bulk.</li>
        <li>You retain ownership of your content and are responsible for its legality and accuracy.</li>
        <li>The service is provided “as is”; we aim for reliability but don’t guarantee uninterrupted uptime.</li>
      </ul>

      <h2>Your content</h2>
      <p>
        You own the rights to the designs, images, and files you upload. You grant Uploadia a
        limited license to process those files for the purpose of generating draft listings and
        providing the service. You confirm your content does not infringe others’ rights and
        complies with Etsy’s policies and applicable laws.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>No unlawful, infringing, or harmful content.</li>
        <li>No abuse, reverse engineering, or attempts to disrupt the service.</li>
        <li>Respect Etsy’s API terms and rate limits.</li>
      </ul>

      <h2>Plans &amp; billing</h2>
      <p>
        If paid features are offered, fees are charged in advance and are non-refundable
        unless required by law. We may change pricing with notice.
      </p>

      <h2>Disclaimers</h2>
      <p>
        Uploadia is provided “as is” without warranties. To the fullest extent permitted by law,
        Uploadia and its owners are not liable for indirect or consequential damages,
        including lost profits or data.
      </p>

      <h2>Termination</h2>
      <p>
        You may stop using the service at any time. We may suspend or terminate accounts that
        violate these terms. Upon termination, we will delete your stored data per our Privacy Policy.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. Continued use after changes means you accept the new terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email <a href={`mailto:${SUPPORT}`}>{SUPPORT}</a>.
      </p>

      <hr />
      <p className="text-sm opacity-70">These Terms are a simple template and not legal advice.</p>
    </main>
  );
}