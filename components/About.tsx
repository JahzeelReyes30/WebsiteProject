const POINTS = [
  {
    title: "CDC-guideline disinfection",
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
        <h2 className="mb-8 text-center text-3xl font-bold text-[#0A0A0A]">About Us</h2>
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-start">
          <div className="space-y-4 text-[#55504A]">
            <p>
              MajinCleaningSolutions was built on a simple idea: your home and workplace
              deserve the same level of cleanliness and care as a healthcare facility. We
              follow healthcare-inspired cleaning protocols aligned with CDC guidelines —
              EPA-registered disinfectants, color-coded tools to prevent cross-contamination,
              and a room-by-room checklist so nothing gets missed.
            </p>
            <p>
              Whether it&apos;s a busy household, a small office, or a space that needs a deep
              reset, our goal is the same every time: a space that isn&apos;t just tidy, but
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
