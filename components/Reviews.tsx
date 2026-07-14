const REVIEWS = [
  {
    quote:
      "Genuinely felt spotless afterward — you can tell they follow real cleaning standards. My allergies have never been better.",
    author: "Priya M.",
  },
  {
    quote:
      "Flat $200 rate, no surprise charges, and they showed up exactly on time. Booking again.",
    author: "Daniel R.",
  },
  {
    quote: "Our small office has never looked this good. The checklist approach really shows.",
    author: "Angela T.",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="py-16">
      <div className="mx-auto max-w-[1080px] px-6 text-center">
        <h2 className="text-3xl font-bold text-[#0A0A0A]">What Customers Say</h2>
        <p className="mx-auto mt-2 max-w-md text-[#55504A]">
          <em>Sample reviews shown for demonstration — real customer reviews coming soon.</em>
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <blockquote
              key={review.author}
              className="rounded-xl border border-[#E8DFC4] bg-white p-6 text-left"
            >
              <p className="mb-2 tracking-widest text-[#D9A93F]">★★★★★</p>
              <p className="text-[#55504A]">&quot;{review.quote}&quot;</p>
              <cite className="mt-3 block font-bold not-italic text-[#0A0A0A]">
                — {review.author}
              </cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
