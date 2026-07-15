import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSlotsForDate } from "@/lib/availability";
import { isValidPreferredDate } from "@/lib/validation";

export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get("date");

  if (!date || !isValidPreferredDate(date)) {
    return NextResponse.json({ error: "Choose today or a future date." }, { status: 400 });
  }

  const allSlots = getSlotsForDate(date);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("booking_slots")
    .select("preferred_time")
    .eq("preferred_date", date);

  if (error) {
    return NextResponse.json({ error: "Could not load availability." }, { status: 500 });
  }

  // Postgres returns `time` columns as "HH:MM:SS"; slots are tracked as "HH:MM".
  const bookedTimes = new Set((data ?? []).map((row) => row.preferred_time.slice(0, 5)));
  const slots = allSlots.filter((slot) => !bookedTimes.has(slot));

  return NextResponse.json({ slots });
}
