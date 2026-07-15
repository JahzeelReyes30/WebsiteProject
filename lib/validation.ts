// Shared validation for booking submissions. Used by both the public
// booking API route and its test suite, so the rules only live in one place.

import { isWithinBusinessHours } from "./availability";

export type BookingInput = {
  name: string;
  email: string;
  phone: string;
  preferredDate: string; // "YYYY-MM-DD"
  preferredTime: string; // "HH:MM"
  note?: string;
};

export type BookingErrors = Partial<Record<keyof BookingInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-\s()]{7,20}$/;

export function isValidName(name: string): boolean {
  return name.trim().length >= 2 && name.trim().length <= 100;
}

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  return PHONE_RE.test(phone.trim());
}

export function isValidPreferredDate(dateStr: string, now: Date = new Date()): boolean {
  const date = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) return false;

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return date.getTime() >= today.getTime();
}

export function isValidPreferredTime(timeStr: string): boolean {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(timeStr);
}

export function validateBookingInput(
  input: Partial<BookingInput>,
  now: Date = new Date()
): BookingErrors {
  const errors: BookingErrors = {};

  if (!input.name || !isValidName(input.name)) {
    errors.name = "Enter a name between 2 and 100 characters.";
  }
  if (!input.email || !isValidEmail(input.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!input.phone || !isValidPhone(input.phone)) {
    errors.phone = "Enter a valid phone number.";
  }
  if (!input.preferredDate || !isValidPreferredDate(input.preferredDate, now)) {
    errors.preferredDate = "Choose today or a future date.";
  }
  if (!input.preferredTime || !isValidPreferredTime(input.preferredTime)) {
    errors.preferredTime = "Choose a valid time.";
  } else if (
    input.preferredDate &&
    isValidPreferredDate(input.preferredDate, now) &&
    !isWithinBusinessHours(input.preferredDate, input.preferredTime)
  ) {
    errors.preferredTime = "That time is outside business hours. Please pick from the available times shown.";
  }

  return errors;
}

export const BOOKING_STATUSES = ["pending", "confirmed", "completed", "cancelled"] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

// A booking moves forward through pending -> confirmed -> completed, or can
// be cancelled from either pending or confirmed. No other jump is allowed
// (e.g. you can't un-complete a booking, or cancel one that's already done).
const ALLOWED_TRANSITIONS: Record<BookingStatus, BookingStatus[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
};

export function isValidStatusTransition(from: BookingStatus, to: BookingStatus): boolean {
  return ALLOWED_TRANSITIONS[from]?.includes(to) ?? false;
}
