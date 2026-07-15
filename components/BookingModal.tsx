"use client";

import { useState, type FormEvent } from "react";
import { useBookingModal } from "./BookingModalContext";
import { formatSlotLabel } from "@/lib/availability";
import type { BookingErrors } from "@/lib/validation";

const inputClasses =
  "w-full rounded-md border border-[#E8DFC4] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8A6914]/30 focus:border-[#8A6914]";

function todayStr(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate()
  ).padStart(2, "0")}`;
}

export function BookingModal() {
  const { isOpen, close } = useBookingModal();
  const [errors, setErrors] = useState<BookingErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [slotsStatus, setSlotsStatus] = useState<"idle" | "loading" | "loaded" | "error">("idle");

  if (!isOpen) return null;

  async function handleDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    const date = event.target.value;
    setSelectedDate(date);
    setSelectedTime("");
    setSlots([]);

    if (!date) {
      setSlotsStatus("idle");
      return;
    }

    setSlotsStatus("loading");
    try {
      const res = await fetch(`/api/availability?date=${date}`);
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Failed to load availability.");
      setSlots(body.slots ?? []);
      setSlotsStatus("loaded");
    } catch {
      setSlotsStatus("error");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrors({});

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.status === 201) {
      setStatus("success");
      form.reset();
      setSelectedDate("");
      setSelectedTime("");
      setSlots([]);
      setSlotsStatus("idle");
      return;
    }

    const body = await res.json().catch(() => ({}));
    setErrors(body.errors ?? {});
    setStatus("error");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]/55 p-5"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="relative w-full max-w-md rounded-xl bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-3 text-2xl leading-none text-[#55504A] hover:text-[#0A0A0A]"
        >
          &times;
        </button>

        {status === "success" ? (
          <div className="text-center py-6">
            <h2 className="text-xl font-bold text-[#0A0A0A] mb-2">Request received!</h2>
            <p className="text-[#55504A]">
              Thanks — we&apos;ll follow up shortly to confirm your booking.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-6 rounded-full bg-[#C9A227] px-6 py-2 font-semibold text-[#0A0A0A] hover:bg-[#A6821F]"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-[#0A0A0A] mb-1">
              Contact Us for a Free Quote Today
            </h2>
            <p className="text-[#55504A] text-sm mb-5">
              Tell us a bit about you and pick a time that works.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot: invisible to real visitors, but bots that
                  auto-fill every field tend to fill this one in too. */}
              <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-bold text-[#0A0A0A] mb-1">
                  Full Name
                </label>
                <input id="name" name="name" type="text" className={inputClasses} required />
                {errors.name && <p className="text-xs text-[#c0392b] mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-[#0A0A0A] mb-1">
                  Email
                </label>
                <input id="email" name="email" type="email" className={inputClasses} required />
                {errors.email && <p className="text-xs text-[#c0392b] mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-[#0A0A0A] mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="e.g. (555) 123-4567"
                  className={inputClasses}
                  required
                />
                {errors.phone && <p className="text-xs text-[#c0392b] mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="preferredDate" className="block text-sm font-bold text-[#0A0A0A] mb-1">
                  Preferred Date
                </label>
                <input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  min={todayStr()}
                  value={selectedDate}
                  onChange={handleDateChange}
                  className={inputClasses}
                  required
                />
                {errors.preferredDate && (
                  <p className="text-xs text-[#c0392b] mt-1">{errors.preferredDate}</p>
                )}
              </div>

              <input type="hidden" name="preferredTime" value={selectedTime} />

              {selectedDate && (
                <div>
                  <span className="block text-sm font-bold text-[#0A0A0A] mb-1">
                    Preferred Time
                  </span>

                  {slotsStatus === "loading" && (
                    <p className="text-sm text-[#55504A]">Checking availability...</p>
                  )}
                  {slotsStatus === "error" && (
                    <p className="text-sm text-[#c0392b]">
                      Couldn&apos;t load availability. Please try another date.
                    </p>
                  )}
                  {slotsStatus === "loaded" && slots.length === 0 && (
                    <p className="text-sm text-[#55504A]">
                      No openings that day — please try another date.
                    </p>
                  )}
                  {slotsStatus === "loaded" && slots.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {slots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`rounded-md border px-3 py-2 text-xs font-semibold ${
                            selectedTime === slot
                              ? "border-[#8A6914] bg-[#C9A227]/20 text-[#0A0A0A]"
                              : "border-[#E8DFC4] text-[#55504A] hover:border-[#8A6914]"
                          }`}
                        >
                          {formatSlotLabel(slot)}
                        </button>
                      ))}
                    </div>
                  )}
                  {errors.preferredTime && (
                    <p className="text-xs text-[#c0392b] mt-1">{errors.preferredTime}</p>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="note" className="block text-sm font-bold text-[#0A0A0A] mb-1">
                  Anything we should know? (optional)
                </label>
                <textarea id="note" name="note" rows={2} className={inputClasses} />
              </div>

              <button
                type="submit"
                disabled={status === "sending" || !selectedTime}
                className="w-full rounded-full bg-[#C9A227] px-6 py-3 font-semibold text-[#0A0A0A] hover:bg-[#A6821F] disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Request My Free Quote"}
              </button>

              {status === "error" && Object.keys(errors).length === 0 && (
                <p className="text-sm text-[#c0392b] text-center">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
