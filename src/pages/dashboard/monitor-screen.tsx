"use client";
import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Activity,
  Globe,
  Edit,
  Trash2,
  Play,
  Pause,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MonitorDetail } from "@/component/dashboard/monitor-detail";

// Mock data for monitors
const monitors = [
  {
    id: 1,
    name: "Main Website",
    url: "https://example.com",
    status: "up" as const,
    uptime: 99.9,
    responseTime: 120,
    type: "HTTP",
    interval: 5,
    lastChecked: "2024-01-15 14:32:15",
    regions: ["US East", "US West", "Europe"],
    incidents: 0,
  },
  {
    id: 2,
    name: "API Gateway",
    url: "https://api.example.com",
    status: "up" as const,
    uptime: 99.7,
    responseTime: 95,
    type: "HTTP",
    interval: 1,
    lastChecked: "2024-01-15 14:31:45",
    regions: ["US East", "Europe", "Asia"],
    incidents: 1,
  },
  {
    id: 3,
    name: "Database Server",
    url: "db.example.com:5432",
    status: "down" as const,
    uptime: 98.5,
    responseTime: 0,
    type: "TCP",
    interval: 5,
    lastChecked: "2024-01-15 14:30:22",
    regions: ["US East"],
    incidents: 3,
  },
  {
    id: 4,
    name: "CDN Endpoint",
    url: "https://cdn.example.com",
    status: "degraded" as const,
    uptime: 99.2,
    responseTime: 250,
    type: "HTTP",
    interval: 10,
    lastChecked: "2024-01-15 14:29:15",
    regions: ["Global"],
    incidents: 1,
  },
  {
    id: 5,
    name: "Auth Service",
    url: "https://auth.example.com",
    status: "up" as const,
    uptime: 99.8,
    responseTime: 85,
    type: "HTTP",
    interval: 5,
    lastChecked: "2024-01-15 14:32:00",
    regions: ["US East", "US West"],
    incidents: 0,
  },
  {
    id: 6,
    name: "Payment Gateway",
    url: "https://payments.example.com",
    status: "up" as const,
    uptime: 99.6,
    responseTime: 140,
    type: "HTTP",
    interval: 1,
    lastChecked: "2024-01-15 14:31:55",
    regions: ["US East", "Europe"],
    incidents: 2,
  },
];

export function MonitorsScreen() {
  const [selectedMonitor, setSelectedMonitor] = useState<
    (typeof monitors)[0] | null
  >(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredMonitors = monitors.filter((monitor) => {
    const matchesSearch =
      monitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      monitor.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || monitor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "up":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "down":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "degraded":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "up":
        return <CheckCircle className="w-3 h-3" />;
      case "down":
        return <XCircle className="w-3 h-3" />;
      case "degraded":
        return <AlertTriangle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  if (selectedMonitor) {
    return (
      <MonitorDetail
        monitor={selectedMonitor}
        onBack={() => setSelectedMonitor(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Monitors</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage and monitor your services
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Monitor
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#1f1f1f] border-gray-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Total Monitors</span>
              <Activity className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-2xl font-semibold text-white">
              {monitors.length}
            </div>
            <div className="text-xs text-gray-500 mt-1">Active monitoring</div>
          </CardContent>
        </Card>

        <Card className="bg-[#1f1f1f] border-gray-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Online</span>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-semibold text-white">
              {monitors.filter((m) => m.status === "up").length}
            </div>
            <div className="text-xs text-gray-500 mt-1">Services running</div>
          </CardContent>
        </Card>

        <Card className="bg-[#1f1f1f] border-gray-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Issues</span>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </div>
            <div className="text-2xl font-semibold text-white">
              {
                monitors.filter(
                  (m) => m.status === "down" || m.status === "degraded"
                ).length
              }
            </div>
            <div className="text-xs text-gray-500 mt-1">Need attention</div>
          </CardContent>
        </Card>

        <Card className="bg-[#1f1f1f] border-gray-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Avg Response</span>
              <Clock className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-2xl font-semibold text-white">
              {Math.round(
                monitors.reduce((acc, m) => acc + m.responseTime, 0) /
                  monitors.length
              )}
              ms
            </div>
            <div className="text-xs text-gray-500 mt-1">Global average</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
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
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 bg-gray-800/50 border-gray-700/50 text-white">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="up">Online</SelectItem>
            <SelectItem value="down">Offline</SelectItem>
            <SelectItem value="degraded">Degraded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Monitors List */}
      <div className="space-y-4">
        {filteredMonitors.map((monitor) => (
          <Card
            key={monitor.id}
            className="bg-[#1f1f1f] border-gray-800/50 hover:bg-gray-800/20 transition-colors duration-200 cursor-pointer"
            onClick={() => setSelectedMonitor(monitor)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="secondary"
                      className={getStatusColor(monitor.status)}
                    >
                      {getStatusIcon(monitor.status)}
                      {monitor.status.toUpperCase()}
                    </Badge>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {monitor.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{monitor.url}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-white">
                      {monitor.uptime}%
                    </div>
                    <div className="text-xs text-gray-500">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-white">
                      {monitor.responseTime > 0
                        ? `${monitor.responseTime}ms`
                        : "—"}
                    </div>
                    <div className="text-xs text-gray-500">Response</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-white">
                      {monitor.incidents}
                    </div>
                    <div className="text-xs text-gray-500">Incidents</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1">
                      <Globe className="h-3 w-3 text-gray-500" />
                      <span className="text-sm text-gray-400">
                        {monitor.regions.length}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">Regions</div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        e.stopPropagation()
                      }
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-white"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="bg-gray-800 border-gray-700"
                      align="end"
                    >
                      <DropdownMenuItem className="text-gray-300 hover:text-white">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Monitor
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-300 hover:text-white">
                        <Play className="h-4 w-4 mr-2" />
                        Test Now
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-300 hover:text-white">
                        <Pause className="h-4 w-4 mr-2" />
                        Pause Monitor
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-400 hover:text-red-300">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Monitor
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Quick Performance Indicators */}
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                <span>Type: {monitor.type}</span>
                <span>•</span>
                <span>Check every {monitor.interval}m</span>
                <span>•</span>
                <span>
                  Last checked:{" "}
                  {new Date(monitor.lastChecked).toLocaleTimeString()}
                </span>
                <span>•</span>
                <span>Regions: {monitor.regions.join(", ")}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMonitors.length === 0 && (
        <Card className="bg-[#1f1f1f] border-gray-800/50">
          <CardContent className="p-12 text-center">
            <Activity className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              No monitors found
            </h3>
            <p className="text-gray-400 mb-4">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Get started by adding your first monitor"}
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Monitor
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
