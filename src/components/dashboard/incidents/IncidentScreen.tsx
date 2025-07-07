"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  AlertCircle,
  Activity,
} from "lucide-react";
import { useIncidents, useResolveIncident } from "@/hooks/useIncident";
import { IncidentCard } from "./IncidentCard";
import { IncidentDetailModal } from "./IncidentDetailModal";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import type { Incident } from "@/api/incidents";
import type { Monitor } from "@/api/monitors";
import { toast } from "sonner";
export function IncidentsScreen() {
  const {
    data: incidents = [] as Incident[],
    isLoading,
    error,
  } = useIncidents();
  console.log("Incidents data:", incidents);
  const resolveIncidentMutation = useResolveIncident();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [monitorFilter, setMonitorFilter] = useState("all");
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    null
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const summary = useMemo(() => {
    if (!Array.isArray(incidents) || !incidents.length) return null;

    const totalIncidents = incidents.length;
    const openIncidents = incidents.filter(
      (incident) => incident.status === "OPEN"
    ).length;
    const resolvedIncidents = incidents.filter(
      (incident) => incident.status === "RESOLVED"
    ).length;

    // Calculate average downtime (assuming incidents have a duration or timestamps)
    const avgDowntimeMinutes =
      incidents.reduce((acc, incident) => {
        // This is a placeholder calculation - adjust based on your incident data structure
        // You might have createdAt, resolvedAt, or duration fields
        if (incident.resolvedAt && incident.createdAt) {
          const duration =
            new Date(incident.resolvedAt).getTime() -
            new Date(incident.createdAt).getTime();
          return acc + duration / (1000 * 60); // Convert to minutes
        }
        return acc;
      }, 0) / Math.max(resolvedIncidents, 1);

    return {
      totalIncidents,
      openIncidents,
      resolvedIncidents,
      avgDowntimeMinutes: Math.round(avgDowntimeMinutes),
    };
  }, [incidents]);

  const uniqueMonitors = useMemo(() => {
    const monitors: Monitor[] = Array.isArray(incidents)
      ? incidents
          .filter((incident: any) => incident.monitor)
          .map((incident: any) => incident.monitor!)
      : [];
    Array.isArray(incidents)
      ? incidents.filter((incident: any) => incident.monitor)
      : [].map((incident: any) => incident.monitor!);

    const unique = monitors.filter(
      (monitor, index, self) =>
        index === self.findIndex((m) => m.id === monitor.id)
    );

    return unique;
  }, [incidents]);

  const filteredIncidents = useMemo(() => {
    return Array.isArray(incidents)
      ? incidents.filter((incident) => {
          const matchesSearch =
            incident.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
            incident.monitor?.websiteName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            incident.monitor?.url
              .toLowerCase()
              .includes(searchTerm.toLowerCase());

          const matchesStatus =
            statusFilter === "all" || incident.status === statusFilter;

          const matchesMonitor =
            monitorFilter === "all" ||
            incident.monitorId.toString() === monitorFilter;

          return matchesSearch && matchesStatus && matchesMonitor;
        })
      : [];
  }, [incidents, searchTerm, statusFilter, monitorFilter]);

  const handleViewDetails = (incident: Incident) => {
    setSelectedIncident(incident);
    setIsDetailModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedIncident(null);
  };

  const handleResolveIncident = async (incidentId: number) => {
    try {
      await resolveIncidentMutation.mutateAsync(incidentId);
    } catch (error) {
      console.error("Failed to resolve incident:", error);
      toast.error("Failed to resolve incident");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <Card className="bg-[#1f1f1f] border-gray-800/50">
        <CardContent className="p-6 text-center">
          <p className="text-red-400">
            {error instanceof Error
              ? error.message
              : "Failed to load incidents"}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Incidents</h1>
          <p className="text-gray-400 text-sm mt-1">
            Monitor and manage service incidents
          </p>
        </div>
      </div>

      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-[#1f1f1f] border-gray-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Total Incidents</span>
                  <Activity className="h-4 w-4 text-gray-500" />
                </div>
                <div className="text-2xl font-semibold text-white">
                  {summary.totalIncidents}
                </div>
                <div className="text-xs text-gray-500 mt-1">All time</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-[#1f1f1f] border-gray-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Open Incidents</span>
                  <AlertTriangle className="h-4 w-4 text-gray-500" />
                </div>
                <div className="text-2xl font-semibold text-white">
                  {summary.openIncidents}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Requires attention
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-[#1f1f1f] border-gray-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Resolved</span>
                  <CheckCircle className="h-4 w-4 text-gray-500" />
                </div>
                <div className="text-2xl font-semibold text-white">
                  {summary.resolvedIncidents}
                </div>
                <div className="text-xs text-gray-500 mt-1">This month</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-[#1f1f1f] border-gray-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Avg Downtime</span>
                  <Clock className="h-4 w-4 text-gray-500" />
                </div>
                <div className="text-2xl font-semibold text-white">
                  {summary.avgDowntimeMinutes}m
                </div>
                <div className="text-xs text-gray-500 mt-1">Per incident</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search incidents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-500 focus:border-gray-600"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 bg-gray-800/50 border-gray-700/50 text-white">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="OPEN">Open</SelectItem>
            <SelectItem value="RESOLVED">Resolved</SelectItem>
          </SelectContent>
        </Select>

        <Select value={monitorFilter} onValueChange={setMonitorFilter}>
          <SelectTrigger className="w-48 bg-gray-800/50 border-gray-700/50 text-white">
            <SelectValue placeholder="All Monitors" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="all">All Monitors</SelectItem>
            {uniqueMonitors.map((monitor) => (
              <SelectItem key={monitor.id} value={monitor.id.toString()}>
                {monitor.websiteName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {(searchTerm || statusFilter !== "all" || monitorFilter !== "all") && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-400">Active filters:</span>
          {searchTerm && (
            <Badge variant="secondary" className="bg-gray-800 text-gray-300">
              Search: {searchTerm}
            </Badge>
          )}
          {statusFilter !== "all" && (
            <Badge variant="secondary" className="bg-gray-800 text-gray-300">
              Status: {statusFilter}
            </Badge>
          )}
          {monitorFilter !== "all" && (
            <Badge variant="secondary" className="bg-gray-800 text-gray-300">
              Monitor:{" "}
              {
                uniqueMonitors.find((m) => m.id.toString() === monitorFilter)
                  ?.websiteName
              }
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
              setMonitorFilter("all");
            }}
            className="text-gray-400 hover:text-white h-6 px-2 text-xs"
          >
            Clear all
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        <AnimatePresence mode="popLayout">
          {filteredIncidents.map((incident) => (
            <IncidentCard
              key={incident.id}
              incident={incident}
              onResolve={handleResolveIncident}
              onViewDetails={handleViewDetails}
              //   isResolving={resolveIncidentMutation.isPending}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredIncidents.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <Card className="bg-[#1f1f1f] border-gray-800/50">
            <CardContent className="p-12">
              <AlertCircle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                No incidents found
              </h3>
              <p className="text-gray-400">
                {searchTerm || statusFilter !== "all" || monitorFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Great! No incidents to report at this time."}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Incident Detail Modal */}
      <IncidentDetailModal
        incident={selectedIncident}
        isOpen={isDetailModalOpen}
        onClose={handleCloseModal}
        onResolve={handleResolveIncident}
        // isResolving={resolveIncidentMutation.isPending}
      />
    </motion.div>
  );
}
