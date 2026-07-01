 "use client";

export default function RestTimer() {
  return (
    <div className="grid gap-5 rounded-[28px] border border-[#9fb7ff]/20 bg-[#9fb7ff]/10 p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center">
      <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-[#08090b]">
        <div className="absolute inset-2 rounded-full border-[6px] border-white/10" />
        <div className="absolute inset-2 rounded-full border-[6px] border-[#9fb7ff] border-r-transparent border-t-transparent" />
        <div className="text-center">
          <p className="text-3xl font-semibold text-white">2:00</p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-500">
            Rest
          </p>
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#c8d5ff]">
          Temporizador de descanso
        </p>
        <p className="mt-3 text-sm leading-6 text-zinc-300">
          Recupera respiración, prepara la siguiente serie y mantén el objetivo
          de intensidad sin acelerar el ritmo.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:w-36 sm:grid-cols-1">
        <span className="rounded-full bg-white/10 px-3 py-2 text-center text-xs font-semibold text-zinc-300">
          +30s
        </span>
        <span className="rounded-full bg-white/10 px-3 py-2 text-center text-xs font-semibold text-zinc-300">
          Saltar
        </span>
        <span className="rounded-full bg-white/10 px-3 py-2 text-center text-xs font-semibold text-zinc-300">
          Listo
        </span>
      </div>
    </div>
  );
}
