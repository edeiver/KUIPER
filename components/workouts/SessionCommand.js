 "use client";

import PrimaryAction from "@/components/ui/PrimaryAction";

export default function SessionCommand({ exercise, onStartTraining }) {
  return (
    <section className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.06] shadow-[0_30px_90px_rgba(0,0,0,0.42)]">
      <div className="grid gap-6 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#9fb7ff]">
            Ahora
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white">
            {`Serie 1 · ${exercise.reps} reps`}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
            Usa un peso que te deje repeticiones en reserva según el RIR
            indicado. La repetición importa menos que el control.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:w-72">
          <div className="rounded-2xl bg-black/20 p-3 text-center">
            <p className="text-xs text-zinc-500">Peso</p>
            <p className="mt-1 text-lg font-semibold text-white">{`${exercise.weight} kg`}</p>
          </div>
          <div className="rounded-2xl bg-black/20 p-3 text-center">
            <p className="text-xs text-zinc-500">RIR</p>
            <p className="mt-1 text-lg font-semibold text-white">{exercise.rir}</p>
          </div>
          <div className="rounded-2xl bg-black/20 p-3 text-center">
            <p className="text-xs text-zinc-500">Tempo</p>
            <p className="mt-1 text-lg font-semibold text-white">{exercise.tempo}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 border-t border-white/8 bg-black/20 p-4 sm:grid-cols-[1fr_1fr]">
        <PrimaryAction onClick={onStartTraining}>Comenzar entrenamiento</PrimaryAction>
        <PrimaryAction href="#mi-entrenamiento">Ver plan de series</PrimaryAction>
      </div>
    </section>
  );
}
