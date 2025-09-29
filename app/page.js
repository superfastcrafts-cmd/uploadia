export default function Page() {
  return (
    <div className="grid gap-8">
      {/* Hero Section */}
      <section className="text-center pt-10">
        <h1 className="text-4xl font-extrabold leading-tight">
          From design to <span className="text-indigo-400">Etsy draft listings</span> — fully automated
        </h1>
        <p className="mt-3 text-slate-300 max-w-xl mx-auto">
          Uploadia gives you the <strong>method and the tool</strong> to turn your raw designs into 
          finished Etsy draft listings — complete with mockups, digital files, titles, descriptions, and tags.  
          Drag. Drop. Done.
        </p>
        <div className="mt-6 flex gap-3 justify-center">
          <a href="/upload" className="btn">Try the uploader</a>
          <a href="/dashboard" className="pill">View dashboard</a>
        </div>
      </section>

      {/* Quick Feature Grid */}
      <section className="grid md:grid-cols-3 gap-4">
        {[
          ["Automated Mockups", "Use our Photoshop script to bulk-generate perfectly ordered mockups for every design."],
          ["Bulk Upload", "Drop 50+ folders and Uploadia queues them into Etsy draft listings."],
          ["Draft Only", "Nothing goes live until you review and publish manually in Etsy."]
        ].map(([title, desc]) => (
          <div key={title} className="card">
            <h3 className="font-bold">{title}</h3>
            <p className="text-slate-300">{desc}</p>
          </div>
        ))}
      </section>

      {/* What Uploadia Is & Does */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">What is Uploadia?</h2>
        <p className="text-slate-300 mb-6 text-center">
          Uploadia is the ultimate automation tool for Etsy sellers. It handles <strong>everything</strong> —
          from turning your base designs into professional mockups, to creating bulk Etsy draft listings 
          with titles, descriptions, and digital files ready to go.
        </p>
        <p className="text-slate-300 mb-6 text-center">
          Think of it as a conveyor belt:  
          <em>Design → Mockups → Digital File → Etsy Draft Listing</em> — all done automatically,
          while keeping your exact image order and file structure intact.
        </p>

        <ul className="space-y-3 list-disc pl-6 text-slate-300">
          <li>Use our Photoshop automation to bulk-generate 10 perfect mockups per design.</li>
          <li>Preserve exact mockup order (01..10) for a consistent Etsy gallery layout.</li>
          <li>Automatically attach the original digital file (≤ 20MB) to each Etsy listing.</li>
          <li>Import titles, descriptions, and tags via CSV — or let our AI generate them.</li>
          <li>Upload 50+ listings at once, created as drafts for you to review and publish.</li>
          <li>Full control: you approve everything before it goes live.</li>
          <li>We never share or sell your files. Request full data deletion anytime.</li>
        </ul>

        <div className="mt-8 flex justify-center gap-3">
          <a href="/upload" className="btn">Start a Batch</a>
          <a href="/privacy" className="pill">Privacy & Terms</a>
        </div>
      </section>
    </div>
  )
}