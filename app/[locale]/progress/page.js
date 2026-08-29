import { getTranslations } from "next-intl/server";
import AppShell from "@/components/ui/AppShell";
import SectionTitle from "@/components/ui/SectionTitle";
import ProgressStats from "@/components/progress/ProgressStats";
import ExerciseProgressExplorer from "@/components/progress/ExerciseProgressExplorer";
import SessionHistoryList from "@/components/progress/SessionHistoryList";

export default async function ProgressPage() {
  const t = await getTranslations("progress");

  return (
    <AppShell>
      <div className="grid gap-10 py-8 sm:gap-14 sm:py-14">
        <SectionTitle eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <ProgressStats />

        <ExerciseProgressExplorer />

        <SessionHistoryList />
      </div>
    </AppShell>
  );
}
