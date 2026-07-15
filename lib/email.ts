import { Resend } from "resend";
import type { BookingInput } from "./validation";

export async function sendBookingNotification(booking: BookingInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_NOTIFY_EMAIL;
  if (!apiKey || !to) return;

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL || "MajinCleaningSolutions <onboarding@resend.dev>";

  // The Resend SDK returns { data, error } instead of throwing for
  // API-level failures (e.g. sandbox sender restrictions) -- only network
  // failures throw. Without checking `error` explicitly, a failed send
  // looks identical to a successful one to the caller.
  const { error } = await resend.emails.send({
    from,
    to,
    subject: `New booking request from ${booking.name}`,
    text: [
      `Name: ${booking.name}`,
      `Email: ${booking.email}`,
      `Phone: ${booking.phone}`,
      `Preferred date: ${booking.preferredDate}`,
      `Preferred time: ${booking.preferredTime}`,
      `Note: ${booking.note?.trim() || "(none)"}`,
      "",
      "View and manage this request in the admin dashboard.",
    ].join("\n"),
  });

  if (error) {
    throw new Error(`Resend rejected the notification: ${error.message}`);
  }
}
