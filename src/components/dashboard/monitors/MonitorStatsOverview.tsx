import { Card, CardContent } from "@/components/ui/card";
import { Activity, CheckCircle, AlertTriangle, Clock } from "lucide-react";

const MonitorStatsOverview = ({ monitors }: { monitors: any[] }) => {
  const total = monitors.length;
  const online = monitors.filter((m) => m.status === "up").length;
  const issues = monitors.filter((m) => m.status !== "up").length;
  const avgResponse =
    total > 0
      ? Math.round(monitors.reduce((sum, m) => sum + m.responseTime, 0) / total)
      : 0;

  const cards = [
    { label: "Total Monitors", value: total, icon: Activity },
    { label: "Online", value: online, icon: CheckCircle },
    { label: "Issues", value: issues, icon: AlertTriangle },
    { label: "Avg Response", value: `${avgResponse}ms`, icon: Clock },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon }) => (
        <Card key={label} className="bg-[#1f1f1f] border-gray-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">{label}</span>
              <Icon className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-2xl font-semibold text-white">{value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MonitorStatsOverview;
