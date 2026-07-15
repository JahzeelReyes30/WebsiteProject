"use client";

import type { BookingErrors } from "@/lib/validation";

const inputClasses =
  "w-full rounded-md border border-[#E8DFC4] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8A6914]/30 focus:border-[#8A6914]";

type Field = "name" | "email" | "phone" | "note";

type ContactStepProps = {
  name: string;
  email: string;
  phone: string;
  note: string;
  errors: BookingErrors;
  onChange: (field: Field, value: string) => void;
};

export function ContactStep({ name, email, phone, note, errors, onChange }: ContactStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-bold text-[#0A0A0A] mb-1">
          Full Name
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => onChange("name", e.target.value)}
          className={inputClasses}
        />
        {errors.name && <p className="text-xs text-[#c0392b] mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-bold text-[#0A0A0A] mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => onChange("email", e.target.value)}
          className={inputClasses}
        />
        {errors.email && <p className="text-xs text-[#c0392b] mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-bold text-[#0A0A0A] mb-1">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="e.g. (555) 123-4567"
          value={phone}
          onChange={(e) => onChange("phone", e.target.value)}
          className={inputClasses}
        />
        {errors.phone && <p className="text-xs text-[#c0392b] mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="note" className="block text-sm font-bold text-[#0A0A0A] mb-1">
          Anything we should know? (optional)
        </label>
        <textarea
          id="note"
          rows={2}
          value={note}
          onChange={(e) => onChange("note", e.target.value)}
          className={inputClasses}
        />
      </div>
    </div>
  );
}
