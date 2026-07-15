import { formatSlotLabel } from "@/lib/availability";

type ReviewStepProps = {
  name: string;
  email: string;
  phone: string;
  note: string;
  date: string;
  time: string;
};

function formatDateLabel(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function ReviewStep({ name, email, phone, note, date, time }: ReviewStepProps) {
  const rows: { label: string; value: string }[] = [
    { label: "Name", value: name },
    { label: "Email", value: email },
    { label: "Phone", value: phone },
    { label: "Date", value: formatDateLabel(date) },
    { label: "Time", value: formatSlotLabel(time) },
  ];
  if (note) rows.push({ label: "Note", value: note });

  return (
    <div>
      <p className="mb-2 text-sm font-bold text-[#0A0A0A]">Review your request</p>
      <div className="space-y-3 rounded-xl border border-[#E8DFC4] bg-[#FBF8EF] p-4">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between gap-4 text-sm">
            <span className="font-semibold text-[#55504A]">{row.label}</span>
            <span className="text-right text-[#0A0A0A]">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
