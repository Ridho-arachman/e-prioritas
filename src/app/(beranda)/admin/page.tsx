import ActivityList from "@/components/dashboard/ActivityList";
import ActivityStats from "@/components/dashboard/ActivityStats";
import ChartsSection from "@/components/dashboard/ChartsSection";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCards from "@/components/dashboard/StatsCard";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-white">
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
