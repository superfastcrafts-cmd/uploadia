export const dynamic = 'force-dynamic';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  export default function AuthPlaceholder() {
    return <div>Auth temporarily disabled. Configure Supabase to enable login.</div>;
  }
}
'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function sendLink(e) {
    e.preventDefault();
    setError('');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : '' }
    });
    if (error) setError(error.message);
    else setSent(true);
  }

  async function signOut() {
    await supabase.auth.signOut();
    alert('Signed out');
  }

  return (
    <div className="max-w-md mx-auto card grid gap-4">
      <h2 className="text-xl font-bold">Sign In</h2>
      <form onSubmit={sendLink} className="grid gap-3">
        <label>Email</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@shop.com" required />
        <button className="btn w-fit" type="submit">Send magic link</button>
      </form>
      {sent && <p className="text-green-300 text-sm">Check your email for the sign-in link.</p>}
      {error && <p className="text-red-300 text-sm">{error}</p>}
      <hr className="border-white/10" />
      <button className="pill w-fit" onClick={signOut}>Sign out</button>
      <p className="text-slate-400 text-xs">Supabase auth is optional until you add keys in .env</p>
    </div>
  );
}
