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

const uptimeData = [
  { time: "00:00", uptime: 99.9 },
  { time: "04:00", uptime: 99.8 },
  { time: "08:00", uptime: 98.5 },
  { time: "12:00", uptime: 99.2 },
  { time: "16:00", uptime: 99.9 },
  { time: "20:00", uptime: 99.7 },
  { time: "24:00", uptime: 99.8 },
];

const UptimeChart = () => (
  <Card className="bg-[#1f1f1f] border-gray-800/50">
    <CardHeader>{/* Title */}</CardHeader>
    <CardContent>
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
);
export default UptimeChart;
