import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import {
  ResponsiveContainer,
  LineChart,
  YAxis,
  XAxis,
  Tooltip,
  Line,
} from "recharts";
import { useState, useEffect } from "react";
import type { UptimeChartData } from "@/api/dashboard";

import { Skeleton } from "@/components/ui/skeleton";
const UptimeChart = ({
  uptimeData,
  isLoading,
}: {
  uptimeData: UptimeChartData[];
  isLoading: boolean;
}) => {
  const [animatedData, setAnimatedData] = useState<
    { hour: string; uptime: number }[]
  >([]);
  const [, setIsVisible] = useState(false);

  useEffect(() => {
    if (!uptimeData.length) return;

    // Replace null values with 0
    const processedData = uptimeData.map((point) => ({
      hour: point.hour,
      uptime: point.uptime ?? 0, // Replace null with 0
    }));

    if (processedData.length === 0) {
      setAnimatedData([]);
      return;
    }

    setIsVisible(true);
    setAnimatedData([]); // Reset before animation

    // Animate data points appearing one by one
    processedData.forEach((point, index) => {
      setTimeout(() => {
        setAnimatedData((prev) => [...prev, point]);
      }, index * 150);
    });

    // Cleanup function to clear timeouts if component unmounts
    return () => {
      setAnimatedData([]);
    };
  }, [uptimeData, isLoading]);

  // Calculate stats from valid data only
  const validUptimeData = uptimeData.filter(
    (point) => point.uptime !== null && point.uptime !== undefined
  );
  const averageUptime =
    validUptimeData.length > 0
      ? (
          validUptimeData.reduce((sum, point) => sum + point.uptime!, 0) /
          validUptimeData.length
        ).toFixed(1)
      : "N/A";
  const minimumUptime =
    validUptimeData.length > 0
      ? Math.min(...validUptimeData.map((point) => point.uptime!)).toFixed(1)
      : "N/A";

  return (
    <Card className="bg-[#1f1f1f] border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <h3 className="text-sm font-medium text-gray-600">System Uptime</h3>
        </div>
      </CardHeader>
      <CardContent className="pt-0 flex flex-col gap-4 justify-between">
        {isLoading ? (
          <div className="flex flex-col space-y-4">
            <Skeleton className="h-[200px] w-full rounded-md" />
            <div className="flex justify-between">
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-6 w-20 rounded-md" />
            </div>
          </div>
        ) : uptimeData.length === 0 ? (
          <div className="h-[200px] flex items-center justify-center">
            <div className="text-gray-500">No uptime data available</div>
          </div>
        ) : (
          <ChartContainer
            config={{
              uptime: {
                label: "Uptime %",
                color: "#10b981",
              },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={animatedData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#34d399" stopOpacity="0.8" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <XAxis
                  dataKey="hour"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 11, fontWeight: 500 }}
                  tickMargin={8}
                />
                <YAxis
                  domain={["dataMin - 0.5", "dataMax + 0.5"]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 11, fontWeight: 500 }}
                  tickMargin={8}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                    color: "#374151",
                    fontSize: "12px",
                    fontWeight: "500",
                    backdropFilter: "blur(10px)",
                  }}
                  labelStyle={{ color: "#6b7280", marginBottom: "4px" }}
                  formatter={(value) => [`${value}%`, "Uptime"]}
                  animationDuration={200}
                />
                <Line
                  type="monotone"
                  dataKey="uptime"
                  stroke="url(#lineGradient)"
                  strokeWidth={3}
                  dot={{
                    fill: "#10b981",
                    strokeWidth: 0,
                    r: 4,
                    className: "animate-pulse",
                  }}
                  activeDot={{
                    r: 6,
                    fill: "#10b981",
                    stroke: "#ffffff",
                    strokeWidth: 3,
                    filter: "url(#glow)",
                    className: "drop-shadow-lg",
                  }}
                  animationDuration={800}
                  animationEasing="ease-in-out"
                  connectNulls={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}

        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
          <div className="text-center">
            <div className="text-xs text-gray-500">Average</div>
            <div className="text-sm font-semibold text-gray-700">
              {averageUptime}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500">Minimum</div>
            <div className="text-sm font-semibold text-gray-700">
              {minimumUptime}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500">Status</div>
            <div className="text-sm font-semibold text-emerald-600 flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
              {validUptimeData.length > 0 ? "Healthy" : "No Data"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UptimeChart;
