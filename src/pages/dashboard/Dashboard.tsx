"use client";
import {
  Bell,
  User,
  Activity,
  Clock,
  Shield,
  AlertTriangle,
  TrendingUp,
  Settings,
  LogOut,
  BarChart3,
  AlertCircle,
  CheckCircle,
  XCircle,
  Search,
  ChevronRight,
  Globe,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { WorldMap } from "@/components/ui/world-map";
// Mock data for the dashboard
const uptimeData = [
  { time: "00:00", uptime: 99.9 },
  { time: "04:00", uptime: 99.8 },
  { time: "08:00", uptime: 98.5 },
  { time: "12:00", uptime: 99.2 },
  { time: "16:00", uptime: 99.9 },
  { time: "20:00", uptime: 99.7 },
  { time: "24:00", uptime: 99.8 },
];

const monitors = [
  {
    id: 1,
    name: "API Gateway",
    url: "api.example.com",
    status: "up",
    uptime: 99.9,
    responseTime: 120,
  },
  {
    id: 2,
    name: "Database",
    url: "db.example.com",
    status: "down",
    uptime: 98.5,
    responseTime: 0,
  },
  {
    id: 3,
    name: "CDN",
    url: "cdn.example.com",
    status: "up",
    uptime: 99.8,
    responseTime: 85,
  },
  {
    id: 4,
    name: "Auth Service",
    url: "auth.example.com",
    status: "up",
    uptime: 99.7,
    responseTime: 95,
  },
  {
    id: 5,
    name: "Payment API",
    url: "pay.example.com",
    status: "up",
    uptime: 99.6,
    responseTime: 140,
  },
];

const menuItems = [
  { title: "Dashboard", icon: BarChart3, isActive: true },
  { title: "Monitors", icon: Activity },
  { title: "Incidents", icon: AlertCircle },
  { title: "Analytics", icon: TrendingUp },
  { title: "Settings", icon: Settings },
];
const regions = [
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
    uptime: 97.8,
    responseTime: 180,
    status: "degraded" as const,
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    label: "Australia",
    uptime: 99.5,
    responseTime: 160,
    status: "up" as const,
  },
];

// Connection lines between regions
const connections = [
  {
    start: { lat: 40.7128, lng: -74.006 },
    end: { lat: 51.5074, lng: -0.1278 },
  },
  {
    start: { lat: 37.7749, lng: -122.4194 },
    end: { lat: 35.6762, lng: 139.6503 },
  },
  {
    start: { lat: 51.5074, lng: -0.1278 },
    end: { lat: 35.6762, lng: 139.6503 },
  },
];

function Sidebar() {
  return (
    <div className="w-64 bg-[#161616] border-r border-gray-800/30 flex flex-col">
      {/* User Profile Section */}
      <div className="p-6 border-b border-gray-800/30">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-gray-700 text-gray-300">
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-white text-sm">Admin User</div>
            <div className="text-gray-500 text-xs">admin@company.com</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-gray-800/50 border-gray-700/50 text-gray-300 placeholder-gray-500 focus:border-gray-600 h-9 text-sm"
          />
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.title}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                item.isActive
                  ? "bg-gray-800/60 text-white"
                  : "text-gray-400 hover:bg-gray-800/40 hover:text-white"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </button>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800/30">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-400 hover:bg-gray-800/40 hover:text-white transition-colors duration-200">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}

