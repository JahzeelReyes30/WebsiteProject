import { QuoteButton } from "./QuoteButton";

export function FinalCta() {
  return (
    <section className="bg-[#0A0A0A] py-16 text-center text-white">
      <div className="mx-auto max-w-[1080px] px-6">
        <h2 className="mb-6 text-3xl font-bold">Ready for a cleaner, healthier space?</h2>
        <QuoteButton className="rounded-full bg-[#C9A227] px-9 py-4 text-lg font-semibold text-[#0A0A0A] hover:bg-[#A6821F]">
          Get Your Free Quote Today
        </QuoteButton>
      </div>
    </section>
  );
}
