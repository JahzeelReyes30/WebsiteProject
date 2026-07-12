import { describe, expect, it } from "vitest";
import {
  isValidEmail,
  isValidName,
  isValidPhone,
  isValidPreferredDate,
  isValidPreferredTime,
  isValidStatusTransition,
  validateBookingInput,
} from "./validation";

describe("isValidName", () => {
  it("accepts a normal name", () => {
    expect(isValidName("Jahzeel Reyes")).toBe(true);
  });
  it("rejects a single character", () => {
    expect(isValidName("J")).toBe(false);
  });
  it("rejects an empty/whitespace name", () => {
    expect(isValidName("   ")).toBe(false);
  });
});

describe("isValidEmail", () => {
  it("accepts a normal email", () => {
    expect(isValidEmail("customer@example.com")).toBe(true);
  });
  it("rejects a missing @", () => {
    expect(isValidEmail("customer.example.com")).toBe(false);
  });
  it("rejects a missing domain", () => {
    expect(isValidEmail("customer@")).toBe(false);
  });
});

describe("isValidPhone", () => {
  it("accepts a formatted US number", () => {
    expect(isValidPhone("(555) 123-4567")).toBe(true);
  });
  it("accepts a plain digit string", () => {
    expect(isValidPhone("5551234567")).toBe(true);
  });
  it("rejects letters", () => {
    expect(isValidPhone("call-me-maybe")).toBe(false);
  });
  it("rejects a too-short number", () => {
    expect(isValidPhone("123")).toBe(false);
  });
});

describe("isValidPreferredDate", () => {
  const referenceNow = new Date("2026-07-15T12:00:00");

  it("accepts today", () => {
    expect(isValidPreferredDate("2026-07-15", referenceNow)).toBe(true);
  });
  it("accepts a future date", () => {
    expect(isValidPreferredDate("2026-08-01", referenceNow)).toBe(true);
  });
  it("rejects a past date", () => {
    expect(isValidPreferredDate("2026-07-01", referenceNow)).toBe(false);
  });
  it("rejects garbage input", () => {
    expect(isValidPreferredDate("not-a-date", referenceNow)).toBe(false);
  });
});

describe("isValidPreferredTime", () => {
  it("accepts a valid 24h time", () => {
    expect(isValidPreferredTime("09:30")).toBe(true);
  });
  it("rejects an out-of-range hour", () => {
    expect(isValidPreferredTime("25:00")).toBe(false);
  });
  it("rejects a malformed string", () => {
    expect(isValidPreferredTime("9:30am")).toBe(false);
  });
});

describe("validateBookingInput", () => {
  const referenceNow = new Date("2026-07-15T12:00:00");

  it("returns no errors for a fully valid booking", () => {
    const errors = validateBookingInput(
      {
        name: "Priya M.",
        email: "priya@example.com",
        phone: "555-123-4567",
        preferredDate: "2026-07-20",
        preferredTime: "10:00",
      },
      referenceNow
    );
    expect(errors).toEqual({});
  });

  it("collects an error per invalid field", () => {
    const errors = validateBookingInput(
      {
        name: "",
        email: "not-an-email",
        phone: "abc",
        preferredDate: "2020-01-01",
        preferredTime: "99:99",
      },
      referenceNow
    );
    expect(Object.keys(errors).sort()).toEqual(
      ["email", "name", "phone", "preferredDate", "preferredTime"].sort()
    );
  });

  it("treats note as optional", () => {
    const errors = validateBookingInput(
      {
        name: "Daniel R.",
        email: "daniel@example.com",
        phone: "555-000-1111",
        preferredDate: "2026-07-20",
        preferredTime: "14:00",
      },
      referenceNow
    );
    expect(errors).toEqual({});
  });
});

describe("isValidStatusTransition", () => {
  it("allows pending -> confirmed", () => {
    expect(isValidStatusTransition("pending", "confirmed")).toBe(true);
  });
  it("allows pending -> cancelled", () => {
    expect(isValidStatusTransition("pending", "cancelled")).toBe(true);
  });
  it("allows confirmed -> completed", () => {
    expect(isValidStatusTransition("confirmed", "completed")).toBe(true);
  });
  it("rejects completed -> anything", () => {
    expect(isValidStatusTransition("completed", "pending")).toBe(false);
    expect(isValidStatusTransition("completed", "cancelled")).toBe(false);
  });
  it("rejects skipping straight from pending to completed", () => {
    expect(isValidStatusTransition("pending", "completed")).toBe(false);
  });
  it("rejects re-cancelling an already cancelled booking", () => {
    expect(isValidStatusTransition("cancelled", "cancelled")).toBe(false);
  });
});
