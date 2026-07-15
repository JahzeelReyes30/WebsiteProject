import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";
import { sendBookingNotification } from "@/lib/email";
import { validateBookingInput, type BookingInput } from "@/lib/validation";

export async function POST(request: Request) {
  let body: Partial<BookingInput> & { company?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field in, so anything
  // that does is a bot. Pretend success without saving anything, so bots
  // don't learn to adapt.
  if (body.company) {
    return NextResponse.json({ success: true }, { status: 201 });
  }

  const errors = validateBookingInput(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  // Uses the service_role key (bypasses RLS) since this insert is already
  // fully validated and gated by this trusted server-side route -- the
  // public-facing anon key's RLS evaluation was proving unreliable for
  // writes here, so writes go through a trusted server-only credential
  // instead. Never expose this client to the browser.
  const supabase = createServiceClient();

  // Re-check for a conflict at submit time, since the slot picker's list
  // could be stale if someone else booked the same slot moments ago.
  const { data: conflicts, error: conflictError } = await supabase
    .from("bookings")
    .select("id")
    .eq("preferred_date", body.preferredDate!)
    .eq("preferred_time", body.preferredTime!)
    .neq("status", "cancelled");

  if (conflictError) {
    console.error("Booking conflict check failed:", conflictError);
    return NextResponse.json(
      { error: "Could not save your booking. Please try again." },
      { status: 500 }
    );
  }
  if (conflicts && conflicts.length > 0) {
    return NextResponse.json(
      { errors: { preferredTime: "That time was just booked. Please pick another." } },
      { status: 409 }
    );
  }

  const { error } = await supabase.from("bookings").insert({
    name: body.name!.trim(),
    email: body.email!.trim(),
    phone: body.phone!.trim(),
    preferred_date: body.preferredDate,
    preferred_time: body.preferredTime,
    note: body.note?.trim() || null,
    status: "pending",
  });

  if (error) {
    console.error("Booking insert failed:", error);
    return NextResponse.json(
      { error: "Could not save your booking. Please try again." },
      { status: 500 }
    );
  }

  // Best-effort: the booking is already saved, so a notification failure
  // shouldn't turn into an error response for the customer.
  try {
    await sendBookingNotification(body as BookingInput);
  } catch (err) {
    console.error("Booking notification email failed:", err);
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
