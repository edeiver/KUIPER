 "use client";

import { useTranslations } from "next-intl";

export default function ReadinessStrip({ exercise }) {
  const t = useTranslations("workouts.session.readiness");
  const items = [
    [t("technique"), t("controlled")],
    [t("range"), exercise.rangeOfMotion],
    [t("intensity"), t("rirValue", { rir: exercise.rir })],
    [t("next"), t("secondsValue", { seconds: exercise.restSeconds })],
  ];

  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map(([label, value]) => (
        <div
          key={label}
          className="rounded-[24px] border border-white/10 bg-white/[0.05] p-4"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            {label}
          </p>
          <p className="mt-2 text-lg font-semibold text-white">{value}</p>
        </div>
      ))}
    </section>
  );
}
