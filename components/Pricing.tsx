import { QuoteButton } from "./QuoteButton";

const INCLUDES = [
  "Full room-by-room cleaning",
  "Hospital-grade disinfection",
  "Kitchen & bathroom deep clean",
  "Dusting, vacuuming & mopping",
];

export function Pricing() {
  return (
    <section id="pricing" className="py-16">
      <div className="mx-auto max-w-[1080px] px-6 text-center">
        <h2 className="text-3xl font-bold text-[#0b3d3a]">Simple, Flat-Rate Pricing</h2>
        <p className="mx-auto mt-2 max-w-md text-[#4a5a58]">
          No hidden fees. No surprise add-ons. One clear price.
        </p>

        <div className="mx-auto mt-8 max-w-sm rounded-xl border border-[#d8e8e6] bg-white p-9 shadow-[0_8px_24px_rgba(11,61,58,0.12)]">
          <p className="font-semibold text-[#0f6b63]">Standard Cleaning Service</p>
          <p className="my-1 text-5xl font-extrabold text-[#0b3d3a]">
            <span className="align-top text-2xl">$</span>200
          </p>
          <p className="-mt-1 mb-5 text-sm text-[#4a5a58]">flat rate</p>

          <ul className="mb-6 space-y-2 text-left">
            {INCLUDES.map((item) => (
              <li key={item} className="border-b border-[#d8e8e6] py-2 text-[#4a5a58]">
                <span className="mr-1 font-bold text-[#14a89a]">✓</span> {item}
              </li>
            ))}
          </ul>

          <QuoteButton className="w-full rounded-full bg-[#14a89a] px-6 py-3 font-semibold text-white hover:bg-[#0f6b63]">
            Book This Rate — Get a Quote
          </QuoteButton>
        </div>
      </div>
    </section>
  );
}
