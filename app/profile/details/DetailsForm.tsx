// "use client";

// import { useState } from "react";

// type DetailsFormProps = {
//   phone: string;
//   address: string;
// };

// export default function DetailsForm({
//   phone,
//   address,
// }: DetailsFormProps) {
//   const [phoneNumber, setPhoneNumber] = useState(phone);
//   const [deliveryAddress, setDeliveryAddress] = useState(address);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();

//     setLoading(true);
//     setMessage("");

//     try {
//       const response = await fetch("/api/profile/details", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           phone: phoneNumber,
//           address: deliveryAddress,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setMessage(data.error || "Failed to save details.");
//         return;
//       }

//       setMessage("Details saved successfully.");
//     } catch {
//       setMessage("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="mt-7 space-y-5">
//       {/* Phone */}
//       <div>
//         <label
//           htmlFor="phone"
//           className="mb-2 block text-sm font-medium text-slate-700"
//         >
//           Phone Number
//         </label>

//         <input
//           id="phone"
//           name="phone"
//           type="tel"
//           value={phoneNumber}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//           placeholder="98XXXXXXXX"
//           required
//           className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
//         />
//       </div>

//       {/* Address */}
//       <div>
//         <label
//           htmlFor="address"
//           className="mb-2 block text-sm font-medium text-slate-700"
//         >
//           Address
//         </label>

//         <textarea
//           id="address"
//           name="address"
//           rows={3}
//           value={deliveryAddress}
//           onChange={(e) => setDeliveryAddress(e.target.value)}
//           placeholder="Your delivery address"
//           required
//           className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full rounded-xl bg-sky-400 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
//       >
//         {loading ? "Saving..." : "Save Details"}
//       </button>

//       {message && (
//         <p className="text-center text-sm text-slate-600">
//           {message}
//         </p>
//       )}
//     </form>
//   );
// }

"use client";

import { useState } from "react";
import { MapPin, Phone, Save, CheckCircle2, AlertCircle } from "lucide-react";

type DetailsFormProps = {
  phone: string;
  address: string;
};

export default function DetailsForm({
  phone,
  address,
}: DetailsFormProps) {
  const [phoneNumber, setPhoneNumber] = useState(phone);
  const [deliveryAddress, setDeliveryAddress] = useState(address);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const response = await fetch("/api/profile/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phoneNumber,
          address: deliveryAddress,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Failed to save details.");
        setSuccess(false);
        return;
      }

      setMessage("Your details have been saved successfully.");
      setSuccess(true);
    } catch {
      setMessage("Something went wrong. Please try again.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.07)]"
    >
      {/* Top accent */}
      <div className="h-1.5 bg-sky-400" />

      <div className="p-5 sm:p-7">
        {/* Header */}
        <div className="mb-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
              <MapPin size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Delivery Details
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Save your details for faster checkout.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
            >
              <Phone size={16} className="text-sky-500" />
              Phone Number
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="98XXXXXXXX"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
            />

            <p className="mt-2 text-xs text-slate-400">
              We'll use this number to contact you about your order.
            </p>
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
            >
              <MapPin size={16} className="text-sky-500" />
              Delivery Address
            </label>

            <textarea
              id="address"
              name="address"
              rows={4}
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Enter your complete delivery address"
              required
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
            />

            <p className="mt-2 text-xs text-slate-400">
              Include your area, street, landmark, or other useful delivery
              information.
            </p>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`flex items-start gap-3 rounded-xl px-4 py-3 ${
                success
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {success ? (
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0"
                />
              ) : (
                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0"
                />
              )}

              <p className="text-sm font-medium leading-5">
                {message}
              </p>
            </div>
          )}

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-sky-400 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-sky-500 hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={18} />

            {loading ? "Saving details..." : "Save Details"}
          </button>
        </div>
      </div>
    </form>
  );
}