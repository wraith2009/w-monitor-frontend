import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Globe,
  Edit,
  Pause,
  Play,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Monitor, MonitorStatus } from "@/api/monitors";
import { useUpdateMonitor, useDeleteMonitor } from "@/hooks/useMonitors";
import { Link } from "react-router-dom";

const statusConfig: Record<
  MonitorStatus,
  {
    icon: React.ElementType;
    color: string;
    label: string;
  }
> = {
  up: { icon: CheckCircle, color: "text-green-400", label: "UP" },
  down: { icon: XCircle, color: "text-red-400", label: "DOWN" },
  degraded: {
    icon: AlertTriangle,
    color: "text-yellow-400",
    label: "DEGRADED",
  },
};

interface MonitorCardProps {
  monitor: Monitor;
  onEdit?: (monitor: Monitor) => void;
  onDelete?: (monitor: Monitor) => void;
}

const MonitorCard = ({ monitor, onEdit, onDelete }: MonitorCardProps) => {
  const [isPaused, setIsPaused] = useState(monitor.isPaused || false);
  const [isUpdating, setIsUpdating] = useState(false);
  const updateMonitor = useUpdateMonitor();
  const deleteMonitor = useDeleteMonitor();
  const handleTogglePause = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isUpdating) return;

    setIsUpdating(true);

    try {
      const payload = {
        id: monitor.id,
        websiteName: monitor.websiteName,
        url: monitor.url,
        method: monitor.method || "GET",
        expectedStatus: monitor.expectedStatus || 200,
        interval: monitor.interval || 60,
        timeout: monitor.timeout || 5000,
        regions: monitor.regions || [],
        isPaused: !isPaused,
      };

      await updateMonitor.mutateAsync(payload);
      setIsPaused(!isPaused);
    } catch (error) {
      console.error("Failed to toggle monitor pause state:", error);
    } finally {
      setIsUpdating(false);
    }
  };
  const handleDeleteMonitor = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      await deleteMonitor.mutateAsync(monitor.id.toString());
      onDelete?.(monitor);
    } catch (error) {
      console.error("Failed to delete monitor:", error);
    } finally {
      setIsUpdating(false);
    }
  };
  // Determine status based on pause state
  const currentStatus = isPaused ? "degraded" : monitor.status ?? "down";
  const { icon: Icon, color, label } = statusConfig[currentStatus];
  const displayLabel = isPaused ? "PAUSED" : label;

  const handleEdit = (e: React.MouseEvent) => {
    console.log("Edit monitor:", monitor);
    e.stopPropagation();
    onEdit?.(monitor);
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Link to={`/dashboard/monitors/${monitor.id}`}>
        <Card
          className={`bg-[#1f1f1f] border-gray-800/50 hover:bg-gray-800/20 transition-colors duration-200 group ${
            isPaused ? "opacity-70" : ""
          }`}
        >
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <Badge
                    variant="secondary"
                    className={`bg-gray-800 border ${
                      isPaused ? "text-yellow-400" : color
                    } shrink-0`}
                  >
                    {Icon && <Icon className="w-3 h-3 mr-1" />}
                    {displayLabel}
                  </Badge>
                  {isPaused && (
                    <Badge
                      variant="outline"
                      className="text-xs text-gray-400 border-gray-600"
                    >
                      Monitoring Paused
                    </Badge>
                  )}
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">
                  {monitor.websiteName}
                </h3>
                <p className="text-sm text-gray-400 break-all line-clamp-1">
                  {monitor.url}
                </p>
              </div>

              {/* Action Buttons - Hidden by default, shown on hover */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700/50"
                    onClick={handleEdit}
                    title="Edit Monitor"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 w-8 p-0 text-gray-400 hover:bg-gray-700/50 ${
                      isPaused
                        ? "hover:text-green-400"
                        : "hover:text-yellow-400"
                    } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={handleTogglePause}
                    disabled={isUpdating}
                    title={isPaused ? "Resume Monitoring" : "Pause Monitoring"}
                  >
                    {isUpdating ? (
                      <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    ) : isPaused ? (
                      <Play className="h-3.5 w-3.5" />
                    ) : (
                      <Pause className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-gray-400 hover:text-red-400 hover:bg-gray-700/50"
                    onClick={handleDeleteMonitor}
                    title="Delete Monitor"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="flex justify-between text-sm text-gray-400 pt-2 border-t border-gray-800/50">
              <span className="flex items-center">
                Uptime:{" "}
                <span
                  className={`ml-1 ${
                    isPaused ? "text-gray-500" : "text-white"
                  }`}
                >
                  {isPaused ? "--" : `${monitor.uptime ?? "--"}%`}
                </span>
              </span>
              <span className="flex items-center">
                Response:{" "}
                <span
                  className={`ml-1 ${
                    isPaused ? "text-gray-500" : "text-white"
                  }`}
                >
                  {isPaused ? "--" : `${monitor.responseTime ?? "--"}ms`}
                </span>
              </span>
              <span className="flex items-center">
                <Globe className="w-3 h-3 mr-1" />
                <span className="text-white">
                  {monitor.regions?.length ?? 0}
                </span>{" "}
                Regions
              </span>
            </div>

            {/* Pause Status Indicator */}
            {isPaused && (
              <div className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded border border-yellow-400/20">
                <Pause className="w-3 h-3 inline mr-1" />
                This monitor is currently paused and not being checked
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default MonitorCard;
