import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Pricing } from "@/components/Pricing";
import { Gallery } from "@/components/Gallery";
import { Reviews } from "@/components/Reviews";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Pricing />
        <Gallery />
        <Reviews />
        <FinalCta />
      </main>
      <Footer />
      <BookingModal />
    </>
  );
}
