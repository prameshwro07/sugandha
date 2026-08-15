export default function AnnouncementBar() {
const messages = [
  "🚚 Free Delivery on Orders above Rs. 999 — Shop Now!",
  "🌿 Premium Alcohol-Free Attars — Long-Lasting & Elegant.",
  "⭐ Trusted by Customers — Quality You Can Count On!",
];

  return (
    <div className="relative h-6 overflow-hidden bg-sky-300 text-black">
      <div className="flex h-full w-max items-center animate-marquee">

        <div className="flex shrink-0 items-center gap-8 sm:gap-12 md:gap-20 lg:gap-32 xl:gap-40">
          {messages.map((message, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-normal text-xs"
            >
              {message}
            </span>
          ))}
        </div>

        <div className="ml-8 flex shrink-0 items-center gap-8 sm:ml-12 sm:gap-12 md:ml-20 md:gap-20 lg:ml-32 lg:gap-32 xl:ml-40 xl:gap-40">
          {messages.map((message, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-normal text-xs"
            >
              {message}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}