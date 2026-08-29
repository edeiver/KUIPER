import AppShell from "@/components/ui/AppShell";
import SectionTitle from "@/components/ui/SectionTitle";
import ProgressStats from "@/components/progress/ProgressStats";
import ExerciseProgressExplorer from "@/components/progress/ExerciseProgressExplorer";
import SessionHistoryList from "@/components/progress/SessionHistoryList";

export default function ProgressPage() {
  return (
    <AppShell>
      <div className="grid gap-10 py-8 sm:gap-14 sm:py-14">
        <SectionTitle
          eyebrow="Progreso"
          title="Tu evolución"
          subtitle="Basado únicamente en las sesiones que has completado y guardado."
        />

        <ProgressStats />

        <ExerciseProgressExplorer />

        <SessionHistoryList />
      </div>
    </AppShell>
  );
}
