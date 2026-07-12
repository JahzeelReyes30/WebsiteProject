"use client";

import { useState, type FormEvent } from "react";
import { useBookingModal } from "./BookingModalContext";
import type { BookingErrors } from "@/lib/validation";

const inputClasses =
  "w-full rounded-md border border-[#d8e8e6] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#14a89a]/30 focus:border-[#14a89a]";

export function BookingModal() {
  const { isOpen, close } = useBookingModal();
  const [errors, setErrors] = useState<BookingErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  if (!isOpen) return null;

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
      return;
    }

    const body = await res.json().catch(() => ({}));
    setErrors(body.errors ?? {});
    setStatus("error");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b3d3a]/55 p-5"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="relative w-full max-w-md rounded-xl bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-3 text-2xl leading-none text-[#4a5a58] hover:text-[#0b3d3a]"
        >
          &times;
        </button>

        {status === "success" ? (
          <div className="text-center py-6">
            <h2 className="text-xl font-bold text-[#0b3d3a] mb-2">Request received!</h2>
            <p className="text-[#4a5a58]">
              Thanks — we&apos;ll follow up shortly to confirm your booking.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-6 rounded-full bg-[#14a89a] px-6 py-2 font-semibold text-white hover:bg-[#0f6b63]"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-[#0b3d3a] mb-1">
              Contact Us for a Free Quote Today
            </h2>
            <p className="text-[#4a5a58] text-sm mb-5">
              Tell us a bit about you and pick a time that works.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-1">
                  Full Name
                </label>
                <input id="name" name="name" type="text" className={inputClasses} required />
                {errors.name && <p className="text-xs text-[#c0392b] mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-1">
                  Email
                </label>
                <input id="email" name="email" type="email" className={inputClasses} required />
                {errors.email && <p className="text-xs text-[#c0392b] mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold mb-1">
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="preferredDate" className="block text-sm font-semibold mb-1">
                    Preferred Date
                  </label>
                  <input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    className={inputClasses}
                    required
                  />
                  {errors.preferredDate && (
                    <p className="text-xs text-[#c0392b] mt-1">{errors.preferredDate}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-semibold mb-1">
                    Preferred Time
                  </label>
                  <input
                    id="preferredTime"
                    name="preferredTime"
                    type="time"
                    className={inputClasses}
                    required
                  />
                  {errors.preferredTime && (
                    <p className="text-xs text-[#c0392b] mt-1">{errors.preferredTime}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="note" className="block text-sm font-semibold mb-1">
                  Anything we should know? (optional)
                </label>
                <textarea id="note" name="note" rows={2} className={inputClasses} />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-[#14a89a] px-6 py-3 font-semibold text-white hover:bg-[#0f6b63] disabled:opacity-60"
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
