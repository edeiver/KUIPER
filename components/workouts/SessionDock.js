 "use client";

export default function SessionDock() {
  return (
    <div className="fixed inset-x-0 bottom-4 z-20 px-4">
      <div className="mx-auto grid max-w-[430px] grid-cols-[1fr_auto] items-center gap-3 rounded-[28px] border border-white/10 bg-[#111218]/90 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:max-w-3xl">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">
            Serie 1 · 24 kg · RIR 2
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Baja lento. Mantén hombros fijos.
          </p>
        </div>
        <button
          type="button"
          className="min-h-12 rounded-full bg-white px-5 text-sm font-semibold text-[#08090b]"
        >
          Completar
        </button>
      </div>
    </div>
  );
}
