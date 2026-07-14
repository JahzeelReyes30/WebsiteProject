import { QuoteButton } from "./QuoteButton";

const INCLUDES = [
  "Full room-by-room cleaning",
  "Healthcare-inspired disinfection",
  "Kitchen & bathroom deep clean",
  "Dusting, vacuuming & mopping",
];

const TERMINAL_INCLUDES = [
  "EPA-registered disinfectant products",
  "Deep disinfection of all surfaces & high-touch points",
  "Extra layer of protection for your household",
  "Ideal after illness or for vulnerable family members",
];

export function Pricing() {
  return (
    <section id="pricing" className="py-16">
      <div className="mx-auto max-w-[1080px] px-6 text-center">
        <h2 className="text-3xl font-bold text-[#0A0A0A]">Simple, Flat-Rate Pricing</h2>
        <p className="mx-auto mt-2 max-w-md text-[#55504A]">
          No hidden fees. No surprise add-ons. One clear price.
        </p>

        <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-[#E8DFC4] bg-white p-9 shadow-[0_8px_24px_rgba(10,10,10,0.12)]">
            <p className="font-semibold text-[#8A6914]">Standard Cleaning Service</p>
            <p className="my-1 text-5xl font-extrabold text-[#0A0A0A]">
              <span className="align-top text-2xl">$</span>200
            </p>
            <p className="-mt-1 mb-5 text-sm text-[#55504A]">flat rate</p>

            <ul className="mb-6 space-y-2 text-left">
              {INCLUDES.map((item) => (
                <li key={item} className="border-b border-[#E8DFC4] py-2 text-[#55504A]">
                  <span className="mr-1 font-bold text-[#8A6914]">✓</span> {item}
                </li>
              ))}
            </ul>

            <QuoteButton className="w-full rounded-full bg-[#C9A227] px-6 py-3 font-semibold text-[#0A0A0A] hover:bg-[#A6821F]">
              Book This Rate — Get a Quote
            </QuoteButton>
          </div>

          <div className="rounded-xl border border-[#E8DFC4] bg-white p-9 shadow-[0_8px_24px_rgba(10,10,10,0.12)]">
            <p className="font-semibold text-[#8A6914]">Terminal Cleaning</p>
            <p className="my-1 text-5xl font-extrabold text-[#0A0A0A]">
              <span className="align-top text-2xl">$</span>150
            </p>
            <p className="-mt-1 mb-2 text-sm text-[#55504A]">per room</p>
            <p className="mb-5 text-sm text-[#55504A]">
              An extra-thorough disinfection cleaning using EPA-registered products, applied
              per label instructions for maximum effectiveness.
            </p>

            <ul className="mb-6 space-y-2 text-left">
              {TERMINAL_INCLUDES.map((item) => (
                <li key={item} className="border-b border-[#E8DFC4] py-2 text-[#55504A]">
                  <span className="mr-1 font-bold text-[#8A6914]">✓</span> {item}
                </li>
              ))}
            </ul>

            <QuoteButton className="w-full rounded-full bg-[#C9A227] px-6 py-3 font-semibold text-[#0A0A0A] hover:bg-[#A6821F]">
              Book This Rate — Get a Quote
            </QuoteButton>
          </div>
        </div>
      </div>
    </section>
  );
}
