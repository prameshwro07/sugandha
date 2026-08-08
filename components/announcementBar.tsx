export default function AnnouncementBar() {
  const message =
    "⏳ Free Delivery on Orders Above Rs. 999 — Don't Miss Out!";
  // "🚚 Free Delivery on Orders above Rs. 999 | 🌿 Alcohol-Free Premium Attars | ⭐ Trusted by Customers"

  return (
<div className="relative h-6 overflow-hidden bg-sky-300 text-black">
  <div className="flex h-full w-max items-center animate-marquee">
    <div className="flex shrink-0">
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          className="whitespace-nowrap px-10 font-normal text-xs"
        >
          {message}
        </span>
      ))}
    </div>

    <div className="flex shrink-0">
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          className="whitespace-nowrap px-10 font-normal text-xs"
        >
          {message}
        </span>
      ))}
    </div>
  </div>
</div>
  );
}