"use client";
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useMonitors } from "@/hooks/useMonitors";
import MonitorCard from "./MonitorCard";
// import AddMonitorModal from "./AddMonitorModal";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import MonitorStatsOverview from "./MonitorStatsOverview";
const MonitorsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [, setIsAddModalOpen] = useState(false);

  const { data: monitors, isLoading, error } = useMonitors();
  console.log("Monitors data:", monitors);
  const filtered = monitors?.filter(
    (m) =>
      m.websiteName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.url?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <LoadingSpinner />;

  if (error)
    return (
      <Card className="bg-[#1f1f1f] border-gray-800/50">
        <CardContent className="p-6 text-center">
          <p className="text-red-400">Failed to load monitors</p>
        </CardContent>
      </Card>
    );

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">Monitors</h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage and monitor your services
            </p>
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Monitor
          </Button>
        </div>

        <MonitorStatsOverview monitors={monitors || []} />

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search monitors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered?.map((monitor) => (
            <MonitorCard key={monitor.id} monitor={monitor} />
          ))}
        </div>

        {filtered?.length === 0 && (
          <Card className="bg-[#1f1f1f] border-gray-800/50">
            <CardContent className="p-12 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">
                No monitors found
              </h3>
              <p className="text-gray-400 mb-4">
                {searchTerm
                  ? "Try adjusting your search."
                  : "Get started by adding your first monitor."}
              </p>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Monitor
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* <AddMonitorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      /> */}
    </>
  );
};

export default MonitorsList;
