"use client";
import { useState } from "react";
import {
  ArrowLeft,
  Settings,
  Clock,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Globe,
  Edit,
  Trash2,
  Play,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { WorldMap } from "@/components/ui/world-map";

interface MonitorDetailProps {
  monitor: {
    id: number;
    name: string;
    url: string;
    status: "up" | "down" | "degraded";
    uptime: number;
    responseTime: number;
    type: string;
    interval: number;
    lastChecked: string;
  };
  onBack: () => void;
}

// Mock data for detailed view
const uptimeHistory = [
  { time: "00:00", uptime: 100, responseTime: 120 },
  { time: "02:00", uptime: 100, responseTime: 115 },
  { time: "04:00", uptime: 99.8, responseTime: 125 },
  { time: "06:00", uptime: 100, responseTime: 110 },
  { time: "08:00", uptime: 98.5, responseTime: 0 },
  { time: "10:00", uptime: 99.2, responseTime: 140 },
  { time: "12:00", uptime: 100, responseTime: 118 },
  { time: "14:00", uptime: 100, responseTime: 122 },
  { time: "16:00", uptime: 100, responseTime: 108 },
  { time: "18:00", uptime: 99.9, responseTime: 130 },
  { time: "20:00", uptime: 100, responseTime: 115 },
  { time: "22:00", uptime: 100, responseTime: 125 },
];

const recentLogs = [
  {
    id: 1,
    timestamp: "2024-01-15 14:32:15",
    type: "error",
    message: "Connection timeout after 30s",
    duration: "30s",
  },
  {
    id: 2,
    timestamp: "2024-01-15 14:30:45",
    type: "recovery",
    message: "Service recovered",
    duration: "2m 30s",
  },
  {
    id: 3,
    timestamp: "2024-01-15 14:28:15",
    type: "warning",
    message: "High response time detected",
    duration: "45s",
  },
  {
    id: 4,
    timestamp: "2024-01-15 12:15:30",
    type: "info",
    message: "Scheduled maintenance completed",
    duration: "15m",
  },
  {
    id: 5,
    timestamp: "2024-01-15 10:45:22",
    type: "error",
    message: "SSL certificate validation failed",
    duration: "5m",
  },
];

const regionalData = [
  {
    lat: 40.7128,
    lng: -74.006,
    label: "US East",
    uptime: 99.9,
    responseTime: 120,
    status: "up" as const,
  },
  {
    lat: 37.7749,
    lng: -122.4194,
    label: "US West",
    uptime: 99.7,
    responseTime: 95,
    status: "up" as const,
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    label: "Europe",
    uptime: 99.8,
    responseTime: 85,
    status: "up" as const,
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    label: "Asia Pacific",
    uptime: 98.2,
    responseTime: 140,
    status: "degraded" as const,
  },
  {
    lat: -23.5505,
    lng: -46.6333,
    label: "South America",
    uptime: 99.4,
    responseTime: 180,
    status: "up" as const,
  },
];

export function MonitorDetail({ monitor, onBack }: MonitorDetailProps) {
  const [notifications, setNotifications] = useState(true);
  const [interval] = useState(monitor.interval.toString());

  //   const getStatusColor = (status: string) => {
  //     switch (status) {
  //       case "up":
  //         return "text-green-400";
  //       case "down":
  //         return "text-red-400";
  //       case "degraded":
  //         return "text-yellow-400";
  //       default:
  //         return "text-gray-400";
  //     }
  //   };

  const getLogTypeColor = (type: string) => {
    switch (type) {
      case "error":
        return "text-red-400 bg-red-500/10";
      case "warning":
        return "text-yellow-400 bg-yellow-500/10";
      case "recovery":
        return "text-green-400 bg-green-500/10";
      case "info":
        return "text-blue-400 bg-blue-500/10";
      default:
        return "text-gray-400 bg-gray-500/10";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-white">
              {monitor.name}
            </h1>
            <p className="text-gray-400 text-sm">{monitor.url}</p>
          </div>
          <Badge
            variant="secondary"
            className={`${
              monitor.status === "up"
                ? "bg-green-500/10 text-green-400"
                : monitor.status === "down"
                ? "bg-red-500/10 text-red-400"
                : "bg-yellow-500/10 text-yellow-400"
            }`}
          >
            {monitor.status === "up" ? (
              <CheckCircle className="w-3 h-3 mr-1" />
            ) : monitor.status === "down" ? (
              <XCircle className="w-3 h-3 mr-1" />
            ) : (
              <AlertTriangle className="w-3 h-3 mr-1" />
            )}
            {monitor.status.toUpperCase()}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 text-gray-400 hover:text-white"
          >
            <Play className="h-4 w-4 mr-2" />
            Test Now
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-700 text-gray-400 hover:text-white"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-red-700 text-red-400 hover:text-red-300"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#1f1f1f] border-gray-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Current Uptime</span>
              <Activity className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-2xl font-semibold text-white">
              {monitor.uptime}%
            </div>
            <div className="text-xs text-gray-500 mt-1">Last 30 days</div>
          </CardContent>
        </Card>

        <Card className="bg-[#1f1f1f] border-gray-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Response Time</span>
              <Clock className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-2xl font-semibold text-white">
              {monitor.responseTime}ms
            </div>
            <div className="text-xs text-gray-500 mt-1">Average</div>
          </CardContent>
        </Card>

        <Card className="bg-[#1f1f1f] border-gray-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Check Interval</span>
              <Settings className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-2xl font-semibold text-white">
              {monitor.interval}m
            </div>
            <div className="text-xs text-gray-500 mt-1">Minutes</div>
          </CardContent>
        </Card>

        <Card className="bg-[#1f1f1f] border-gray-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Last Checked</span>
              <Clock className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-lg font-semibold text-white">2m ago</div>
            <div className="text-xs text-gray-500 mt-1">
              {monitor.lastChecked}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-[#1f1f1f] border-gray-800/50">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-gray-800/60"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="performance"
            className="data-[state=active]:bg-gray-800/60"
          >
            Performance
          </TabsTrigger>
          <TabsTrigger
            value="logs"
            className="data-[state=active]:bg-gray-800/60"
          >
            Logs & Alerts
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-gray-800/60"
          >
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Regional Status Map */}
            <Card className="bg-[#1f1f1f] border-gray-800/50">
              <CardHeader className="border-b border-gray-800/30 pb-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <CardTitle className="text-lg font-semibold text-white">
                    Regional Status
                  </CardTitle>
                </div>
                <p className="text-gray-500 text-sm">
                  Monitor performance across regions
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <WorldMap regions={regionalData} lineColor="#6b7280" />
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-[#1f1f1f] border-gray-800/50">
              <CardHeader className="border-b border-gray-800/30 pb-4">
                <CardTitle className="text-lg font-semibold text-white">
                  Recent Activity
                </CardTitle>
                <p className="text-gray-500 text-sm">
                  Latest events and status changes
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {recentLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          getLogTypeColor(log.type).split(" ")[1]
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm">{log.message}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-gray-500 text-xs">
                            {log.timestamp}
                          </span>
                          <span className="text-gray-600 text-xs">•</span>
                          <span className="text-gray-500 text-xs">
                            {log.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#1f1f1f] border-gray-800/50">
              <CardHeader className="border-b border-gray-800/30 pb-4">
                <CardTitle className="text-lg font-semibold text-white">
                  Uptime Trend
                </CardTitle>
                <p className="text-gray-500 text-sm">
                  24-hour uptime percentage
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <ChartContainer
                  config={{
                    uptime: {
                      label: "Uptime %",
                      color: "#10b981",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={uptimeHistory}>
                      <XAxis
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#6B7280", fontSize: 12 }}
                      />
                      <YAxis
                        domain={[95, 100]}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#6B7280", fontSize: 12 }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f1f1f",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                          color: "#FFFFFF",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="uptime"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="bg-[#1f1f1f] border-gray-800/50">
              <CardHeader className="border-b border-gray-800/30 pb-4">
                <CardTitle className="text-lg font-semibold text-white">
                  Response Time
                </CardTitle>
                <p className="text-gray-500 text-sm">
                  24-hour response time trend
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <ChartContainer
                  config={{
                    responseTime: {
                      label: "Response Time (ms)",
                      color: "#6b7280",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={uptimeHistory}>
                      <XAxis
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#6B7280", fontSize: 12 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#6B7280", fontSize: 12 }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f1f1f",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                          color: "#FFFFFF",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="responseTime"
                        stroke="#6b7280"
                        strokeWidth={2}
                        dot={{ fill: "#6b7280", strokeWidth: 2, r: 3 }}
                        connectNulls={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card className="bg-[#1f1f1f] border-gray-800/50">
            <CardHeader className="border-b border-gray-800/30 pb-4">
              <CardTitle className="text-lg font-semibold text-white">
                Event Logs
              </CardTitle>
              <p className="text-gray-500 text-sm">
                Detailed log of all monitoring events
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800/30 hover:bg-transparent">
                    <TableHead className="text-gray-400 font-medium">
                      Timestamp
                    </TableHead>
                    <TableHead className="text-gray-400 font-medium">
                      Type
                    </TableHead>
                    <TableHead className="text-gray-400 font-medium">
                      Message
                    </TableHead>
                    <TableHead className="text-gray-400 font-medium">
                      Duration
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentLogs.map((log) => (
                    <TableRow
                      key={log.id}
                      className="border-gray-800/20 hover:bg-gray-800/20 transition-colors duration-200"
                    >
                      <TableCell className="text-gray-300 font-mono text-sm">
                        {log.timestamp}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={getLogTypeColor(log.type)}
                        >
                          {log.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white">
                        {log.message}
                      </TableCell>
                      <TableCell className="text-gray-300 font-mono text-sm">
                        {log.duration}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#1f1f1f] border-gray-800/50">
              <CardHeader className="border-b border-gray-800/30 pb-4">
                <CardTitle className="text-lg font-semibold text-white">
                  Monitor Configuration
                </CardTitle>
                <p className="text-gray-500 text-sm">Basic monitor settings</p>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="monitor-name" className="text-gray-300">
                    Monitor Name
                  </Label>
                  <Input
                    id="monitor-name"
                    defaultValue={monitor.name}
                    className="bg-gray-800/50 border-gray-700/50 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monitor-url" className="text-gray-300">
                    URL to Monitor
                  </Label>
                  <Input
                    id="monitor-url"
                    defaultValue={monitor.url}
                    className="bg-gray-800/50 border-gray-700/50 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="check-interval" className="text-gray-300">
                    Check Interval (minutes)
                  </Label>
                  <Select defaultValue={interval}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-700/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="1">1 minute</SelectItem>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1f1f1f] border-gray-800/50">
              <CardHeader className="border-b border-gray-800/30 pb-4">
                <CardTitle className="text-lg font-semibold text-white">
                  Notification Settings
                </CardTitle>
                <p className="text-gray-500 text-sm">
                  Configure alert preferences
                </p>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">Email Notifications</Label>
                    <p className="text-gray-500 text-sm">
                      Receive alerts via email
                    </p>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">SMS Alerts</Label>
                    <p className="text-gray-500 text-sm">
                      Critical alerts via SMS
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">Slack Integration</Label>
                    <p className="text-gray-500 text-sm">
                      Send alerts to Slack
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="pt-4">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
