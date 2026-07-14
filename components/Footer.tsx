import Image from "next/image";
import { QuoteButton } from "./QuoteButton";

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] py-10 text-center text-white">
      <div className="mx-auto max-w-[1080px] px-6">
        <div className="flex items-center justify-center gap-2.5">
          <Image
            src="/images/logo.png"
            alt="Majin Cleaning Solutions logo"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
          <p className="text-xl font-extrabold">
            Majin<span className="text-[#D9A93F]">Cleaning</span>Solutions
          </p>
        </div>
        <p className="mt-2 text-[#D8CBA8]">
          Healthcare-inspired cleaning for homes &amp; offices across Long Island, NY.
        </p>
        <QuoteButton className="mt-4 rounded-full bg-[#C9A227] px-6 py-2 text-sm font-semibold text-[#0A0A0A] hover:bg-[#A6821F]">
          Free Quote
        </QuoteButton>
        <p className="mt-6 text-xs text-[#A8967A]">
          &copy; 2026 MajinCleaningSolutions. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
