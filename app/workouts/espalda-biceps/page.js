import AppShell from "@/components/ui/AppShell";
import PrimaryAction from "@/components/ui/PrimaryAction";
import SectionTitle from "@/components/ui/SectionTitle";
import Surface from "@/components/ui/Surface";
import ExerciseList from "@/components/workouts/ExerciseList";

const exercises = [
  "Jalón al pecho",
  "Jalón agarre cerrado (triángulo)",
  "Remo sentado en máquina",
  "Pullover en polea",
  "Curl predicador",
  "Curl martillo",
];

export default function WorkoutDetailPage() {
  return (
    <AppShell>
      <div className="grid gap-8 py-8">
        <SectionTitle
          eyebrow="Entrenamiento"
          title="Espalda + Bíceps"
          subtitle="Construir fuerza de tracción y densidad."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Surface>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">
              Duración estimada
            </p>
            <p className="mt-4 text-4xl font-semibold text-white">70 minutos</p>
          </Surface>

          <Surface>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">
              Objetivo
            </p>
            <p className="mt-4 text-xl leading-8 text-zinc-100">
              Construir fuerza de tracción y densidad.
            </p>
          </Surface>
        </div>

        <Surface>
          <h2 className="mb-5 text-xl font-semibold text-white">
            Lista de ejercicios
          </h2>
          <ExerciseList exercises={exercises} />
        </Surface>

        <PrimaryAction href="/workouts/espalda-biceps/exercise">
          Comenzar entrenamiento
        </PrimaryAction>
      </div>
    </AppShell>
  );
}
