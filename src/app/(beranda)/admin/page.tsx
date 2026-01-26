import ActivityList from "@/components/sections/dashboard/ActivityList";
import ActivityStats from "@/components/sections/dashboard/ActivityStats";
import ChartsSection from "@/components/sections/dashboard/ChartsSection";
import DashboardHeader from "@/components/sections/dashboard/DashboardHeader";
import StatsCards from "@/components/sections/dashboard/StatsCard";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen p-6 bg-linear-to-br from-gray-50 to-white">
      <DashboardHeader />
      <StatsCards />
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <ActivityList />
        <ActivityStats />
      </div>
      <ChartsSection />
    </div>
  );
}
