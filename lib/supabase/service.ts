// Server-only Supabase client using the service_role key. This bypasses Row
// Level Security entirely, so it must only be used for operations that are
// already validated and gated by trusted server-side code (like the public
// booking API route, after validateBookingInput() has run) -- never expose
// this client, or SUPABASE_SERVICE_ROLE_KEY, to the browser.

import { createClient } from "@supabase/supabase-js";

export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
