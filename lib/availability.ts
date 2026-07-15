// Defines when MajinCleaningSolutions is open for appointments, and turns
// that weekly schedule into bookable 2-hour slots for a given date. Kept as
// a plain constant (not a database table) since business hours change
// rarely -- edit WEEKLY_HOURS below and redeploy if they ever do.

export const SLOT_DURATION_HOURS = 2;

type DayHours = { open: string; close: string }; // "HH:MM", 24h; close may be "24:00" for midnight

// 0 = Sunday ... 6 = Saturday, matching Date.prototype.getDay().
const WEEKLY_HOURS: Record<number, DayHours> = {
  0: { open: "16:00", close: "24:00" }, // Sunday -- appointments only
  1: { open: "08:00", close: "22:00" }, // Monday
  2: { open: "08:00", close: "22:00" }, // Tuesday
  3: { open: "08:00", close: "22:00" }, // Wednesday
  4: { open: "08:00", close: "22:00" }, // Thursday
  5: { open: "08:00", close: "22:00" }, // Friday
  6: { open: "16:00", close: "24:00" }, // Saturday -- appointments only
};

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function fromMinutes(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60) % 24;
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function getDayOfWeek(dateStr: string): number | null {
  const date = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return date.getDay();
}

/** All bookable 2-hour slot start times ("HH:MM", 24h) for the given date. */
export function getSlotsForDate(dateStr: string): string[] {
  const day = getDayOfWeek(dateStr);
  if (day === null) return [];

  const hours = WEEKLY_HOURS[day];
  const openMin = toMinutes(hours.open);
  const closeMin = toMinutes(hours.close);
  const slotMin = SLOT_DURATION_HOURS * 60;

  const slots: string[] = [];
  for (let start = openMin; start + slotMin <= closeMin; start += slotMin) {
    slots.push(fromMinutes(start));
  }
  return slots;
}

/** Whether "HH:MM" lines up with one of the date's bookable slot start times. */
export function isWithinBusinessHours(dateStr: string, timeStr: string): boolean {
  return getSlotsForDate(dateStr).includes(timeStr);
}

function to12Hour(hhmm: string): string {
  const [hStr, mStr] = hhmm.split(":");
  const hour24 = Number(hStr) % 24;
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;
  return `${hour12}:${mStr} ${period}`;
}

/** Human-readable label for a slot, e.g. "8:00 AM – 10:00 AM". */
export function formatSlotLabel(startTime: string): string {
  const endTime = fromMinutes(toMinutes(startTime) + SLOT_DURATION_HOURS * 60);
  return `${to12Hour(startTime)} – ${to12Hour(endTime)}`;
}

function toShortHour(hhmm: string): string {
  const [hStr] = hhmm.split(":");
  const hour24 = Number(hStr) % 24;
  const period = hour24 >= 12 ? "pm" : "am";
  const hour12 = hour24 % 12 || 12;
  return `${hour12}${period}`;
}

/** Short open/close label for a date, e.g. "8am–10pm" or "4pm–12am". */
export function getHoursLabelForDate(dateStr: string): string {
  const day = getDayOfWeek(dateStr);
  if (day === null) return "";

  const hours = WEEKLY_HOURS[day];
  return `${toShortHour(hours.open)}–${toShortHour(hours.close)}`;
}
