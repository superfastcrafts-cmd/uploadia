
export default function Page() {
  return (
    <div className="grid gap-8">
      <section className="text-center pt-10">
        <h1 className="text-4xl font-extrabold leading-tight">Bulk-upload Etsy <span className="text-indigo-400">draft listings</span></h1>
        <p className="mt-3 text-slate-300 max-w-xl mx-auto">Drag-and-drop folders of images and digital files. Uploadia turns them into Etsy <b>draft</b> listings for you to review and publish.</p>
        <div className="mt-6 flex gap-3 justify-center">
          <a href="/upload" className="btn">Try the uploader</a>
          <a href="/dashboard" className="pill">View dashboard</a>
        </div>
      </section>
      <section className="grid md:grid-cols-3 gap-4">
        {[
          ["Templates", "Save your default price, tags, and category."],
          ["Bulk Upload", "Drop 50+ listings at once; Uploadia queues them."],
          ["Draft Only", "Nothing goes live until you click publish in Etsy."]
        ].map(([title,desc])=> (
          <div key={title} className="card">
            <h3 className="font-bold">{title}</h3>
            <p className="text-slate-300">{desc}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
