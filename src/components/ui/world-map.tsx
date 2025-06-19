"use client";

import type React from "react";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";
import { useTheme } from "next-themes";

interface RegionData {
  lat: number;
  lng: number;
  label: string;
  uptime: number;
  responseTime: number;
  status: "up" | "down" | "degraded";
}

interface MapProps {
  regions?: RegionData[];
  lineColor?: string;
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
}

export function WorldMap({
  regions = [],
  lineColor = "#0ea5e9",
  dots = [],
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredRegion, setHoveredRegion] = useState<RegionData | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const map = new DottedMap({ height: 100, grid: "diagonal" });

  const { theme } = useTheme();

  const svgMap = map.getSVG({
    radius: 0.22,
    color: theme === "dark" ? "#FFFFFF20" : "#00000040",
    shape: "circle",
    backgroundColor: theme === "dark" ? "#161616" : "white",
  });

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const getStatusColor = (status: string, uptime: number) => {
    if (status === "down") return "#ef4444"; // red
    if (status === "degraded" || uptime < 99.5) return "#f59e0b"; // yellow
    return "#10b981"; // green
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  };

  const handleRegionHover = (region: RegionData, event: React.MouseEvent) => {
    setHoveredRegion(region);
    handleMouseMove(event);
  };

  const handleRegionLeave = () => {
    setHoveredRegion(null);
  };

  return (
    <div
      ref={containerRef}
      className="w-full aspect-[2/1] bg-[#161616] rounded-lg relative font-sans overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />

      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 select-none"
      >
        {/* Connection lines */}
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  duration: 1,
                  delay: 0.5 * i,
                  ease: "easeOut",
                }}
                className="pointer-events-none"
              />
            </g>
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Connection dots */}
        {dots.map((dot, i) => (
          <g key={`points-group-${i}`} className="pointer-events-none">
            <g key={`start-${i}`}>
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="2"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="2"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2"
                  to="8"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
            <g key={`end-${i}`}>
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="2"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="2"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2"
                  to="8"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        ))}

        {/* Region status indicators */}
        {regions.map((region, i) => {
          const point = projectPoint(region.lat, region.lng);
          const statusColor = getStatusColor(region.status, region.uptime);

          return (
            <g key={`region-${i}`}>
              {/* Invisible larger circle for better hover detection */}
              <circle
                cx={point.x}
                cy={point.y}
                r="12"
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={(e) => handleRegionHover(region, e)}
                onMouseLeave={handleRegionLeave}
                onMouseMove={handleMouseMove}
              />

              {/* Main status circle */}
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill={statusColor}
                className="pointer-events-none"
              />

              {/* Pulsing animation for active regions */}
              {region.status === "up" && (
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill={statusColor}
                  opacity="0.6"
                  className="pointer-events-none"
                >
                  <animate
                    attributeName="r"
                    from="4"
                    to="12"
                    dur="2s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.6"
                    to="0"
                    dur="2s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* Warning pulse for degraded regions */}
              {region.status === "degraded" && (
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill={statusColor}
                  opacity="0.8"
                  className="pointer-events-none"
                >
                  <animate
                    attributeName="r"
                    from="4"
                    to="10"
                    dur="1s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.8"
                    to="0"
                    dur="1s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredRegion && (
        <div
          className="absolute z-10 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm shadow-lg pointer-events-none border border-gray-700"
          style={{
            left:
              mousePosition.x > 400
                ? mousePosition.x - 10
                : mousePosition.x + 10,
            top: mousePosition.y - 10,
            transform: mousePosition.x > 400 ? "translateX(-100%)" : "none",
          }}
        >
          <div className="font-semibold text-white">{hoveredRegion.label}</div>
          <div className="text-gray-300 mt-1">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: getStatusColor(
                    hoveredRegion.status,
                    hoveredRegion.uptime
                  ),
                }}
              />
              <span>Uptime: {hoveredRegion.uptime}%</span>
            </div>
            <div className="text-gray-400 text-xs mt-1">
              Response: {hoveredRegion.responseTime}ms
            </div>
            <div className="text-gray-400 text-xs">
              Status:{" "}
              {hoveredRegion.status.charAt(0).toUpperCase() +
                hoveredRegion.status.slice(1)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
