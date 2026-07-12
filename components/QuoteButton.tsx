"use client";

import { useBookingModal } from "./BookingModalContext";

export function QuoteButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open } = useBookingModal();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
