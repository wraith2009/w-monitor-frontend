import { Activity, Clock, Shield, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Smooth animated counter component
const AnimatedCounter = ({
  value,
  suffix = "",
  duration = 1500,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easing function (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = value * easeOut;

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [value, duration]);

  return (
    <span>
      {Math.round(displayValue).toLocaleString()}
      {suffix}
    </span>
  );
};

// Format response time
const formatResponseTime = (time: any) => {
  if (time === null || time === undefined) return "0ms";
  return time >= 1000 ? `${(time / 1000).toFixed(1)}s` : `${time}ms`;
};

// Format uptime percentage
const formatUptime = (uptime: any) => {
  if (uptime === null || uptime === undefined) return "0%";
  return `${(uptime * 100).toFixed(1)}%`;
};
interface overviewCardProps {
  metrics: {
    overallUptime: number | null;
    averageResponseTime: number | null;
    activeMonitorsByRegion: Record<string, number>;
    totalIncidents: number | null;
  };
}

const OverviewCards = ({ metrics }: overviewCardProps) => {
  const cards = [
    {
      title: "Overall Uptime",
      value: metrics?.overallUptime,
      displayValue: formatUptime(metrics?.overallUptime),
      animatedValue: metrics?.overallUptime ? metrics.overallUptime : 0,
      suffix: "%",
      subtitle: "Last 30 days",
      icon: Activity,
      color: "text-emerald-400",
      glowColor: "shadow-emerald-500/10",
    },
    {
      title: "Avg Response",
      value: metrics?.averageResponseTime,
      displayValue: formatResponseTime(metrics?.averageResponseTime),
      animatedValue: metrics?.averageResponseTime || 0,
      suffix: (metrics?.averageResponseTime ?? 0) >= 1000 ? "s" : "ms",
      subtitle: "Global average",
      icon: Clock,
      color: "text-cyan-400",
      glowColor: "shadow-cyan-500/10",
    },
    {
      title: "Active Monitors",
      value: Object.keys(metrics?.activeMonitorsByRegion || {}).length,
      animatedValue: Object.values(
        metrics?.activeMonitorsByRegion || {}
      ).reduce((a, b) => a + b, 0),
      suffix: "",
      subtitle: ``,
      icon: Shield,
      color: "text-violet-400",
      glowColor: "shadow-violet-500/10",
    },
    {
      title: "Incidents",
      value: metrics?.totalIncidents,
      animatedValue: metrics?.totalIncidents || 0,
      suffix: "",
      subtitle: "Active incidents",
      icon: AlertTriangle,
      color:
        (metrics?.totalIncidents ?? 0) > 0 ? "text-amber-400" : "text-gray-400",
      glowColor:
        (metrics?.totalIncidents ?? 0) > 0
          ? "shadow-amber-500/10"
          : "shadow-gray-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.08,
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <Card
            className={`
            bg-gradient-to-br from-[#1f1f1f] to-[#191919] 
            border-gray-800/50 
            hover:border-gray-700/50 
            hover:${card.glowColor}
            transition-all duration-500 ease-out
            group
            relative
          `}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-400 tracking-wide">
                  {card.title}
                </span>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: index * 0.08 + 0.2,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  className="group-hover:scale-110 transition-transform duration-300 ease-out"
                >
                  <card.icon
                    className={`h-5 w-5 ${card.color} drop-shadow-sm`}
                  />
                </motion.div>
              </div>

              <div className="text-3xl font-bold text-white mb-3 tracking-tight">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.08 + 0.4,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                >
                  <AnimatedCounter
                    value={card.animatedValue}
                    suffix={card.suffix}
                    duration={1200 + index * 200}
                  />
                </motion.div>
              </div>

              <motion.div
                className="text-xs text-gray-500 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: index * 0.08 + 0.6,
                  duration: 0.4,
                  ease: "easeOut",
                }}
              >
                {card.subtitle}
              </motion.div>

              {/* Subtle hover effect overlay */}
              <motion.div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${
                    card.color.includes("emerald")
                      ? "rgba(16, 185, 129, 0.03)"
                      : card.color.includes("cyan")
                      ? "rgba(34, 211, 238, 0.03)"
                      : card.color.includes("violet")
                      ? "rgba(139, 92, 246, 0.03)"
                      : card.color.includes("amber")
                      ? "rgba(245, 158, 11, 0.03)"
                      : "rgba(156, 163, 175, 0.03)"
                  } 0%, transparent 70%)`,
                }}
              />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default OverviewCards;
