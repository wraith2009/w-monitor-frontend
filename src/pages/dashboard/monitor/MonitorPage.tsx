import OverviewCards from "@/components/dashboard/overview/OverviewCards";
import WorldMapSection from "@/components/dashboard/overview/DashboardSection";
import UptimeChart from "@/components/dashboard/overview/UptimeChart";
import {
  getMonitorStatsBySlug,
  // getRegionStatsByMonitorId,
  getUptimeTrendByMonitorId,
} from "@/hooks/useMonitors";
import { useParams } from "react-router-dom";
const MonitorPage = () => {
  let { id, slug } = useParams<{ id: string; slug: string }>();
  if (!id && !slug) {
    return (
      <div className="text-red-500 text-center">
        Monitor ID & slug are required
      </div>
    );
  }
  const monitorId = parseInt(id!, 10);
  const { data: rawUptimeData, isLoading } =
    getUptimeTrendByMonitorId(monitorId);
  const uptimeData = Array.isArray(rawUptimeData?.trend)
    ? rawUptimeData.trend
    : [];
  const { data: metrics, isLoading: metricsLoading } = getMonitorStatsBySlug(
    slug!
  );
  return (
    <div className="space-y-6">
      {metricsLoading && (
        <div className="text-gray-500 text-center">
          Loading dashboard metrics...
        </div>
      )}
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
    </div>
  );
};

export default MonitorPage;
