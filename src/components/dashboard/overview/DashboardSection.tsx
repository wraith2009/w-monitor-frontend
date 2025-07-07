import { Card, CardHeader, CardContent } from "@/components/ui/card";
import WorldMap from "@/components/ui/world-map";
import type { MonitorRegionStat } from "@/api/monitors";

export default function WorldMapSection({
  regions,
}: {
  regions?: MonitorRegionStat[];
}) {
  return (
    <Card className="bg-[#1f1f1f] border-gray-800/50">
      <CardHeader>
        <h2 className="text-lg font-semibold text-white">Global Uptime Map</h2>
      </CardHeader>
      <CardContent>
        <WorldMap apiData={regions} lineColor="#6b7280" />
      </CardContent>
    </Card>
  );
}
