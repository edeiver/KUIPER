"use client";

import Surface from "@/components/ui/Surface";

export default function LastSessionCard() {
  return (
    <Surface className="grid gap-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
        Última sesión
      </p>
      <div>
        <p className="text-2xl font-semibold text-white">Pecho + Tríceps</p>
        <p className="mt-1 text-sm text-zinc-400">Hace 2 días · 24 series</p>
      </div>
    </Surface>
  );
}
