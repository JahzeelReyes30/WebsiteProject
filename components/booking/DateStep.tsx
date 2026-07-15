"use client";

import { getHoursLabelForDate } from "@/lib/availability";

type DateStepProps = {
  value: string;
  onChange: (date: string) => void;
};

const DAY_ABBR = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAYS_AHEAD = 30;

function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export function DateStep({ value, onChange }: DateStepProps) {
  const today = new Date();
  const dates = Array.from({ length: DAYS_AHEAD }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return d;
  });

  return (
    <div>
      <p className="mb-2 text-sm font-bold text-[#0A0A0A]">Pick a date</p>
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2 [scroll-snap-type:x_proximity]">
        {dates.map((d) => {
          const dateStr = toDateStr(d);
          const isSelected = dateStr === value;
          return (
            <button
              key={dateStr}
              type="button"
              onClick={() => onChange(dateStr)}
              style={{ scrollSnapAlign: "start" }}
              className={`flex shrink-0 flex-col items-center rounded-xl border px-4 py-3 text-center transition-colors ${
                isSelected
                  ? "border-[#8A6914] bg-[#C9A227]/15 text-[#0A0A0A]"
                  : "border-[#E8DFC4] text-[#55504A] hover:border-[#8A6914]"
              }`}
            >
              <span className="text-xs font-semibold uppercase">{DAY_ABBR[d.getDay()]}</span>
              <span className="text-lg font-bold">{d.getDate()}</span>
              <span className="text-[10px] text-[#8A8074]">{getHoursLabelForDate(dateStr)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
