"use client";

import Surface from "@/components/ui/Surface";

const activity = [
  { title: "Pecho + Tríceps", meta: "Hace 2 días · 24 series · 5.400 kg" },
  { title: "Espalda + Bíceps", meta: "Hace 5 días · 20 series · 6.100 kg" },
  { title: "Pecho + Tríceps", meta: "Hace 9 días · 22 series · 5.100 kg" },
];

export default function RecentActivityList() {
  return (
    <Surface className="grid gap-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
        Actividad reciente
      </p>
      <div className="grid gap-3">
        {activity.map((item) => (
          <div
            key={item.meta}
            className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.04] p-4"
          >
            <div>
              <p className="text-base font-semibold text-white">{item.title}</p>
              <p className="mt-1 text-sm text-zinc-500">{item.meta}</p>
            </div>
            <span className="text-zinc-600">›</span>
          </div>
        ))}
      </div>
    </Surface>
  );
}
