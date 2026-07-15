"use client";

import { useEffect, useRef, useState } from "react";
import { formatSlotLabel } from "@/lib/availability";

const ITEM_HEIGHT = 48;
const PADDING_ITEMS = 2;

type TimeStepProps = {
  date: string;
  value: string;
  onChange: (time: string) => void;
};

export function TimeStep({ date, value, onChange }: TimeStepProps) {
  const [slots, setSlots] = useState<string[]>([]);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // TimeStep only mounts once a date has been chosen (`date` is set on entry
  // to Step 2 and doesn't change while this instance is alive -- going back
  // and forward remounts a fresh TimeStep), so the "loading" initial state
  // above is already correct for every render of this effect.
  useEffect(() => {
    let cancelled = false;

    fetch(`/api/availability?date=${date}`)
      .then((res) => {
        if (!res.ok) throw new Error("failed to load availability");
        return res.json();
      })
      .then((body) => {
        if (cancelled) return;
        setSlots(body.slots ?? []);
        setStatus("loaded");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [date]);

  useEffect(() => {
    if (status !== "loaded" || slots.length === 0) return;
    const index = value ? slots.indexOf(value) : -1;
    const targetIndex = index === -1 ? 0 : index;
    if (index === -1) onChange(slots[0]);
    containerRef.current?.scrollTo({ top: targetIndex * ITEM_HEIGHT, behavior: "auto" });
    // Only re-run when the slot list itself changes -- not on every value/onChange
    // identity change, or this would fight the user's own scrolling.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, slots]);

  function handleScroll() {
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      const el = containerRef.current;
      if (!el || slots.length === 0) return;
      const index = Math.min(
        slots.length - 1,
        Math.max(0, Math.round(el.scrollTop / ITEM_HEIGHT))
      );
      if (slots[index] !== value) onChange(slots[index]);
    }, 120);
  }

  function selectIndex(index: number) {
    containerRef.current?.scrollTo({ top: index * ITEM_HEIGHT, behavior: "smooth" });
    onChange(slots[index]);
  }

  if (status === "loading") {
    return <p className="text-sm text-[#55504A]">Checking availability...</p>;
  }
  if (status === "error") {
    return (
      <p className="text-sm text-[#c0392b]">
        Couldn&apos;t load availability. Please go back and try another date.
      </p>
    );
  }
  if (slots.length === 0) {
    return (
      <p className="text-sm text-[#55504A]">
        No openings that day — please go back and try another date.
      </p>
    );
  }

  return (
    <div>
      <p className="mb-2 text-sm font-bold text-[#0A0A0A]">Pick a time — scroll to select</p>
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 h-12 -translate-y-1/2 rounded-md border border-[#8A6914]/40 bg-[#C9A227]/10"
          aria-hidden="true"
        />
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="no-scrollbar h-60 overflow-y-auto scroll-smooth [scroll-snap-type:y_mandatory]"
        >
          {Array.from({ length: PADDING_ITEMS }).map((_, i) => (
            <div key={`pad-top-${i}`} style={{ height: ITEM_HEIGHT }} />
          ))}
          {slots.map((slot, index) => (
            <button
              key={slot}
              type="button"
              onClick={() => selectIndex(index)}
              style={{ height: ITEM_HEIGHT, scrollSnapAlign: "center" }}
              className={`flex w-full items-center justify-center transition-all ${
                slot === value ? "text-base font-bold text-[#0A0A0A]" : "text-sm text-[#8A8074]"
              }`}
            >
              {formatSlotLabel(slot)}
            </button>
          ))}
          {Array.from({ length: PADDING_ITEMS }).map((_, i) => (
            <div key={`pad-bottom-${i}`} style={{ height: ITEM_HEIGHT }} />
          ))}
        </div>
      </div>
    </div>
  );
}
