"use client";

import { useTranslations } from "next-intl";
import Surface from "@/components/ui/Surface";
import MediaPlaceholder from "@/components/workouts/MediaPlaceholder";

export default function AnatomyPanel({ exercise }) {
  const t = useTranslations("workouts.session.anatomy");

  return (
    <Surface id="anatomia" className="scroll-mt-24 grid gap-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9fb7ff]">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white">
          {t("title")}
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-[0.9fr_1.1fr]">
        <MediaPlaceholder label={t("anatomyImage")} variant="anatomy" />
        <div className="grid content-start gap-4">
          <div className="rounded-[24px] bg-white/[0.05] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {t("primaryMuscle")}
            </p>
            <p className="mt-2 text-xl font-semibold text-white">
              {exercise.muscles.primary}
            </p>
          </div>
          <div className="rounded-[24px] bg-white/[0.05] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {t("secondaryMuscles")}
            </p>
            <p className="mt-2 text-xl font-semibold text-white">
              {exercise.muscles.secondary}
            </p>
          </div>
          <p className="text-base leading-7 text-zinc-300">
            {exercise.anatomyNote}
          </p>
        </div>
      </div>
    </Surface>
  );
}
