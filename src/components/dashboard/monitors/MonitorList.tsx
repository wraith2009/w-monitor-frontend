"use client";
import { useState } from "react";
import { Plus, Search, Filter, Activity } from "lucide-react";
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
import { useMonitors } from "@/hooks/useMonitors";
import MonitorCard from "./MonitorCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import MonitorStatsOverview from "./MonitorStatsOverview";
import { motion, AnimatePresence } from "framer-motion";
import { AddMonitorModal } from "./AddMonitorModal";
import { useCreateMonitor } from "@/hooks/useMonitors";

const MonitorsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: monitors, isLoading, error } = useMonitors();
  const { mutateAsync: createMonitor } = useCreateMonitor();
  const filtered = monitors?.filter((m) => {
    const matchesSearch =
      m.websiteName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.url?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) return <LoadingSpinner />;

  if (error)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-[#1f1f1f] border-gray-800/50">
          <CardContent className="p-6 text-center">
            <motion.p
              className="text-red-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Failed to load monitors
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="space-y-6">
        {/* Header Section */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h1 className="text-2xl font-semibold text-white">Monitors</h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage and monitor your services
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="group bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 transition-colors duration-200 relative overflow-hidden"
            >
              <motion.div className="flex items-center relative z-10">
                <motion.div
                  className="mr-2"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Plus className="h-4 w-4" />
                </motion.div>
                Add Monitor
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <MonitorStatsOverview monitors={monitors || []} />
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <motion.div
            className="relative flex-1 max-w-md"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Search className="h-4 w-4 text-gray-500" />
            </motion.div>
            <Input
              placeholder="Search monitors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-500 focus:border-gray-600 transition-colors duration-200"
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-gray-800/50 border-gray-700/50 text-white focus:border-gray-600">
                <motion.div
                  whileHover={{ rotate: 15 }}
                  transition={{ duration: 0.2 }}
                >
                  <Filter className="h-4 w-4 mr-2" />
                </motion.div>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="up">Online</SelectItem>
                <SelectItem value="down">Offline</SelectItem>
                <SelectItem value="degraded">Degraded</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        </motion.div>

        {/* Monitors Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <AnimatePresence mode="popLayout">
            {filtered?.map((monitor, index) => (
              <motion.div
                key={monitor.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: "easeOut",
                  },
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                  scale: 0.9,
                  transition: { duration: 0.2 },
                }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
              >
                <MonitorCard monitor={monitor} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        <AnimatePresence>
          {filtered?.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-[#1f1f1f] border-gray-800/50">
                <CardContent className="p-12 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeInOut",
                      }}
                    >
                      <Activity className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      No monitors found
                    </h3>
                    <motion.p
                      className="text-gray-400 mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      {searchTerm || statusFilter !== "all"
                        ? "Try adjusting your search or filter criteria"
                        : "Get started by adding your first monitor"}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 relative overflow-hidden"
                      >
                        <motion.div className="flex items-center relative z-10">
                          <motion.div
                            className="mr-2"
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Plus className="h-4 w-4" />
                          </motion.div>
                          Add Monitor
                        </motion.div>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 opacity-0"
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      </Button>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AddMonitorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={async (data) => {
          const formattedData = {
            ...data,
            method: data.method as "GET" | "POST" | "PUT" | "DELETE",
          };

          try {
            await createMonitor(formattedData);
            setIsAddModalOpen(false);
          } catch (err) {
            console.error("Failed to create monitor:", err);
          }
        }}
      />
    </motion.div>
  );
};

export default MonitorsList;
