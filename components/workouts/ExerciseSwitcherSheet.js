"use client";

import { useTranslations } from "next-intl";

export default function ExerciseSwitcherSheet({
  alternatives,
  isSubstituted,
  onSelectAlternative,
  onKeepOriginal,
  onClose,
}) {
  const t = useTranslations("workouts.session.switcher");

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center">
      <section className="workout-pop grid w-full max-w-lg gap-4 rounded-[32px] border border-white/10 bg-[#101218] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9fb7ff]">
              {t("eyebrow")}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white">
              {t("title")}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white transition hover:bg-white/[0.09]"
          >
            ✕
          </button>
        </div>

        {alternatives.length === 0 ? (
          <p className="text-sm text-zinc-500">
            {t("empty")}
          </p>
        ) : (
          <div className="grid gap-2.5">
            {alternatives.map((alternative) => (
              <button
                key={alternative.id}
                type="button"
                onClick={() => onSelectAlternative(alternative.id)}
                className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-white/20 hover:bg-white/[0.08]"
              >
                <div>
                  <p className="text-base font-semibold text-white">{alternative.name}</p>
                  <p className="mt-1 text-xs text-zinc-500">{alternative.equipmentName}</p>
                </div>
                <span className="text-zinc-600">›</span>
              </button>
            ))}
          </div>
        )}

        {isSubstituted ? (
          <button
            type="button"
            onClick={onKeepOriginal}
            className="min-h-11 rounded-full border border-white/10 bg-white/[0.05] px-4 text-sm font-semibold text-zinc-200 transition hover:bg-white/[0.08]"
          >
            {t("keepOriginal")}
          </button>
        ) : null}
      </section>
    </div>
  );
}
