import './globals.css';
import Link from 'next/link';

export const metadata = { 
  title: "Uploadia", 
  description: "Bulk-upload Etsy draft listings" 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {/* HEADER */}
        <header className="sticky top-0 z-10 backdrop-blur bg-black/40 border-b border-white/10">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-extrabold tracking-tight text-xl">
              Uploadia
            </Link>
            <nav className="flex gap-4 text-sm text-slate-300">
              <Link href="/upload" className="pill">Upload</Link>
              <Link href="/dashboard" className="pill">Dashboard</Link>
              <Link href="/auth" className="pill">Sign In</Link>
            </nav>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="max-w-5xl mx-auto px-4 py-10 text-center text-sm text-slate-400 space-y-2">
          <div>
            © {new Date().getFullYear()} Uploadia
          </div>
          <div className="flex justify-center gap-4">
            <Link href="/privacy" className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-200 transition-colors">
              Terms of Service
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}