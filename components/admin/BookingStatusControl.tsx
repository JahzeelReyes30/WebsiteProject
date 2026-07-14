"use client";

import { useState, useTransition } from "react";
import { updateBookingStatus } from "@/app/admin/actions";
import { isValidStatusTransition, BOOKING_STATUSES, type BookingStatus } from "@/lib/validation";

const STATUS_STYLES: Record<BookingStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-sky-100 text-sky-800",
  completed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-800",
};

export function BookingStatusControl({
  id,
  status,
}: {
  id: string;
  status: BookingStatus;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const nextOptions = BOOKING_STATUSES.filter((s) => isValidStatusTransition(status, s));

  function handleChange(newStatus: BookingStatus) {
    setError(null);
    startTransition(async () => {
      try {
        await updateBookingStatus(id, newStatus);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Update failed.");
      }
    });
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}>
        {status}
      </span>
      {nextOptions.length > 0 && (
        <select
          disabled={isPending}
          defaultValue=""
          onChange={(e) => e.target.value && handleChange(e.target.value as BookingStatus)}
          className="rounded-md border border-[#E8DFC4] px-2 py-1 text-xs"
        >
          <option value="" disabled>
            Move to...
          </option>
          {nextOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
      {error && <span className="text-xs text-[#c0392b]">{error}</span>}
    </div>
  );
}
