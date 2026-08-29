"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

function getGreetingKey(hour) {
  if (hour < 12) return "greetingMorning";
  if (hour < 20) return "greetingAfternoon";
  return "greetingNight";
}

export default function HomeHero() {
  const t = useTranslations("home");
  const locale = useLocale();
  const [greeting, setGreeting] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    const now = new Date();
    setGreeting(t(getGreetingKey(now.getHours())));
    setToday(
      now.toLocaleDateString(locale, {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
    );
  }, [locale, t]);

  return (
    <header className="grid gap-5">
      <div>
        <p className="text-3xl font-semibold tracking-normal text-white sm:text-5xl">
          {t("greetingWithName", { greeting: greeting || t("greetingFallback"), name: "Edeiver" })}
        </p>
        <p className="mt-2 min-h-5 text-sm font-medium capitalize text-zinc-500">
          {today}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-zinc-200">
          {t("scheduledWorkout")}
        </span>
      </div>
    </header>
  );
}
