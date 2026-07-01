import AppShell from "@/components/ui/AppShell";
import PrimaryAction from "@/components/ui/PrimaryAction";
import Surface from "@/components/ui/Surface";
import ProgressMenu from "@/components/workouts/ProgressMenu";

export default function Home() {
  return (
    <AppShell>
      <section className="flex min-h-[calc(100vh-48px)] flex-col justify-between">
        <div className="pt-8 sm:pt-14">
          <p className="text-3xl font-semibold tracking-normal text-white sm:text-5xl">
            Buenos días, Edeiver 👋
          </p>

          <div className="mt-12">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-zinc-500">
              Proyecto activo
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-normal text-white sm:text-7xl">
              Proyecto Hércules
            </h1>
            <p className="mt-5 text-xl font-medium text-[#9fb7ff]">Semana 1</p>
          </div>

          <PrimaryAction href="/workouts/pecho-triceps" className="mt-12">
            ▶ Continuar entrenamiento
          </PrimaryAction>
        </div>

        <Surface className="mb-2 mt-12">
          <ProgressMenu />
        </Surface>
      </section>
    </AppShell>
  );
}
