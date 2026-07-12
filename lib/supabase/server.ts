// Supabase client for use in server components, route handlers, and server
// actions. Reads/writes auth cookies so the admin's login session carries
// through requests, and lets Supabase's row-level security tell logged-in
// admin requests apart from anonymous public ones.

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll is called from a Server Component sometimes, where
            // cookies can't be written directly. Safe to ignore as long as
            // middleware.ts is also refreshing the session (it is).
          }
        },
      },
    }
  );
}
