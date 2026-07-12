"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isValidStatusTransition, type BookingStatus } from "@/lib/validation";

export async function updateBookingStatus(id: string, newStatus: BookingStatus) {
  const supabase = await createClient();

  const { data: booking, error: fetchError } = await supabase
    .from("bookings")
    .select("status")
    .eq("id", id)
    .single();

  if (fetchError || !booking) {
    throw new Error("Booking not found.");
  }

  if (!isValidStatusTransition(booking.status as BookingStatus, newStatus)) {
    throw new Error(`Cannot move a booking from ${booking.status} to ${newStatus}.`);
  }

  const { error } = await supabase.from("bookings").update({ status: newStatus }).eq("id", id);
  if (error) {
    throw new Error("Could not update booking status.");
  }

  revalidatePath("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
