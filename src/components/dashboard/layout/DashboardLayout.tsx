import { useState, useEffect } from "react";
import { useLocation, Routes, Route, matchPath } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import DashboardOverview from "@/pages/dashboard/DashboardOverview";
import MonitorsListPage from "@/pages/dashboard/monitor/MonitorsListPage";
import MonitorPage from "@/pages/dashboard/monitor/MonitorPage";
import IncidentPage from "@/pages/dashboard/incidents/incidentPage";
import LogPage from "@/pages/dashboard/logs/logPage";
// import IncidentsPage from "@/pages/dashboard/IncidentsPage";
// import AnalyticsPage from "@/pages/dashboard/AnalyticsPage";
// import SettingsPage from "@/pages/dashboard/SettingsPage";

const breadcrumbMap = [
  {
    path: "/dashboard/monitors/:id",
    crumbs: ["Dashboard", "Monitors", "Monitor Details"],
  },
  { path: "/dashboard/monitors", crumbs: ["Dashboard", "Monitors"] },
  { path: "/dashboard/incidents", crumbs: ["Dashboard", "Incidents"] },
  { path: "/dashboard/analytics", crumbs: ["Dashboard", "Analytics"] },
  { path: "/dashboard/settings", crumbs: ["Dashboard", "Settings"] },
  { path: "/dashboard/logs", crumbs: ["Dashboard", "Logs  "] },
  { path: "/", crumbs: ["Dashboard", "Overview"] },
];

const getBreadcrumbs = (pathname: string) => {
  for (const route of breadcrumbMap) {
    if (matchPath(route.path, pathname)) return route.crumbs;
  }
  return ["Dashboard"];
};

const DashboardLayout = () => {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!mobile && !sidebarOpen) {
        setSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [sidebarOpen]);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    setSidebarOpen(!mobile); // Open on desktop, closed on mobile
  }, []);

  const toggleSidebar = () => {
    console.log("Toggling sidebar to ", !sidebarOpen);
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen w-full bg-[#161616] relative">
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
      <div className="min-h-screen flex">
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
          activeScreen={breadcrumbs[breadcrumbs.length - 1]}
          onScreenChange={(screen) => console.log("Screen changed to:", screen)}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            breadcrumbs={breadcrumbs}
            onToggleSidebar={toggleSidebar}
            sidebarOpen={sidebarOpen}
          />
          <main className="flex-1 p-4 md:p-6 relative z-10 bg-[#161616] text-white overflow-auto">
            <Routes>
              <Route index element={<DashboardOverview />} />
              <Route path="monitors" element={<MonitorsListPage />} />
              <Route path="monitors/:id" element={<MonitorPage />} />
              <Route path="incidents" element={<IncidentPage />} />
              <Route path="logs" element={<LogPage />} />
              {/* Uncomment these routes when ready */}
              {/* <Route path="incidents" element={<IncidentsPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="settings" element={<SettingsPage />} /> */}
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
