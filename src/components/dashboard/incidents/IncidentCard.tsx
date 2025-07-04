"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  ExternalLink,
  MoreHorizontal,
  Eye,
  MessageSquare,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Incident } from "@/api/incidents";

interface IncidentCardProps {
  incident: Incident;
  onResolve: (id: number) => void;
  onViewDetails: (incident: Incident) => void;
}

export function IncidentCard({
  incident,
  onResolve,
  onViewDetails,
}: IncidentCardProps) {
  const [isResolving, setIsResolving] = useState(false);

  const formatDuration = (startedAt: string, resolvedAt: string | null) => {
    const start = new Date(startedAt);
    const end = resolvedAt ? new Date(resolvedAt) : new Date();
    const diffMs = end.getTime() - start.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 60) {
      return `${diffMins}m`;
    }
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return `${hours}h ${mins}m`;
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${diffDays}d ago`;
    }
  };

  const handleResolve = async () => {
    setIsResolving(true);
    try {
      await onResolve(incident.id);
    } finally {
      setIsResolving(false);
    }
  };

  const isOpen = incident.status === "OPEN";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-[#1f1f1f] border-gray-800/50 hover:bg-gray-800/20 transition-colors duration-200 group">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  isOpen ? "bg-red-500/10" : "bg-green-500/10"
                }`}
              >
                {isOpen ? (
                  <AlertCircle className="h-4 w-4 text-red-400" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                )}
              </div>
              <div>
                <Badge
                  variant="secondary"
                  className={`${
                    isOpen
                      ? "bg-red-500/10 text-red-400 border-red-500/20"
                      : "bg-green-500/10 text-green-400 border-green-500/20"
                  } border`}
                >
                  {incident.status}
                </Badge>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 cursor-pointer hover:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8"
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 90 }}
                    transition={{
                      type: "tween",
                      stiffness: 100,
                      damping: 20,
                      duration: 0.2,
                    }}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </motion.div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="bg-[#1f1f1f] border-gray-700/50"
                align="end"
              >
                <DropdownMenuItem
                  onClick={() => onViewDetails(incident)}
                  className="text-gray-300 hover:text-white hover:bg-gray-800/60 cursor-pointer"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800/60 cursor-pointer">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Add Comment
                </DropdownMenuItem>
                {isOpen && (
                  <DropdownMenuItem
                    onClick={handleResolve}
                    disabled={isResolving}
                    className="text-green-400 hover:text-green-300 hover:bg-green-500/10 cursor-pointer"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Resolved
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="text-white font-semibold text-lg leading-tight mb-1">
                {incident.summary}
              </h3>
              {incident.monitor && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>{incident.monitor.websiteName}</span>
                  <span>•</span>
                  <span className="font-mono">{incident.monitor.url}</span>
                  <ExternalLink className="h-3 w-3" />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-400 pt-3 border-t border-gray-800/50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>
                    Duration:{" "}
                    {formatDuration(incident.startedAt, incident.resolvedAt)}
                  </span>
                </div>
                <div>
                  <span>Started {formatRelativeTime(incident.startedAt)}</span>
                </div>
              </div>

              {isOpen && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleResolve}
                  disabled={isResolving}
                  className="border-green-700/50 text-green-400 hover:text-green-300 hover:bg-green-500/10 h-7 text-xs bg-transparent"
                >
                  {isResolving ? "Resolving..." : "Resolve"}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
