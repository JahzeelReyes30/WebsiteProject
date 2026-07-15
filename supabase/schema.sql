-- MajinCleaningSolutions booking system schema.
-- Run this once in the Supabase project's SQL Editor (Dashboard -> SQL Editor -> New query)
-- after creating the project. See README.md for the full setup walkthrough.

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  preferred_date date not null,
  preferred_time time not null,
  note text,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

alter table bookings enable row level security;

-- Anyone (including an anonymous site visitor) can submit a booking request,
-- but that's a write-only permission -- they can't read back the list of
-- everyone else's bookings.
create policy "Anyone can submit a booking"
  on bookings for insert
  to anon
  with check (true);

-- Only a logged-in admin (the business owner, via Supabase Auth) can view or
-- update bookings. This app only ever has one admin account.
create policy "Authenticated admin can view bookings"
  on bookings for select
  to authenticated
  using (true);

create policy "Authenticated admin can update bookings"
  on bookings for update
  to authenticated
  using (true)
  with check (true);

-- Lets the public booking form check which slots are already taken without
-- ever exposing customer names/emails/phones to anonymous visitors. Views
-- run with their owner's privileges by default (not the querying role's),
-- so this bypasses the anon SELECT restriction on `bookings` above while
-- only ever surfacing date/time/status.
create view booking_slots as
  select preferred_date, preferred_time, status
  from bookings
  where status <> 'cancelled';

grant select on booking_slots to anon;
