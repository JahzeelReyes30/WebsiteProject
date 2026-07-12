import { QuoteButton } from "./QuoteButton";

export function Hero() {
  return (
    <section id="top" className="bg-gradient-to-b from-[#e6f6f4] to-white py-20 text-center">
      <div className="mx-auto max-w-[1080px] px-6">
        <p className="mb-2.5 text-sm font-bold uppercase tracking-wide text-[#0f6b63]">
          Healthcare-Inspired Cleaning
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight text-[#0b3d3a] sm:text-5xl">
          Hospital-grade clean, for your home or business.
        </h1>
        <p className="mx-auto mt-5 mb-8 max-w-xl text-lg text-[#4a5a58]">
          MajinCleaningSolutions brings the same disinfection standards used in healthcare
          facilities to your everyday spaces — thorough, safe, and consistent, every single
          visit.
        </p>
        <QuoteButton className="rounded-full bg-[#14a89a] px-9 py-4 text-lg font-semibold text-white hover:bg-[#0f6b63]">
          Get Your Free Quote Today
        </QuoteButton>
      </div>
    </section>
  );
}
