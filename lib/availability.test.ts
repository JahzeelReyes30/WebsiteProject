import { describe, expect, it } from "vitest";
import { formatSlotLabel, getSlotsForDate, isWithinBusinessHours } from "./availability";

describe("getSlotsForDate", () => {
  it("returns weekday slots for a Monday (8am-10pm)", () => {
    expect(getSlotsForDate("2026-07-20")).toEqual([
      "08:00",
      "10:00",
      "12:00",
      "14:00",
      "16:00",
      "18:00",
      "20:00",
    ]);
  });

  it("returns weekend slots for a Saturday (4pm-midnight)", () => {
    expect(getSlotsForDate("2026-08-01")).toEqual(["16:00", "18:00", "20:00", "22:00"]);
  });

  it("returns weekend slots for a Sunday too", () => {
    expect(getSlotsForDate("2026-08-02")).toEqual(["16:00", "18:00", "20:00", "22:00"]);
  });

  it("returns an empty list for an invalid date", () => {
    expect(getSlotsForDate("not-a-date")).toEqual([]);
  });
});

describe("isWithinBusinessHours", () => {
  it("accepts a slot that lines up with the weekday grid", () => {
    expect(isWithinBusinessHours("2026-07-20", "14:00")).toBe(true);
  });

  it("rejects a weekday time before opening", () => {
    expect(isWithinBusinessHours("2026-07-20", "06:00")).toBe(false);
  });

  it("rejects a weekday time that doesn't land on a slot boundary", () => {
    expect(isWithinBusinessHours("2026-07-20", "09:00")).toBe(false);
  });

  it("rejects a weekend time before the 4pm appointments-only window", () => {
    expect(isWithinBusinessHours("2026-08-01", "10:00")).toBe(false);
  });

  it("accepts the last weekend slot starting at 10pm", () => {
    expect(isWithinBusinessHours("2026-08-01", "22:00")).toBe(true);
  });
});

describe("formatSlotLabel", () => {
  it("formats a morning weekday slot", () => {
    expect(formatSlotLabel("08:00")).toBe("8:00 AM – 10:00 AM");
  });

  it("formats an afternoon slot crossing noon", () => {
    expect(formatSlotLabel("11:00")).toBe("11:00 AM – 1:00 PM");
  });

  it("formats the last weekend slot ending at midnight", () => {
    expect(formatSlotLabel("22:00")).toBe("10:00 PM – 12:00 AM");
  });
});
