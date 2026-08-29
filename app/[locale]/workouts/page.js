import { getTranslations } from "next-intl/server";
import AppShell from "@/components/ui/AppShell";
import SectionTitle from "@/components/ui/SectionTitle";
import WorkoutCard from "@/components/workouts/WorkoutCard";
import { getAllPlans, getWorkoutSummary } from "@/data/workout-plans";

export default async function WorkoutsPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations("workouts.list");

  const catalogWorkouts = getAllPlans(locale).map((plan) => {
    const summary = getWorkoutSummary(plan);

    return {
      title: summary.title,
      focus: summary.focus,
      duration: t("durationMinutes", { minutes: summary.estimatedDurationMinutes }),
      week: t("week"),
      href: `/workouts/${summary.slug}`,
    };
  });

  const workouts = [
    ...catalogWorkouts,
    {
      title: t("legPlaceholderTitle"),
      focus: t("legPlaceholderFocus"),
      week: t("week"),
      disabled: true,
    },
  ];

  return (
    <AppShell>
      <div className="grid gap-8 py-8">
        <SectionTitle eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <section className="grid gap-4 sm:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.title} {...workout} />
          ))}
        </section>
      </div>
    </AppShell>
  );
}
