import OverviewCards from "@/components/dashboard/overview/OverviewCards";
import WorldMapSection from "@/components/dashboard/overview/DashboardSection";
import UptimeChart from "@/components/dashboard/overview/UptimeChart";
import { MonitorRecipientSection } from "@/components/dashboard/monitors/monitorRecepientSection";
import {
  getMonitorStatsBySlug,
  getRegionStatsByMonitorSlug,
  getUptimeTrendByMonitorSlug,
  useMonitorBySlug,
} from "@/hooks/useMonitors";
import { useParams, useLocation } from "react-router-dom";

const MonitorPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const { data: monitor } = slug ? useMonitorBySlug(slug) : { data: null };
  console.log("Monitor data:", monitor);

  if (!slug) {
    return (
      <div className="text-red-500 text-center">Monitor slug is required</div>
    );
  }

  const { data: rawUptimeData, isLoading } = getUptimeTrendByMonitorSlug(slug);
  const { data: regionStat } = getRegionStatsByMonitorSlug(slug);

  const uptimeData = Array.isArray(rawUptimeData?.trend)
    ? rawUptimeData.trend
    : [];

  const { data: metrics, isLoading: metricsLoading } =
    getMonitorStatsBySlug(slug);

  const content = (
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
        <WorldMapSection regions={regionStat?.regionStats || []} />
        <UptimeChart uptimeData={uptimeData} isLoading={isLoading} />
      </div>

      {/* Emergency Contact Section - Only show in dashboard context */}
      {location.pathname.startsWith("/dashboard") && monitor && (
        <MonitorRecipientSection
          monitorId={monitor.id}
          alertRecipients={monitor.alertRecipients || []}
          monitorName={monitor.websiteName}
        />
      )}
    </div>
  );

  const isDashboardContext = location.pathname.startsWith("/dashboard");

  if (isDashboardContext) {
    return content;
  } else {
    return (
      <div className="min-h-screen w-full bg-[#161616] relative text-white p-4 md:p-8">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(64, 64, 64, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(64, 64, 64, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
          }}
        />
        <div className="relative z-10 mx-auto">{content}</div>
      </div>
    );
  }
};

export default MonitorPage;
