"use client";

import { useTranslations } from "next-intl";
import PrimaryAction from "@/components/ui/PrimaryAction";

export default function SessionCommand({ exercise, onStartTraining }) {
  const t = useTranslations("workouts.session");

  return (
    <section className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.06] shadow-[0_30px_90px_rgba(0,0,0,0.42)]">
      <div className="grid gap-6 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#9fb7ff]">
            {t("now")}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white">
            {t("previewSetReps", { reps: exercise.reps })}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
            {t("sessionCommandBody")}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:w-72">
          <div className="rounded-2xl bg-black/20 p-3 text-center">
            <p className="text-xs text-zinc-500">{t("weight")}</p>
            <p className="mt-1 text-lg font-semibold text-white">{t("weightValue", { weight: exercise.weight })}</p>
          </div>
          <div className="rounded-2xl bg-black/20 p-3 text-center">
            <p className="text-xs text-zinc-500">{t("rir")}</p>
            <p className="mt-1 text-lg font-semibold text-white">{exercise.rir}</p>
          </div>
          <div className="rounded-2xl bg-black/20 p-3 text-center">
            <p className="text-xs text-zinc-500">{t("tempo")}</p>
            <p className="mt-1 text-lg font-semibold text-white">{exercise.tempo}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 border-t border-white/8 bg-black/20 p-4 sm:grid-cols-[1fr_1fr]">
        <PrimaryAction onClick={onStartTraining}>{t("startTraining")}</PrimaryAction>
        <PrimaryAction href="#mi-entrenamiento">{t("viewPlan")}</PrimaryAction>
      </div>
    </section>
  );
}
