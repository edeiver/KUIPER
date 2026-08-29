"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getUserName, setUserName } from "@/utils/userProfile";

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
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState(null);
  const [nameInput, setNameInput] = useState("");

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
    setName(getUserName());
    setLoaded(true);
  }, [locale, t]);

  const handleSaveName = (event) => {
    event.preventDefault();
    const trimmed = nameInput.trim();

    if (!trimmed) {
      return;
    }

    setUserName(trimmed);
    setName(trimmed);
  };

  if (loaded && !name) {
    return (
      <header className="grid gap-5">
        <p className="text-2xl font-semibold tracking-normal text-white sm:text-3xl">
          {t("namePromptTitle")}
        </p>
        <form onSubmit={handleSaveName} className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={nameInput}
            onChange={(event) => setNameInput(event.target.value)}
            placeholder={t("namePromptPlaceholder")}
            autoFocus
            className="min-h-12 flex-1 rounded-full border border-white/10 bg-white/[0.06] px-5 text-base text-white outline-none placeholder:text-zinc-600"
          />
          <button
            type="submit"
            className="min-h-12 rounded-full bg-white px-6 text-sm font-semibold text-[#08090b] transition hover:bg-zinc-200"
          >
            {t("namePromptSave")}
          </button>
        </form>
      </header>
    );
  }

  return (
    <header className="grid gap-5">
      <div>
        <p className="text-3xl font-semibold tracking-normal text-white sm:text-5xl">
          {name ? t("greetingWithName", { greeting: greeting || t("greetingFallback"), name }) : ""}
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
