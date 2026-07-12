import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { validateBookingInput, type BookingInput } from "@/lib/validation";

export async function POST(request: Request) {
  let body: Partial<BookingInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const errors = validateBookingInput(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const supabase = await createClient();
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
    return NextResponse.json(
      { error: "Could not save your booking. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
