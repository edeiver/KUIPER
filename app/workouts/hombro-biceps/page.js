import AppShell from "@/components/ui/AppShell";
import PrimaryAction from "@/components/ui/PrimaryAction";
import SectionTitle from "@/components/ui/SectionTitle";
import Surface from "@/components/ui/Surface";
import ExerciseList from "@/components/workouts/ExerciseList";
import { hombroBicepsPlan, getWorkoutSummary } from "@/data/workout-plans";

const exercises = hombroBicepsPlan.exercises.map((exercise) => exercise.name);
const summary = getWorkoutSummary(hombroBicepsPlan);

export default function WorkoutDetailPage() {
  return (
    <AppShell>
      <div className="grid gap-8 py-8">
        <SectionTitle
          eyebrow="Entrenamiento"
          title={summary.title}
          subtitle={summary.focus}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Surface>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">
              Duración estimada
            </p>
            <p className="mt-4 text-4xl font-semibold text-white">
              {summary.estimatedDurationMinutes} minutos
            </p>
          </Surface>

          <Surface>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">
              Objetivo
            </p>
            <p className="mt-4 text-xl leading-8 text-zinc-100">
              {summary.focus}
            </p>
          </Surface>
        </div>

        <Surface>
          <h2 className="mb-5 text-xl font-semibold text-white">
            Lista de ejercicios
          </h2>
          <ExerciseList exercises={exercises} />
        </Surface>

        <PrimaryAction href="/workouts/hombro-biceps/exercise">
          Comenzar entrenamiento
        </PrimaryAction>
      </div>
    </AppShell>
  );
}
