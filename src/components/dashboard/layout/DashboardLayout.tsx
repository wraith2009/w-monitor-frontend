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
    <div className="min-h-screen bg-[#161616] flex">
      <Sidebar activeScreen={activeScreen} onScreenChange={setActiveScreen} />

      <div className="flex-1 flex flex-col">
        <Header breadcrumbs={getBreadcrumbs()} />

        <main className="flex-1 p-6">
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
  );
};

export default DashboardLayout;
