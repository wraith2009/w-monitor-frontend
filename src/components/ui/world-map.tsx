import React, { useRef, useState, useCallback, useMemo } from "react";
import DottedMap from "dotted-map";

export interface RegionData {
  lat: number;
  lng: number;
  label: string;
  uptime: number;
  responseTime: number;
  status: "up" | "down" | "degraded";
}

interface Connection {
  start: { lat: number; lng: number };
  end: { lat: number; lng: number };
}

interface WorldMapProps {
  regions: RegionData[];
  connections: Connection[];
  lineColor?: string;
}

export default function WorldMap({
  regions,
  connections,
  lineColor = "#0ea5e9",
}: WorldMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<RegionData | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const svgMap = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    return map.getSVG({
      radius: 0.22,
      color: "#FFFFFF20",
      shape: "circle",
      backgroundColor: "#161616",
    });
  }, []);

  const project = useCallback(
    (lat: number, lng: number) => ({
      x: (lng + 180) * (800 / 360),
      y: (90 - lat) * (400 / 180),
    }),
    []
  );

  const curve = useCallback(
    (a: { x: number; y: number }, b: { x: number; y: number }) => {
      const mx = (a.x + b.x) / 2;
      const my = Math.min(a.y, b.y) - 50;
      return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
    },
    []
  );

  const statusColor = useCallback((status: string, uptime: number) => {
    if (status === "down") return "#ef4444";
    if (status === "degraded" || uptime < 99.5) return "#f59e0b";
    return "#10b981";
  }, []);

  const updateMouse = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  }, []);

  const getTooltipStyle = useCallback(() => {
    if (!containerRef.current) return {};
    const { width: cw, height: ch } =
      containerRef.current.getBoundingClientRect();
    const tw = 200;
    const th = 120;
    let left = mousePos.x + 15;
    let top = mousePos.y - th / 2;

    if (left + tw > cw) left = mousePos.x - tw - 15;
    if (top < 0) top = mousePos.y + 15;
    if (top + th > ch) top = ch - th - 15;

    return { left, top };
  }, [mousePos]);

  const handleRegionMouseEnter = useCallback(
    (region: RegionData, e: React.MouseEvent) => {
      setHovered(region);
      updateMouse(e);
    },
    [updateMouse]
  );

  const handleRegionMouseLeave = useCallback(() => {
    setHovered(null);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full aspect-[2/1] bg-gray-900 rounded-lg relative overflow-hidden border border-gray-700"
    >
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="absolute inset-0 w-full h-full opacity-60 select-none pointer-events-none"
        alt="dotted world"
        draggable={false}
      />

      <svg
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0"
        style={{ pointerEvents: "none" }}
      >
        <defs>
          <linearGradient id="path-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Animated curves */}
        {connections.map((c, i) => {
          const a = project(c.start.lat, c.start.lng);
          const b = project(c.end.lat, c.end.lng);
          return (
            <path
              key={i}
              d={curve(a, b)}
              fill="none"
              stroke="url(#path-grad)"
              strokeWidth="2"
              opacity="0.8"
              style={{ pointerEvents: "none" }}
            >
              <animate
                attributeName="stroke-dasharray"
                values="0,1000;1000,1000"
                dur="3s"
                begin={`${i * 0.5}s`}
                repeatCount="indefinite"
              />
            </path>
          );
        })}

        {/* Regions */}
        {regions.map((r, i) => {
          const pt = project(r.lat, r.lng);
          const color = statusColor(r.status, r.uptime);
          const isHover = hovered?.label === r.label;

          return (
            <g key={i}>
              {/* Hover effect circle */}
              {isHover && (
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={15}
                  fill={color}
                  opacity={0.2}
                  style={{ pointerEvents: "none" }}
                >
                  <animate
                    attributeName="r"
                    values="15;20;15"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* Main region circle */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isHover ? 6 : 4}
                fill={color}
                filter="url(#glow)"
                style={{ pointerEvents: "auto", cursor: "pointer" }}
                onMouseEnter={(e) => handleRegionMouseEnter(r, e)}
                onMouseMove={updateMouse}
                onMouseLeave={handleRegionMouseLeave}
              />

              {/* Status animations */}
              {r.status === "up" && (
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={4}
                  fill={color}
                  opacity={0.6}
                  style={{ pointerEvents: "none" }}
                >
                  <animate
                    attributeName="r"
                    values="4;12;4"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.6;0;0.6"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {r.status === "degraded" && (
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={4}
                  fill={color}
                  opacity={0.8}
                  style={{ pointerEvents: "none" }}
                >
                  <animate
                    attributeName="r"
                    values="4;10;4"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.8;0.2;0.8"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* Region label on hover */}
              {isHover && (
                <text
                  x={pt.x}
                  y={pt.y - 20}
                  textAnchor="middle"
                  className="fill-white text-sm font-semibold"
                  style={{
                    filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.8))",
                    pointerEvents: "none",
                  }}
                >
                  {r.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hovered && (
        <div
          className="absolute z-20 bg-gray-800/95 backdrop-blur-sm text-white px-4 py-3 rounded-lg text-sm shadow-2xl border border-gray-600 transform transition-all pointer-events-none"
          style={{
            width: 200,
            height: 120,
            ...getTooltipStyle(),
          }}
        >
          <div className="font-semibold mb-2 flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{
                backgroundColor: statusColor(hovered.status, hovered.uptime),
              }}
            />
            {hovered.label}
          </div>
          <div className="space-y-1 text-gray-300">
            <div className="flex justify-between">
              <span className="text-gray-400">Uptime:</span>
              <span className="font-medium">{hovered.uptime}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Response:</span>
              <span className="font-medium">{hovered.responseTime}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span
                className={`font-medium capitalize ${
                  hovered.status === "up"
                    ? "text-green-400"
                    : hovered.status === "degraded"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {hovered.status}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
