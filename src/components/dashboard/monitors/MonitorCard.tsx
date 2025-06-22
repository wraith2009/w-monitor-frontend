import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Globe,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const statusConfig = {
  up: { icon: CheckCircle, color: "text-green-400", label: "UP" },
  down: { icon: XCircle, color: "text-red-400", label: "DOWN" },
  degraded: {
    icon: AlertTriangle,
    color: "text-yellow-400",
    label: "DEGRADED",
  },
};

type MonitorStatus = "up" | "down" | "degraded";

interface Monitor {
  status: MonitorStatus;
  name: string;
  url: string;
  uptime: number;
  responseTime: number;
  regions?: string[];
}

const MonitorCard = ({ monitor }: { monitor: Monitor }) => {
  const {
    icon: Icon,
    color,
    label,
  } = statusConfig[monitor.status as MonitorStatus] || {};

  return (
    <Card className="bg-[#1f1f1f] border-gray-800/50 hover:bg-gray-800/20 transition-colors duration-200 cursor-pointer">
      <CardContent className="p-6 space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <Badge
              variant="secondary"
              className={`bg-gray-800 border ${color}`}
            >
              <Icon className="w-3 h-3 mr-1" />
              {label}
            </Badge>
            <div>
              <h3 className="text-white font-semibold text-lg">
                {monitor.name}
              </h3>
              <p className="text-sm text-gray-400">{monitor.url}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 border-gray-700">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Pause</DropdownMenuItem>
              <DropdownMenuItem className="text-red-400">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex justify-between text-sm text-gray-400 pt-2">
          <span>Uptime: {monitor.uptime}%</span>
          <span>Response: {monitor.responseTime}ms</span>
          <span>
            <Globe className="inline-block w-3 h-3 mr-1" />
            {monitor.regions && monitor.regions.length} Regions
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonitorCard;
