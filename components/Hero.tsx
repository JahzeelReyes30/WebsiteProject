import { QuoteButton } from "./QuoteButton";

export function Hero() {
  return (
    <section id="top" className="bg-gradient-to-b from-[#FBF3DC] to-white py-20 text-center">
      <div className="mx-auto max-w-[1080px] px-6">
        <p className="mb-2.5 text-sm font-bold uppercase tracking-wide text-[#8A6914]">
          Healthcare-Inspired Cleaning
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight text-[#0A0A0A] sm:text-5xl">
          A cleaner, healthier space — every time.
        </h1>
        <p className="mx-auto mt-5 mb-8 max-w-xl text-lg text-[#55504A]">
          MajinCleaningSolutions brings the same disinfection standards used in healthcare
          facilities to your everyday spaces — thorough, safe, and consistent, every single
          visit.
        </p>
        <QuoteButton className="rounded-full bg-[#C9A227] px-9 py-4 text-lg font-semibold text-[#0A0A0A] hover:bg-[#A6821F]">
          Get Your Free Quote Today
        </QuoteButton>
      </div>
    </section>
  );
}
