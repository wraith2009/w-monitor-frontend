"use client";
import { useState } from "react";

interface RegionData {
  id: string;
  name: string;
  uptime: number;
  responseTime: number;
  x: number;
  y: number;
}

const regions: RegionData[] = [
  {
    id: "us-east",
    name: "US East",
    uptime: 99.9,
    responseTime: 120,
    x: 20,
    y: 40,
  },
  {
    id: "us-west",
    name: "US West",
    uptime: 99.7,
    responseTime: 95,
    x: 12,
    y: 45,
  },
  {
    id: "europe",
    name: "Europe",
    uptime: 99.8,
    responseTime: 85,
    x: 50,
    y: 35,
  },
  {
    id: "asia",
    name: "Asia Pacific",
    uptime: 99.6,
    responseTime: 140,
    x: 80,
    y: 45,
  },
  {
    id: "south-america",
    name: "South America",
    uptime: 99.4,
    responseTime: 180,
    x: 30,
    y: 70,
  },
];

export function WorldMap() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const getStatusColor = (uptime: number) => {
    if (uptime >= 99.8) return "bg-green-500";
    if (uptime >= 99.5) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden">
      {/* World Map SVG Background */}
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-full"
        style={{
          background:
            "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI1MDAiIHZpZXdCb3g9IjAgMCAxMDAwIDUwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgMTAwSDkwMFY0MDBIMTAwVjEwMFoiIGZpbGw9IiNFNUU3RUIiLz4KPC9zdmc+')",
        }}
      >
        {/* Simplified world map paths */}
        <g fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="0.5">
          {/* North America */}
          <path d="M50 150 L200 120 L250 180 L200 220 L100 200 Z" />
          {/* South America */}
          <path d="M180 280 L220 250 L240 320 L200 380 L160 350 Z" />
          {/* Europe */}
          <path d="M450 140 L520 130 L540 180 L480 190 Z" />
          {/* Africa */}
          <path d="M480 200 L540 190 L560 300 L500 320 Z" />
          {/* Asia */}
          <path d="M550 120 L750 100 L800 200 L700 220 L600 180 Z" />
          {/* Australia */}
          <path d="M720 300 L780 290 L790 320 L740 330 Z" />
        </g>
      </svg>

      {/* Region Markers */}
      {regions.map((region) => (
        <div
          key={region.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          style={{ left: `${region.x}%`, top: `${region.y}%` }}
          onMouseEnter={() => setHoveredRegion(region.id)}
          onMouseLeave={() => setHoveredRegion(null)}
        >
          <div
            className={`w-4 h-4 rounded-full ${getStatusColor(
              region.uptime
            )} shadow-lg animate-pulse`}
          />

          {/* Tooltip */}
          {hoveredRegion === region.id && (
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-10">
              <div className="font-medium">{region.name}</div>
              <div className="text-gray-300">Uptime: {region.uptime}%</div>
              <div className="text-gray-300">
                Response: {region.responseTime}ms
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
