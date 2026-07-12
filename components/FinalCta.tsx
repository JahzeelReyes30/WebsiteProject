import { QuoteButton } from "./QuoteButton";

export function FinalCta() {
  return (
    <section className="bg-[#0b3d3a] py-16 text-center text-white">
      <div className="mx-auto max-w-[1080px] px-6">
        <h2 className="mb-6 text-3xl font-bold">Ready for a hospital-grade clean?</h2>
        <QuoteButton className="rounded-full bg-[#14a89a] px-9 py-4 text-lg font-semibold text-white hover:bg-[#0f6b63]">
          Get Your Free Quote Today
        </QuoteButton>
      </div>
    </section>
  );
}
