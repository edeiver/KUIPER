import AppShell from "@/components/ui/AppShell";
import SectionTitle from "@/components/ui/SectionTitle";
import WorkoutCard from "@/components/workouts/WorkoutCard";

const workouts = [
  {
    title: "Pecho + Tríceps",
    focus: "Desarrollar pecho superior y brazos.",
    duration: "75 min",
    week: "Semana 1",
    href: "/workouts/pecho-triceps",
  },
  {
    title: "Espalda + Bíceps",
    focus: "Construir fuerza de tracción y densidad.",
    duration: "70 min",
    week: "Semana 1",
    href: "/workouts/espalda-biceps",
  },
  {
    title: "Pierna",
    focus: "Base de fuerza, control y volumen.",
    duration: "80 min",
    week: "Semana 1",
    href: "/workouts/pecho-triceps",
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
