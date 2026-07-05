"use client";

import { useEffect, useState } from "react";

function getGreeting(hour) {
  if (hour < 12) return "Buenos días";
  if (hour < 20) return "Buenas tardes";
  return "Buenas noches";
}

export default function HomeHero() {
  const [greeting, setGreeting] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    const now = new Date();
    setGreeting(getGreeting(now.getHours()));
    setToday(
      now.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
    );
  }, []);

  return (
    <header className="grid gap-5">
      <div>
        <p className="text-3xl font-semibold tracking-normal text-white sm:text-5xl">
          {greeting || "Hola"}, Edeiver 👋
        </p>
        <p className="mt-2 min-h-5 text-sm font-medium capitalize text-zinc-500">
          {today}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-zinc-200">
          Entrenamiento programado
        </span>
      </div>
    </header>
  );
}
