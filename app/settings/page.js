import AppShell from "@/components/ui/AppShell";
import SectionTitle from "@/components/ui/SectionTitle";
import DataBackupCard from "@/components/settings/DataBackupCard";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="grid gap-10 py-8 sm:gap-14 sm:py-14">
        <SectionTitle eyebrow="Ajustes" title="Tus datos" />

        <DataBackupCard />
      </div>
    </AppShell>
  );
}
