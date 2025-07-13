import OverviewCards from "@/components/dashboard/overview/OverviewCards";
import WorldMapSection from "@/components/dashboard/overview/DashboardSection";
import UptimeChart from "@/components/dashboard/overview/UptimeChart";
import MonitorsTable from "@/components/dashboard/overview/MonitorsTable";
import { useUptimeTrend } from "@/hooks/useDashboard";
import { useDashboardMetrics } from "@/hooks/useDashboard";
import { EmailVerificationBanner } from "@/components/dashboard/EmailVerificationBanner";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
const DashboardOverview = () => {
  const { data: uptimeData = [], isLoading } = useUptimeTrend();
  const { data: metrics, isLoading: metricLoading } = useDashboardMetrics();
  console.log("loading metrics", metricLoading);
  console.log("loading uptime data", isLoading);
  if (isLoading || metricLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <EmailVerificationBanner />

      <OverviewCards
        metrics={
          metrics || {
            overallUptime: null,
            averageResponseTime: null,
            activeMonitorsByRegion: {},
            totalIncidents: null,
          }
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WorldMapSection />
        <UptimeChart uptimeData={uptimeData} isLoading={isLoading} />
      </div>

      <MonitorsTable />
    </div>
  );
};

export default DashboardOverview;
