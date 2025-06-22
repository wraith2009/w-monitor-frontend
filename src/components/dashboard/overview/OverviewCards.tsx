import { Activity, Clock, Shield, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const cards = [
  {
    title: "Overall Uptime",
    value: "99.7%",
    subtitle: "Last 30 days",
    icon: Activity,
  },
  {
    title: "Avg Response",
    value: "128ms",
    subtitle: "Global average",
    icon: Clock,
  },
  {
    title: "Active Monitors",
    value: "24",
    subtitle: "6 regions",
    icon: Shield,
  },
  {
    title: "Incidents",
    value: "2",
    subtitle: "Degraded regions",
    icon: AlertTriangle,
  },
];

const OverviewCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card key={index} className="bg-[#1f1f1f] border-gray-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">{card.title}</span>
              <card.icon className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-2xl font-semibold text-white">
              {card.value}
            </div>
            <div className="text-xs text-gray-500 mt-1">{card.subtitle}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OverviewCards;
