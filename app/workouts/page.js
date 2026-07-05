import AppShell from "@/components/ui/AppShell";
import SectionTitle from "@/components/ui/SectionTitle";
import WorkoutCard from "@/components/workouts/WorkoutCard";
import { ALL_PLANS, getWorkoutSummary } from "@/data/workout-plans";

const catalogWorkouts = ALL_PLANS.map((plan) => {
  const summary = getWorkoutSummary(plan);

  return {
    title: summary.title,
    focus: summary.focus,
    duration: `${summary.estimatedDurationMinutes} min`,
    week: "Semana 1",
    href: `/workouts/${summary.slug}`,
  };
});

const workouts = [
  ...catalogWorkouts,
  {
    title: "Pierna",
    focus: "Base de fuerza, control y volumen.",
    week: "Semana 1",
    disabled: true,
  },
];

export default function WorkoutsPage() {
  return (
    <AppShell>
      <div className="grid gap-8 py-8">
        <SectionTitle
          eyebrow="Entrenamientos"
          title="Semana 1"
          subtitle="Sesiones preparadas para mantener foco, intensidad y progresión."
        />

        <section className="grid gap-4 sm:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.title} {...workout} />
          ))}
        </section>
      </div>
    </AppShell>
  );
}
