import Image from "next/image";

export function Gallery() {
  return (
    <section id="gallery" className="bg-[#e6f6f4] py-16">
      <div className="mx-auto max-w-[1080px] px-6 text-center">
        <h2 className="text-3xl font-bold text-[#0b3d3a]">See the Difference</h2>
        <p className="mx-auto mt-2 max-w-md text-[#4a5a58]">
          A real look at what a MajinCleaningSolutions visit can do.{" "}
          <em>(Sample illustration shown below — real customer photos coming soon.)</em>
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <figure className="overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_rgba(11,61,58,0.12)]">
            <Image
              src="/images/before.svg"
              alt="Illustration of a cluttered, dirty living room before cleaning"
              width={400}
              height={300}
              className="w-full"
            />
            <figcaption className="p-3 font-bold text-[#0b3d3a]">Before</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_rgba(11,61,58,0.12)]">
            <Image
              src="/images/after.svg"
              alt="Illustration of the same living room, spotless and organized after cleaning"
              width={400}
              height={300}
              className="w-full"
            />
            <figcaption className="p-3 font-bold text-[#0b3d3a]">After</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
