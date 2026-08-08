import { Check } from "lucide-react";

type Props = {
  step: "payment" | "form" | "success";
};

export default function CheckoutProgress({ step }: Props) {
  const current =
    step === "payment" ? 1 :
    step === "form" ? 2 : 3;

  return (
    <div className="mb-8">
      <div className="flex items-center">

        {/* Payment */}
        <Step
          title="Payment"
          active={current >= 1}
          completed={current > 1}
        />

        <Line active={current >= 2} />

        {/* Delivery */}
        <Step
          title="Delivery"
          active={current >= 2}
          completed={current > 2}
        />

        <Line active={current >= 3} />

        {/* Success */}
        <Step
          title="Confirm"
          active={current >= 3}
          completed={false}
        />
      </div>
    </div>
  );
}

function Step({
  title,
  active,
  completed,
}: {
  title: string;
  active: boolean;
  completed: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300
        ${
        completed
          ? "border-sky-400 bg-sky-400 text-white"
          : active
          ? "border-sky-400 bg-white text-sky-400"
          : "border-slate-300 bg-white text-slate-400"
          }`}
></div>

      <span
        className={`mt-2 text-xs font-medium ${
          active ? "text-slate-900" : "text-slate-400"
        }`}
      >
        {title}
      </span>
    </div>
  );
}

function Line({ active }: { active: boolean }) {
  return (
    <div
      className={`mx-3 h-1 flex-1 rounded-full ${
        active ? "bg-sky-400" : "bg-slate-200"
      }`}
    />
  );
}