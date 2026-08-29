"use client";

import { useTranslations } from "next-intl";

export default function ExerciseProgress({ exerciseIndex, totalExercises }) {
  const t = useTranslations("workouts.session");
  const percent = Math.round(((exerciseIndex + 1) / totalExercises) * 100);

  return (
    <section className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">
            {t("exerciseOf", { current: exerciseIndex + 1, total: totalExercises })}
          </p>
          <p className="mt-1 text-sm text-zinc-500">{t("percentComplete", { percent })}</p>
        </div>
        <span className="rounded-full bg-[#9fb7ff]/15 px-4 py-2 text-sm font-semibold text-[#c8d5ff]">
          {`${percent} %`}
        </span>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[#9fb7ff]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </section>
  );
}
