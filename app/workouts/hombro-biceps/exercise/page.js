import WorkoutSessionFlow from "@/components/workouts/WorkoutSessionFlow";
import { hombroBicepsPlan } from "@/data/workout-plans";

export default function ExercisePage() {
  return <WorkoutSessionFlow plan={hombroBicepsPlan} />;
}