export function Dashboard() {
  return (
    <div className="min-h-screen bg-[#161616] flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Top Navigation - Sleek and Connected */}
        <header className="bg-[#161616] border-b border-gray-800/30 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Dashboard</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white">Overview</span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-gray-800/40 relative rounded-md h-8 w-8"
              >
                <Bell className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 h-2 w-2 bg-purple-500 rounded-full"></div>
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-gray-700 text-gray-300 text-xs">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-[#1f1f1f] border-gray-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Overall Uptime</span>
                  <Activity className="h-4 w-4 text-gray-500" />
                </div>
                <div className="text-2xl font-semibold text-white">99.7%</div>
                <div className="text-xs text-gray-500 mt-1">Last 30 days</div>
              </CardContent>
            </Card>

            <Card className="bg-[#1f1f1f] border-gray-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Avg Response</span>
                  <Clock className="h-4 w-4 text-gray-500" />
                </div>
                <div className="text-2xl font-semibold text-white">128ms</div>
                <div className="text-xs text-gray-500 mt-1">Global average</div>
              </CardContent>
            </Card>

            <Card className="bg-[#1f1f1f] border-gray-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Active Monitors</span>
                  <Shield className="h-4 w-4 text-gray-500" />
                </div>
                <div className="text-2xl font-semibold text-white">24</div>
                <div className="text-xs text-gray-500 mt-1">5 regions</div>
              </CardContent>
            </Card>

            <Card className="bg-[#1f1f1f] border-gray-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Incidents</span>
                  <AlertTriangle className="h-4 w-4 text-gray-500" />
                </div>
                <div className="text-2xl font-semibold text-white">1</div>
                <div className="text-xs text-gray-500 mt-1">Active now</div>
              </CardContent>
            </Card>
          </div>

          {/* World Map and Chart Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* World Map */}
            <Card className="bg-[#1f1f1f] border-gray-800/50">
              <CardHeader className="border-b border-gray-800/30 pb-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <CardTitle className="text-lg font-semibold text-white">
                    Global Status
                  </CardTitle>
                </div>
                <p className="text-gray-500 text-sm">
                  Hover over regions to see detailed metrics
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <WorldMap
                  regions={regions}
                  dots={connections}
                  lineColor="#6b7280"
                />
              </CardContent>
            </Card>

            {/* Uptime Chart */}
            <Card className="bg-[#1f1f1f] border-gray-800/50">
              <CardHeader className="border-b border-gray-800/30 pb-4">
                <CardTitle className="text-lg font-semibold text-white">
                  24h Uptime Trend
                </CardTitle>
                <p className="text-gray-500 text-sm">
                  System performance over time
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <ChartContainer
                  config={{
                    uptime: {
                      label: "Uptime %",
                      color: "#9CA3AF",
                    },
                  }}
                  className="h-[280px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={uptimeData}>
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
                      <Line
                        type="monotone"
                        dataKey="uptime"
                        stroke="#9CA3AF"
                        strokeWidth={2}
                        dot={{ fill: "#9CA3AF", strokeWidth: 2, r: 3 }}
                        activeDot={{ r: 5, fill: "#9CA3AF" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Monitors Table */}
          <Card className="bg-[#1f1f1f] border-gray-800/50">
            <CardHeader className="border-b border-gray-800/30 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-white">
                    Monitor Status
                  </CardTitle>
                  <p className="text-gray-500 text-sm mt-1">
                    Current status of all monitored services
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-400 hover:bg-gray-800/40 hover:text-white"
                >
                  Add Monitor
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800/30 hover:bg-transparent">
                    <TableHead className="text-gray-400 font-medium">
                      Service
                    </TableHead>
                    <TableHead className="text-gray-400 font-medium">
                      URL
                    </TableHead>
                    <TableHead className="text-gray-400 font-medium">
                      Status
                    </TableHead>
                    <TableHead className="text-gray-400 font-medium">
                      Uptime
                    </TableHead>
                    <TableHead className="text-gray-400 font-medium">
                      Response Time
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monitors.map((monitor) => (
                    <TableRow
                      key={monitor.id}
                      className="border-gray-800/20 hover:bg-gray-800/20 transition-colors duration-200"
                    >
                      <TableCell className="text-white font-medium">
                        {monitor.name}
                      </TableCell>
                      <TableCell className="text-gray-400 font-mono text-sm">
                        {monitor.url}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            monitor.status === "up"
                              ? "bg-gray-700/50 text-gray-300"
                              : "bg-gray-600/50 text-gray-200"
                          }
                        >
                          {monitor.status === "up" ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <XCircle className="w-3 h-3 mr-1" />
                          )}
                          {monitor.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {monitor.uptime}%
                      </TableCell>
                      <TableCell className="text-gray-300 font-mono text-sm">
                        {monitor.responseTime > 0
                          ? `${monitor.responseTime}ms`
                          : "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
