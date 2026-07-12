import { QuoteButton } from "./QuoteButton";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#d8e8e6] bg-white">
      <div className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-3 px-6 py-3.5">
        <a href="#top" className="text-xl font-extrabold text-[#0b3d3a]">
          Majin<span className="text-[#14a89a]">Cleaning</span>Solutions
        </a>
        <nav className="flex flex-wrap items-center gap-5">
          <a href="#about" className="text-sm font-medium hover:text-[#0f6b63]">
            About
          </a>
          <a href="#pricing" className="text-sm font-medium hover:text-[#0f6b63]">
            Pricing
          </a>
          <a href="#gallery" className="text-sm font-medium hover:text-[#0f6b63]">
            Before &amp; After
          </a>
          <a href="#reviews" className="text-sm font-medium hover:text-[#0f6b63]">
            Reviews
          </a>
          <QuoteButton className="rounded-full bg-[#0b3d3a] px-5 py-2 text-sm font-semibold text-white hover:bg-[#0f6b63]">
            Free Quote
          </QuoteButton>
        </nav>
      </div>
    </header>
  );
}
