import Image from "next/image";
import { QuoteButton } from "./QuoteButton";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#E8DFC4] bg-white">
      <div className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-3 px-6 py-2.5">
        <a href="#top" className="flex items-center gap-2.5">
          <Image
            src="/images/logo.png"
            alt="Majin Cleaning Solutions logo"
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
            priority
          />
          <span className="text-xl font-extrabold text-[#0A0A0A]">
            Majin<span className="text-[#8A6914]">Cleaning</span>Solutions
          </span>
        </a>
        <nav className="flex flex-wrap items-center gap-5">
          <a href="#about" className="text-sm font-medium hover:text-[#8A6914]">
            About
          </a>
          <a href="#pricing" className="text-sm font-medium hover:text-[#8A6914]">
            Pricing
          </a>
          <a href="#gallery" className="text-sm font-medium hover:text-[#8A6914]">
            Before &amp; After
          </a>
          <a href="#reviews" className="text-sm font-medium hover:text-[#8A6914]">
            Reviews
          </a>
          <QuoteButton className="rounded-full bg-[#0A0A0A] px-5 py-2 text-sm font-semibold text-white hover:bg-[#A6821F]">
            Free Quote
          </QuoteButton>
        </nav>
      </div>
    </header>
  );
}
