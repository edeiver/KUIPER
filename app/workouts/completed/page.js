import AppShell from "@/components/ui/AppShell";
import PrimaryAction from "@/components/ui/PrimaryAction";
import Surface from "@/components/ui/Surface";
import EnergyScale from "@/components/workouts/EnergyScale";

export default function CompletedWorkoutPage() {
  return (
    <AppShell>
      <section className="grid min-h-[calc(100vh-48px)] content-center gap-8 py-8">
        <header className="text-center">
          <p className="text-5xl">🎉</p>
          <h1 className="mt-6 text-4xl font-semibold tracking-normal text-white sm:text-6xl">
            Excelente trabajo.
          </h1>
          <p className="mt-4 text-xl text-zinc-300">
            Entrenamiento completado.
          </p>
        </header>

        <Surface className="grid gap-7">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500">
              ¿Cómo estuvo la energía?
            </p>
            <EnergyScale />
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500">
              ¿Llegaste al fallo?
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-center font-semibold text-zinc-200">
                Sí
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-center font-semibold text-zinc-200">
                No
              </div>
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Comentarios
            </p>
            <div className="min-h-28 rounded-2xl border border-white/10 bg-black/20 p-4 text-zinc-500">
              Espacio para comentarios del entrenamiento.
            </div>
          </div>
        </Surface>

        <PrimaryAction>Guardar</PrimaryAction>
      </section>
    </AppShell>
  );
}
