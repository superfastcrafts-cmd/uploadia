export const dynamic = 'force-dynamic';

const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function AuthPage() {
  if (!isSupabaseConfigured) {
    return <div>Auth temporarily disabled. Configure Supabase to enable login.</div>;
  }

  // The real Auth page content goes here (when Supabase is ready)
  return (
    <div>
      <h1>Auth Page</h1>
      <p>Login functionality will be here once Supabase is connected.</p>
    </div>
  );
}