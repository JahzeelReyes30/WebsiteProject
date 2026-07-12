import { QuoteButton } from "./QuoteButton";

export function Footer() {
  return (
    <footer className="bg-[#1c2a29] py-10 text-center text-white">
      <div className="mx-auto max-w-[1080px] px-6">
        <p className="text-xl font-extrabold">
          Majin<span className="text-[#14a89a]">Cleaning</span>Solutions
        </p>
        <p className="mt-1 text-[#c9d4d3]">Healthcare-inspired cleaning for homes &amp; offices.</p>
        <QuoteButton className="mt-4 rounded-full bg-[#14a89a] px-6 py-2 text-sm font-semibold text-white hover:bg-[#0f6b63]">
          Free Quote
        </QuoteButton>
        <p className="mt-6 text-xs text-[#8fa19e]">
          &copy; 2026 MajinCleaningSolutions. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
