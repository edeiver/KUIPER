"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Surface from "@/components/ui/Surface";
import { readWorkoutSessions } from "@/utils/workoutStorage";
import { getSessionSummaryValues } from "@/utils/formatWorkoutSession";

export default function StatsOverviewCard() {
  const t = useTranslations("dashboard.stats");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const [loaded, setLoaded] = useState(false);
  const [lastSession, setLastSession] = useState(null);

  useEffect(() => {
    const sessions = readWorkoutSessions();
    setLastSession(sessions.length ? sessions[sessions.length - 1] : null);
    setLoaded(true);
  }, []);

  const upcomingStats = [
    t("currentWeight"),
    t("averageTime"),
    t("completedSessions"),
    t("weeklyVolume"),
  ];

  return (
    <Surface className="grid gap-6">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
        {t("title")}
      </p>

      <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9fb7ff]">
          {t("lastSession")}
        </p>
        {lastSession ? (
          <div className="mt-2">
            <p className="text-2xl font-semibold text-white">
              {lastSession.workout}
            </p>
            <p className="mt-1 text-sm text-zinc-400">
              {tCommon("sessionSummary", getSessionSummaryValues(lastSession, locale))}
            </p>
          </div>
        ) : (
          <p className="mt-2 text-sm text-zinc-500">
            {loaded ? t("noSessions") : ""}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {upcomingStats.map((label) => (
          <div
            key={label}
            className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 opacity-60"
          >
            <p className="text-xs text-zinc-500">{label}</p>
            <p className="mt-1 text-sm font-semibold text-zinc-400">
              {tCommon("comingSoon")}
            </p>
          </div>
        ))}
      </div>
    </Surface>
  );
}
