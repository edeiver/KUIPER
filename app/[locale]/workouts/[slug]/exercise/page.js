import { notFound } from "next/navigation";
import WorkoutSessionFlow from "@/components/workouts/WorkoutSessionFlow";
import { getPlanBySlug } from "@/data/workout-plans";

export default async function ExercisePage({ params }) {
  const { locale, slug } = await params;
  const plan = getPlanBySlug(slug, locale);

  if (!plan) {
    notFound();
  }

  return <WorkoutSessionFlow plan={plan} />;
}
