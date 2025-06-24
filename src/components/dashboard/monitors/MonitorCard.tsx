import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Globe,
  Edit,
  Pause,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import type { Monitor, MonitorStatus } from "@/api/monitors";

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

const MonitorCard = ({ monitor }: { monitor: Monitor }) => {
  const { icon: Icon, color, label } = statusConfig[monitor.status ?? "down"];

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card className="bg-[#1f1f1f] border-gray-800/50 hover:bg-gray-800/20 transition-colors duration-200 group">
        <CardContent className="p-6 space-y-4">
          {/* Header Section */}
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <Badge
                  variant="secondary"
                  className={`bg-gray-800 border ${color} shrink-0`}
                >
                  {Icon && <Icon className="w-3 h-3 mr-1" />}
                  {label}
                </Badge>
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
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700/50"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle edit
                  }}
                >
                  <Edit className="h-3.5 w-3.5" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-yellow-400 hover:bg-gray-700/50"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle pause
                  }}
                >
                  <Pause className="h-3.5 w-3.5" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-red-400 hover:bg-gray-700/50"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle delete
                  }}
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
              <span className="text-white ml-1">{monitor.uptime ?? "--"}%</span>
            </span>
            <span className="flex items-center">
              Response:{" "}
              <span className="text-white ml-1">
                {monitor.responseTime ?? "--"}ms
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
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MonitorCard;
