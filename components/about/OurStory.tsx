export default function OurStory() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">

        {/* Left */}
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
            Our Story
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
            It started with a simple question...
          </h2>

          <p className="mt-8 text-lg leading-8 text-slate-600">
            Have you ever wondered,
            <strong className="text-slate-900">
              {" "}“Do I smell good?”
            </strong>
          </p>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Whether it's meeting friends, attending a family gathering,
            celebrating a special occasion, or simply going about your day,
            choosing the right fragrance isn't always easy. Many people want to
            smell great but aren't sure which scent truly suits them.
          </p>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Sugandha was created to remove that uncertainty. We carefully
            select fragrances that help you feel confident, express your
            personality, and create memorable first impressions without making
            the process complicated.
          </p>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Because when you smell good, you naturally feel more confident.
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 shadow-sm">
            <div className="text-5xl">✨</div>

            <blockquote className="mt-6 text-3xl font-bold leading-tight text-slate-900">
              "Smelling good shouldn't be another thing to worry about."
            </blockquote>

            <p className="mt-6 text-lg leading-7 text-slate-600">
              Every fragrance we offer is chosen to help you feel confident,
              comfortable, and ready for every occasion—from everyday moments
              to life's biggest celebrations.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}