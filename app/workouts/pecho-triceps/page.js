import AppShell from "@/components/ui/AppShell";
import PrimaryAction from "@/components/ui/PrimaryAction";
import SectionTitle from "@/components/ui/SectionTitle";
import Surface from "@/components/ui/Surface";
import ExerciseList from "@/components/workouts/ExerciseList";

const exercises = [
  "Press inclinado con mancuernas",
  "Press plano en máquina",
  "Aperturas en polea",
  "Fondos asistidos",
  "Extensión de tríceps en cuerda",
  "Press francés",
];

export default function WorkoutDetailPage() {
  return (
    <AppShell>
      <div className="grid gap-8 py-8">
        <SectionTitle
          eyebrow="Entrenamiento"
          title="Pecho + Tríceps"
          subtitle="Desarrollar pecho superior y brazos."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Surface>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">
              Duración estimada
            </p>
            <p className="mt-4 text-4xl font-semibold text-white">75 minutos</p>
          </Surface>

          <Surface>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">
              Objetivo
            </p>
            <p className="mt-4 text-xl leading-8 text-zinc-100">
              Desarrollar pecho superior y brazos.
            </p>
          </Surface>
        </div>

        <Surface>
          <h2 className="mb-5 text-xl font-semibold text-white">
            Lista de ejercicios
          </h2>
          <ExerciseList exercises={exercises} />
        </Surface>

        <PrimaryAction href="/workouts/pecho-triceps/exercise">
          Comenzar entrenamiento
        </PrimaryAction>
      </div>
    </AppShell>
  );
}
