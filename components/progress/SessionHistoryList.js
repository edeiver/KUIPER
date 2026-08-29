"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Surface from "@/components/ui/Surface";
import { readWorkoutSessions } from "@/utils/workoutStorage";
import { getSessionSummaryValues } from "@/utils/formatWorkoutSession";

export default function SessionHistoryList() {
  const t = useTranslations("progress.sessionHistory");
  const tSummary = useTranslations("common");
  const locale = useLocale();
  const [loaded, setLoaded] = useState(false);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    setSessions(readWorkoutSessions().slice().reverse());
    setLoaded(true);
  }, []);

  return (
    <Surface className="grid gap-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
        {t("title")}
      </p>
      {sessions.length ? (
        <div className="grid gap-3">
          {sessions.map((session, index) => {
            const values = getSessionSummaryValues(session, locale);
            return (
              <div
                key={`${session.date}-${index}`}
                className="rounded-2xl border border-white/8 bg-white/[0.04] p-4"
              >
                <p className="text-base font-semibold text-white">{values.title}</p>
                <p className="mt-1 text-sm text-zinc-500">{tSummary("sessionSummary", values)}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-zinc-500">
          {loaded ? t("empty") : ""}
        </p>
      )}
    </Surface>
  );
}
