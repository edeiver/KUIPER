import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import AppShell from "@/components/ui/AppShell";
import PrimaryAction from "@/components/ui/PrimaryAction";
import SectionTitle from "@/components/ui/SectionTitle";
import Surface from "@/components/ui/Surface";
import ExerciseList from "@/components/workouts/ExerciseList";
import { getPlanBySlug, getWorkoutSummary } from "@/data/workout-plans";

export default async function WorkoutDetailPage({ params }) {
  const { locale, slug } = await params;
  const plan = getPlanBySlug(slug, locale);

  if (!plan) {
    notFound();
  }

  const t = await getTranslations("workouts.detail");
  const exercises = plan.exercises.map((exercise) => exercise.name);
  const summary = getWorkoutSummary(plan);

  return (
    <AppShell>
      <div className="grid gap-8 py-8">
        <SectionTitle eyebrow={t("eyebrow")} title={summary.title} subtitle={summary.focus} />

        <div className="grid gap-4 sm:grid-cols-2">
          <Surface>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">
              {t("estimatedDuration")}
            </p>
            <p className="mt-4 text-4xl font-semibold text-white">
              {t("minutes", { minutes: summary.estimatedDurationMinutes })}
            </p>
          </Surface>

          <Surface>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">
              {t("objective")}
            </p>
            <p className="mt-4 text-xl leading-8 text-zinc-100">{summary.focus}</p>
          </Surface>
        </div>

        <Surface>
          <h2 className="mb-5 text-xl font-semibold text-white">{t("exerciseListTitle")}</h2>
          <ExerciseList exercises={exercises} />
        </Surface>

        <PrimaryAction href={`/workouts/${plan.slug}/exercise`}>{t("startCta")}</PrimaryAction>
      </div>
    </AppShell>
  );
}
