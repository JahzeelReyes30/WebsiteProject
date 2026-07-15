# WebsiteProject — MajinCleaningSolutions

A real business website, built end to end with Claude Code: **MajinCleaningSolutions**, a
healthcare-inspired home & office cleaning company. This started as a static marketing page
and has since grown into a full-stack booking app — a customer-facing booking form backed by
a real database, and a password-protected admin dashboard to manage requests. The static
version is still visible in this repo's earlier commits if you want to see how it evolved.

Every change made in this directory during a Claude Code session is automatically committed
and pushed to GitHub after each turn.

**Live site:** https://website-project-theta-eight.vercel.app (hosted on Vercel, auto-deploys
on every push to `main`) — moved off GitHub Pages because a database-backed app needs a real
server, which GitHub Pages can't run.

## What's on the site

- **Marketing pages** — hero, about us (healthcare-inspired positioning), flat $200 pricing,
  before/after gallery, sample reviews.
- **Booking form (the funnel)** — any "Free Quote" button opens a form asking for name,
  email, phone, a date, and a time slot. The time picker only shows 2-hour slots that fall
  within business hours *and* aren't already booked (`lib/availability.ts`,
  `/api/availability`) — pick a date and it fetches real availability before you can choose a
  time. Submitting writes a real row into a Postgres database via an API route — no
  third-party form relay involved.
- **Admin dashboard** (`/admin`) — password-protected (Supabase Auth). Lists every booking
  request and lets the business owner move each one through
  `pending → confirmed → completed`, or cancel it.
- **Email notification** — every new booking sends an email alert via Resend
  (`lib/email.ts`), so you don't have to keep checking the admin dashboard.

## About this project

**Why it moved off plain HTML/CSS/JS.** The static version could only ever pretend to take
bookings — it had nowhere to actually store or manage them. This rebuild adds a real backend:
**Next.js** (App Router, TypeScript) for both the public site and the admin dashboard,
**Supabase** for the Postgres database and login system, and **Vercel** for hosting with
auto-deploy on every push (the same "push to GitHub → it's live" flow GitHub Pages gave
before).

**The funnel, unchanged in spirit.** Same idea as before — a "Get Your Free Quote Today"
button is always one click away (hero, nav, pricing card, footer) and opens the same kind of
modal form. The difference is what happens after you hit submit: instead of relaying through
Formspree, the form now posts to `/api/bookings`, which validates the input
(`lib/validation.ts`) and inserts it straight into the `bookings` table.

**Why Supabase for both the database and login.** A booking system needs two things a static
site can't do at all: somewhere to persist submissions, and a way to make sure only the
business owner (not the public) can see and manage them. Supabase bundles a real Postgres
database with a built-in auth system, so both needs are covered by one free service instead
of standing up a database and an auth system separately. Row-level security policies
(`supabase/schema.sql`) enforce the split at the database level: anyone can *submit* a
booking, but only a logged-in admin can *read or update* the list.

**Why Vercel over GitHub Pages.** GitHub Pages only serves static files — it has no way to
run the `/api/bookings` route or talk to a database. Vercel runs the actual Next.js server,
and (like GitHub Pages before) redeploys automatically every time this repo gets pushed to.

**Testing.** `lib/validation.ts` — the rules for a valid booking, and which status can move
to which — is covered by a 26-case Vitest suite (`lib/validation.test.ts`), run with
`npm run test`.

**Business hours.** Mon–Fri 8am–10pm, Sat–Sun 4pm–midnight (appointments only). Every
appointment is a 2-hour slot. To change the hours, edit `WEEKLY_HOURS` at the top of
`lib/availability.ts` — no database change needed, since the schedule is the same every week.

**How double-booking is prevented without exposing customer data.** The booking form is public
and unauthenticated, but `bookings` RLS only lets anonymous visitors *insert*, not read (see
below) — so the availability check can't just query `bookings` directly from the browser. A
Postgres view, `booking_slots` (`supabase/schema.sql`), exposes only `preferred_date`,
`preferred_time`, and `status` — never name/email/phone — and `/api/availability` reads from
that view to compute open slots. The booking API route re-checks the same view right before
inserting, so two people can't win a race on the same slot.

**What's still placeholder, on purpose:**
- The before/after gallery uses hand-built SVG illustrations, not real photos.
- The reviews are sample text, not real customers.

## Setup status

Done:
- ✅ Supabase project created, `supabase/schema.sql` run, one admin user created
- ✅ Environment variables set locally (`.env.local`) and on Vercel
- ✅ Deployed on Vercel, live at the URL above, auto-deploys on every push to `main`
- ✅ GitHub Pages turned off

Still to do:

1. **Run the `booking_slots` view + grant from `supabase/schema.sql` in the Supabase SQL
   Editor** (the two statements at the bottom, added when availability checking landed) —
   without this, `/api/availability` will error and the booking form's time picker won't load
   any slots.

2. **Add `RESEND_API_KEY` locally and on Vercel** to turn on booking email alerts —
   sign up at https://resend.com, grab the API key, and set it (plus
   `BOOKING_NOTIFY_EMAIL`) in `.env.local` and the Vercel project's Settings →
   Environment Variables. Bookings save fine without it; you just won't get emailed.

3. **Point a real domain at it (later, once you own one).** Buy `majincleaningsolutions.com`
   (or similar), then add it under the Vercel project's Settings → Domains and follow the DNS
   instructions Vercel gives you.

4. **Swap in real photos and reviews** once there are real jobs and real customers —
   replace `public/images/before.svg` / `after.svg`, and edit the sample data at the top of
   `components/Reviews.tsx`.

## Future work (intentionally out of scope for v1)

- SMS notification when a new booking request comes in.
- Payments and customer accounts.

## Files

```
WebsiteProject/
├── app/
│   ├── page.tsx                 marketing home page
│   ├── api/bookings/route.ts    validates + inserts a new booking
│   └── admin/
│       ├── login/page.tsx       admin login (Supabase Auth)
│       ├── page.tsx             protected dashboard: list + update bookings
│       └── actions.ts           server actions: update status, sign out
├── components/                  Header, Hero, About, Pricing, Gallery, Reviews, Footer,
│                                 BookingModal (the funnel), admin/BookingStatusControl
├── lib/
│   ├── supabase/{client,server}.ts   Supabase client setup
│   ├── validation.ts                 booking validation + status-transition rules
│   └── validation.test.ts            Vitest suite for the above
├── supabase/schema.sql          bookings table + row-level security policies
├── proxy.ts                     protects /admin routes, refreshes the auth session
├── public/images/                before.svg / after.svg placeholder gallery images
├── lib/email.ts                  Resend booking-notification email
├── .env.local.example            documents the required + optional env vars
└── README.md                     this file
```
