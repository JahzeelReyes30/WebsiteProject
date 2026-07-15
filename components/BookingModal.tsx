"use client";

import { useState } from "react";
import { useBookingModal } from "./BookingModalContext";
import { ProgressBar } from "./booking/ProgressBar";
import { DateStep } from "./booking/DateStep";
import { TimeStep } from "./booking/TimeStep";
import { ContactStep } from "./booking/ContactStep";
import { ReviewStep } from "./booking/ReviewStep";
import { isValidEmail, isValidName, isValidPhone } from "@/lib/validation";
import type { BookingErrors } from "@/lib/validation";

type Step = 1 | 2 | 3 | 4;

type FormState = {
  name: string;
  email: string;
  phone: string;
  note: string;
  company: string; // honeypot
  date: string;
  time: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  note: "",
  company: "",
  date: "",
  time: "",
};

function stepForErrors(errs: BookingErrors): Step {
  if (errs.preferredDate) return 1;
  if (errs.preferredTime) return 2;
  if (errs.name || errs.email || errs.phone) return 3;
  return 4;
}

export function BookingModal() {
  const { isOpen, close } = useBookingModal();
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  if (!isOpen) return null;

  function reset() {
    setStep(1);
    setForm(EMPTY_FORM);
    setErrors({});
    setStatus("idle");
  }

  function handleClose() {
    close();
    reset();
  }

  function updateField(field: "name" | "email" | "phone" | "note", value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function goNext() {
    if (step === 1) {
      if (!form.date) return;
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!form.time) return;
      setStep(3);
      return;
    }
    if (step === 3) {
      const stepErrors: BookingErrors = {};
      if (!isValidName(form.name)) stepErrors.name = "Enter a name between 2 and 100 characters.";
      if (!isValidEmail(form.email)) stepErrors.email = "Enter a valid email address.";
      if (!isValidPhone(form.phone)) stepErrors.phone = "Enter a valid phone number.";
      setErrors(stepErrors);
      if (Object.keys(stepErrors).length > 0) return;
      setStep(4);
    }
  }

  function goBack() {
    if (step === 1) {
      handleClose();
      return;
    }
    setErrors({});
    setStep((s) => (s - 1) as Step);
  }

  async function handleConfirm() {
    setStatus("sending");
    setErrors({});

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        preferredDate: form.date,
        preferredTime: form.time,
        note: form.note,
        company: form.company,
      }),
    });

    if (res.status === 201) {
      setStatus("success");
      return;
    }

    setStatus("error");

    if (res.status === 409) {
      // Someone else grabbed that slot in the meantime -- send them back to
      // Time so they can pick a still-open one instead of hitting a dead end.
      setStep(2);
      setForm((f) => ({ ...f, time: "" }));
      return;
    }

    const body = await res.json().catch(() => ({}));
    const bodyErrors: BookingErrors = body.errors ?? {};
    setErrors(bodyErrors);
    if (Object.keys(bodyErrors).length > 0) {
      setStep(stepForErrors(bodyErrors));
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]/55 p-5"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-md rounded-xl bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-4 top-3 text-2xl leading-none text-[#55504A] hover:text-[#0A0A0A]"
        >
          &times;
        </button>

        {/* Honeypot: invisible to real visitors, but bots that auto-fill
            every field tend to fill this one in too. */}
        <input
          type="text"
          value={form.company}
          onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] top-auto"
        />

        {status === "success" ? (
          <div className="text-center py-6">
            <h2 className="text-xl font-bold text-[#0A0A0A] mb-2">Request received!</h2>
            <p className="text-[#55504A]">
              Thanks — we&apos;ll follow up shortly to confirm your booking.
            </p>
            <button
              type="button"
              onClick={handleClose}
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
            <p className="text-[#55504A] text-sm mb-4">
              Tell us a bit about you and pick a time that works.
            </p>

            <ProgressBar currentStep={step} />

            <div key={step} className="[animation:fadeIn_0.25s_ease-out]">
              {step === 1 && (
                <DateStep
                  value={form.date}
                  onChange={(date) => setForm((f) => ({ ...f, date, time: "" }))}
                />
              )}
              {step === 2 && (
                <TimeStep
                  date={form.date}
                  value={form.time}
                  onChange={(time) => setForm((f) => ({ ...f, time }))}
                />
              )}
              {step === 3 && (
                <ContactStep
                  name={form.name}
                  email={form.email}
                  phone={form.phone}
                  note={form.note}
                  errors={errors}
                  onChange={updateField}
                />
              )}
              {step === 4 && (
                <ReviewStep
                  name={form.name}
                  email={form.email}
                  phone={form.phone}
                  note={form.note}
                  date={form.date}
                  time={form.time}
                />
              )}

              {step === 1 && errors.preferredDate && (
                <p className="text-xs text-[#c0392b] mt-2">{errors.preferredDate}</p>
              )}
              {step === 2 && errors.preferredTime && (
                <p className="text-xs text-[#c0392b] mt-2">{errors.preferredTime}</p>
              )}
            </div>

            {status === "error" && Object.keys(errors).length === 0 && (
              <p className="text-sm text-[#c0392b] text-center mt-3">
                Something went wrong. Please try again.
              </p>
            )}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={goBack}
                className="flex-1 rounded-full border border-[#E8DFC4] px-6 py-3 font-semibold text-[#55504A] hover:border-[#8A6914]"
              >
                Back
              </button>
              {step < 4 ? (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={(step === 1 && !form.date) || (step === 2 && !form.time)}
                  className="flex-1 rounded-full bg-[#C9A227] px-6 py-3 font-semibold text-[#0A0A0A] hover:bg-[#A6821F] disabled:opacity-60"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={status === "sending"}
                  className="flex-1 rounded-full bg-[#C9A227] px-6 py-3 font-semibold text-[#0A0A0A] hover:bg-[#A6821F] disabled:opacity-60"
                >
                  {status === "sending" ? "Sending..." : "Confirm Booking"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
