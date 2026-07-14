import Image from "next/image";

const POINTS = [
  {
    title: "Healthcare-inspired disinfection",
    body: "EPA-registered disinfectants used in medical settings.",
  },
  {
    title: "Cross-contamination control",
    body: "Color-coded cloths and tools for every room type.",
  },
  {
    title: "Checklist-driven process",
    body: "A consistent standard, room by room, every visit.",
  },
  {
    title: "Health & safety first",
    body: "Safe for kids, pets, and anyone with sensitivities.",
  },
];

export function About() {
  return (
    <section id="about" className="py-16">
      <div className="mx-auto max-w-[1080px] px-6">
        <div className="mb-10 flex flex-col items-center text-center">
          <Image
            src="/images/founder-headshot.jpg"
            alt="Jahzeel Reyes, founder of Majin Cleaning Solutions"
            width={780}
            height={780}
            className="h-[280px] w-[280px] rounded-2xl border-4 border-[#C9A227] object-cover shadow-[0_12px_32px_rgba(10,10,10,0.18)] sm:h-[360px] sm:w-[360px]"
            priority
          />
          <p className="mt-5 text-lg font-bold text-[#0A0A0A]">Jahzeel Reyes</p>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#8A6914]">
            Founder, Majin Cleaning Solutions
          </p>
        </div>

        <h2 className="mb-8 text-center text-3xl font-bold text-[#0A0A0A]">About Us</h2>
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-start">
          <div className="space-y-4 text-[#55504A]">
            <p>
              I started Majin Cleaning Solutions after years of working in a hospital as an
              Environmental Services worker, disinfecting patient rooms for COVID, MRSA, and
              other infectious conditions. That job taught me what it actually takes to make a
              space safe — not just tidy, but properly disinfected: the right EPA-registered
              products, the right contact time, and a process that doesn&apos;t cut corners.
            </p>
            <p>
              I saw firsthand how much of a difference real disinfection makes, and I wanted to
              bring that same standard into homes and offices, not just hospitals. That&apos;s
              why I built this company around the same healthcare-inspired process: EPA-registered
              disinfectants, color-coded tools to prevent cross-contamination, and a room-by-room
              checklist so nothing gets missed.
            </p>
            <p>
              Whether it&apos;s a busy household, a small office, or a space that needs a deep
              reset, my goal is the same every time: a space that isn&apos;t just tidy, but
              genuinely, verifiably clean.
            </p>
          </div>
          <ul className="grid gap-4">
            {POINTS.map((point) => (
              <li key={point.title} className="rounded-lg bg-[#FBF3DC] p-4">
                <strong className="mb-1 block text-[#0A0A0A]">{point.title}</strong>
                <span className="text-sm text-[#55504A]">{point.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
