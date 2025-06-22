import { Card, CardHeader, CardContent } from "@/components/ui/card";
import WorldMap from "@/components/ui/world-map";
import type { RegionData } from "@/components/ui/world-map";
const regions: RegionData[] = [
  {
    lat: 40.7128,
    lng: -74.006,
    label: "US East",
    uptime: 99.9,
    responseTime: 120,
    status: "up",
  },
  {
    lat: 37.7749,
    lng: -122.4194,
    label: "US West",
    uptime: 99.7,
    responseTime: 95,
    status: "up",
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    label: "Europe",
    uptime: 99.8,
    responseTime: 85,
    status: "up",
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    label: "Asia Pac",
    uptime: 98.2,
    responseTime: 140,
    status: "degraded",
  },
  {
    lat: -23.5505,
    lng: -46.6333,
    label: "S. America",
    uptime: 99.4,
    responseTime: 180,
    status: "up",
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    label: "Australia",
    uptime: 99.5,
    responseTime: 160,
    status: "up",
  },
];

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

export default function WorldMapSection() {
  return (
    <Card className="bg-[#1f1f1f] border-gray-800/50">
      <CardHeader>
        <h2 className="text-lg font-semibold text-white">Global Uptime Map</h2>
      </CardHeader>
      <CardContent>
        <WorldMap
          regions={regions}
          connections={connections}
          lineColor="#6b7280"
        />
      </CardContent>
    </Card>
  );
}
