"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  ExternalLink,
  Calendar,
  Activity,
  MessageSquare,
} from "lucide-react";
import type { Incident } from "@/api/incidents";

interface IncidentDetailModalProps {
  incident: Incident | null;
  isOpen: boolean;
  onClose: () => void;
  onResolve: (id: number) => void;
}

export function IncidentDetailModal({
  incident,
  isOpen: modalIsOpen,
  onClose,
  onResolve,
}: IncidentDetailModalProps) {
  if (!incident) return null;

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDuration = (startedAt: string, resolvedAt: string | null) => {
    const start = new Date(startedAt);
    const end = resolvedAt ? new Date(resolvedAt) : new Date();
    const diffMs = end.getTime() - start.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 60) {
      return `${diffMins} minutes`;
    }
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return `${hours} hours ${mins} minutes`;
  };

  const isIncidentOpen = incident.status === "OPEN";

  return (
    <Dialog open={modalIsOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1f1f1f] border-gray-800/50 text-white max-w-2xl">
        <DialogHeader className="border-b border-gray-800/30 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`p-2 rounded-lg ${
                isIncidentOpen ? "bg-red-500/10" : "bg-green-500/10"
              }`}
            >
              {isIncidentOpen ? (
                <AlertCircle className="h-5 w-5 text-red-400" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-400" />
              )}
            </div>
            <Badge
              variant="secondary"
              className={`${
                isIncidentOpen
                  ? "bg-red-500/10 text-red-400 border-red-500/20"
                  : "bg-green-500/10 text-green-400 border-green-500/20"
              } border`}
            >
              {incident.status}
            </Badge>
          </div>
          <DialogTitle className="text-xl font-semibold text-white">
            {incident.summary}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Incident #{incident.id} • {incident.monitor?.websiteName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Monitor Information */}
          {incident.monitor && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Affected Monitor
              </h3>
              <div className="bg-gray-800/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">
                      {incident.monitor.websiteName}
                    </p>
                    <p className="text-gray-400 text-sm font-mono">
                      {incident.monitor.url}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-700 text-gray-400 hover:text-white bg-transparent"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Monitor
                  </Button>
                </div>
              </div>
            </div>
          )}

          <Separator className="bg-gray-800/50" />

          {/* Timeline */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Timeline
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-white font-medium">Incident Started</p>
                  <p className="text-gray-400 text-sm">
                    {formatDateTime(incident.startedAt)}
                  </p>
                </div>
              </div>

              {incident.lastNotifiedAt && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white font-medium">Notification Sent</p>
                    <p className="text-gray-400 text-sm">
                      {formatDateTime(incident.lastNotifiedAt)}
                    </p>
                  </div>
                </div>
              )}

              {incident.resolvedAt && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white font-medium">Incident Resolved</p>
                    <p className="text-gray-400 text-sm">
                      {formatDateTime(incident.resolvedAt)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator className="bg-gray-800/50" />

          {/* Duration */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Duration
            </h3>
            <div className="bg-gray-800/30 rounded-lg p-4">
              <p className="text-white text-lg font-semibold">
                {formatDuration(incident.startedAt, incident.resolvedAt)}
              </p>
              <p className="text-gray-400 text-sm">
                {isIncidentOpen ? "Ongoing incident" : "Total downtime"}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800/30">
          <Button
            variant="outline"
            className="border-gray-700 text-gray-400 hover:text-white bg-transparent"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Add Comment
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-700 text-gray-400 hover:text-white bg-transparent"
            >
              Close
            </Button>
            {isIncidentOpen && (
              <Button
                onClick={() => {
                  onResolve(incident.id);
                  onClose();
                }}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Resolved
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
