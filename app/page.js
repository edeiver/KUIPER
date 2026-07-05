import AppShell from "@/components/ui/AppShell";
import HomeHero from "@/components/dashboard/HomeHero";
import QuickAccessGrid from "@/components/dashboard/QuickAccessGrid";
import RecentActivityList from "@/components/dashboard/RecentActivityList";
import StatsOverviewCard from "@/components/dashboard/StatsOverviewCard";
import TodayWorkoutCard from "@/components/dashboard/TodayWorkoutCard";

export default function Home() {
  return (
    <AppShell>
      <div className="grid gap-10 py-8 sm:gap-14 sm:py-14">
        <HomeHero />

        <TodayWorkoutCard />

        <StatsOverviewCard />

        <div className="grid gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Accesos rápidos
          </p>
          <QuickAccessGrid />
        </div>

        <RecentActivityList />
      </div>
    </AppShell>
  );
}
