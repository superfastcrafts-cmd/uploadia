
# Uploadia — Starter Site (Next.js + Tailwind + Supabase-Ready)

This is a deploy-ready MVP while Etsy approves your app.

## 1) Run Locally
```
npm install
npm run dev
```
Open http://localhost:3000

## 2) Deploy to Vercel
- Create a Vercel account → New Project → Import this folder
- (Optional now) Add env vars from `.env.example` for Supabase auth
- Deploy

## 3) Enable Supabase Auth (optional now)
- Create a Supabase project
- Copy the project URL + anon key into `.env.local` as:
  NEXT_PUBLIC_SUPABASE_URL=...
  NEXT_PUBLIC_SUPABASE_ANON_KEY=...
- Now /auth will send magic links to sign in/out

## 4) Replace mocks later
- Swap /app/api/mock/* with real endpoints that:
  - create batches in DB
  - queue listing jobs
  - call Etsy API when approved

