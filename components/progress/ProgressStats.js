"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Surface from "@/components/ui/Surface";
import { readWorkoutSessions } from "@/utils/workoutStorage";

export default function ProgressStats() {
  const t = useTranslations("progress.stats");
  const locale = useLocale();
  const [loaded, setLoaded] = useState(false);
  const [stats, setStats] = useState({ totalSessions: 0, totalVolume: 0, last7Days: 0 });

  useEffect(() => {
    const sessions = readWorkoutSessions();
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    setStats({
      totalSessions: sessions.length,
      totalVolume: sessions.reduce((sum, session) => sum + session.totalVolume, 0),
      last7Days: sessions.filter((session) => new Date(session.date).getTime() >= sevenDaysAgo).length,
    });
    setLoaded(true);
  }, []);

  const items = [
    { label: t("totalSessions"), value: stats.totalSessions },
    { label: t("last7Days"), value: stats.last7Days },
    { label: t("totalVolume"), value: `${stats.totalVolume.toLocaleString(locale)} kg` },
  ];

  return (
    <Surface className="grid gap-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
        {t("title")}
      </p>
      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
            <p className="text-2xl font-semibold text-white">{loaded ? item.value : "—"}</p>
            <p className="mt-1 text-xs text-zinc-500">{item.label}</p>
          </div>
        ))}
      </div>
    </Surface>
  );
}
