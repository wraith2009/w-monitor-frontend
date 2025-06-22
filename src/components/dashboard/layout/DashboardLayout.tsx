import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import DashboardOverview from "@/pages/dashboard/DashboardOverview";
import MonitorsPage from "../../../pages/dashboard/MonitorsPage";
// import IncidentsPage from "../../../pages/dashboard/IncidentsPage";
// import AnalyticsPage from "../../../pages/dashboard/AnalyticsPage";
// import SettingsPage from "../../../pages/dashboard/SettingsPage";

const DashboardLayout = () => {
  const [activeScreen, setActiveScreen] = useState("dashboard");

  const getBreadcrumbs = () => {
    switch (activeScreen) {
      case "monitors":
        return ["Dashboard", "Monitors"];
      case "incidents":
        return ["Dashboard", "Incidents"];
      case "analytics":
        return ["Dashboard", "Analytics"];
      case "settings":
        return ["Dashboard", "Settings"];
      default:
        return ["Dashboard", "Overview"];
    }
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
        <Sidebar activeScreen={activeScreen} onScreenChange={setActiveScreen} />

        <div className="flex-1 flex flex-col">
          <Header breadcrumbs={getBreadcrumbs()} />

          <main className="flex-1 p-6 relative z-10 bg-[#161616] text-white">
            <Routes>
              <Route index element={<DashboardOverview />} />
              <Route path="monitors" element={<MonitorsPage />} />
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
