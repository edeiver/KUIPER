import { getTranslations } from "next-intl/server";
import AppShell from "@/components/ui/AppShell";
import SectionTitle from "@/components/ui/SectionTitle";
import DataBackupCard from "@/components/settings/DataBackupCard";

export default async function SettingsPage() {
  const t = await getTranslations("settings");

  return (
    <AppShell>
      <div className="grid gap-10 py-8 sm:gap-14 sm:py-14">
        <SectionTitle eyebrow={t("eyebrow")} title={t("title")} />

        <DataBackupCard />
      </div>
    </AppShell>
  );
}
