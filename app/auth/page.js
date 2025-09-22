export const dynamic = 'force-dynamic';

const isSupabaseConfigured =
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function AuthPage() {
  if (!isSupabaseConfigured) {
    return (
      <div className="card max-w-md mx-auto">
        Auth temporarily disabled. Configure Supabase to enable login.
      </div>
    );
  }

  // Placeholder for actual Supabase login
  return (
    <div className="card max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-2">Sign in</h1>
      <p>Login functionality will appear here after Supabase setup.</p>
    </div>
  );
}