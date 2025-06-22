import OverviewCards from "@/components/dashboard/overview/OverviewCards";
import WorldMapSection from "@/components/dashboard/overview/DashboardSection";
import UptimeChart from "@/components/dashboard/overview/UptimeChart";
import MonitorsTable from "@/components/dashboard/overview/MonitorsTable";

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <OverviewCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WorldMapSection />
        <UptimeChart />
      </div>

      <MonitorsTable />
    </div>
  );
};

export default DashboardOverview;
