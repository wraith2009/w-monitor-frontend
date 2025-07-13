"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Globe,
  Clock,
  AlertCircle,
  CheckCircle,
  Edit,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { useRef, useLayoutEffect } from "react";
import type { Monitor, UpdateMonitorData } from "@/api/monitors";

interface EditMonitorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateMonitorData) => Promise<void>;
  monitor: Monitor | null;
}

interface MonitorFormData {
  websiteName: string;
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  expectedStatus: number;
  interval: number;
  timeout: number;
  isPaused: boolean;
  regions: string[];
}

const httpMethods = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
  "HEAD",
  "OPTIONS",
];

const intervals = [
  { value: 30, label: "30 seconds" },
  { value: 60, label: "1 minute" },
  { value: 300, label: "5 minutes" },
  { value: 600, label: "10 minutes" },
  { value: 1800, label: "30 minutes" },
  { value: 3600, label: "1 hour" },
];

const timeouts = [
  { value: 5000, label: "5 seconds" },
  { value: 10000, label: "10 seconds" },
  { value: 15000, label: "15 seconds" },
  { value: 30000, label: "30 seconds" },
  { value: 60000, label: "1 minute" },
];

const availableRegions = [
  { value: "us-east-1", label: "US East (N. Virginia)", flag: "🇺🇸" },
  { value: "eu-west-1", label: "Europe (Ireland)", flag: "🇪🇺" },
  { value: "ap-south-1", label: "Asia Pacific (Singapore)", flag: "🇸🇬" },
];

const statusCodes = [
  { value: 200, label: "200 - OK" },
  { value: 201, label: "201 - Created" },
  { value: 202, label: "202 - Accepted" },
  { value: 204, label: "204 - No Content" },
  { value: 301, label: "301 - Moved Permanently" },
  { value: 302, label: "302 - Found" },
];

export function EditMonitorModal({
  isOpen,
  onClose,
  onSubmit,
  monitor,
}: EditMonitorModalProps) {
  console.log("EditMonitorModal opened with monitor:", monitor);
  const [activeTab, setActiveTab] = useState<keyof typeof tabRefs>("basic");
  const [formData, setFormData] = useState<MonitorFormData>({
    websiteName: "",
    url: "",
    method: "GET",
    expectedStatus: 200,
    interval: 60,
    timeout: 5000,
    isPaused: false,
    regions: ["us-east-1"],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (monitor) {
      setFormData({
        websiteName: monitor.websiteName || "",
        url: monitor.url || "",
        method: monitor.method || "GET",
        expectedStatus: monitor.expectedStatus || 200,
        interval: monitor.interval || 60,
        timeout: monitor.timeout || 5000,
        isPaused: monitor.isPaused || false,
        regions: monitor.regions || ["us-east-1"],
      });
    }
  }, [monitor]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.websiteName.trim()) {
      newErrors.websiteName = "Website name is required";
    }

    if (!formData.url.trim()) {
      newErrors.url = "URL is required";
    } else {
      try {
        new URL(formData.url);
      } catch {
        newErrors.url = "Please enter a valid URL";
      }
    }

    if (formData.regions.length === 0) {
      newErrors.regions = "At least one region must be selected";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !monitor) return;

    setIsSubmitting(true);
    try {
      const updateData: UpdateMonitorData = {
        id: monitor.id,
        ...formData,
      };

      await onSubmit(updateData);
      onClose();
    } catch (error) {
      console.error("Failed to update monitor:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleRegion = (regionValue: string) => {
    setFormData((prev) => ({
      ...prev,
      regions: prev.regions.includes(regionValue)
        ? prev.regions.filter((r) => r !== regionValue)
        : [...prev.regions, regionValue],
    }));
  };

  const tabRefs = {
    basic: useRef<HTMLButtonElement>(null),
    regions: useRef<HTMLButtonElement>(null),
  };

  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });

  useLayoutEffect(() => {
    const activeEl = tabRefs[activeTab]?.current;
    if (activeEl) {
      const rect = activeEl.getBoundingClientRect();
      const parentRect = activeEl.parentElement?.getBoundingClientRect();
      if (parentRect) {
        setIndicatorStyle({
          left: rect.left - parentRect.left,
          width: rect.width,
        });
      }
    }
  }, [activeTab]);

  if (!monitor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <DialogContent className="bg-[#1f1f1f] border-gray-700/50 text-white  max-h-[85vh] overflow-y-auto shadow-2xl max-w-[90%]">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <DialogHeader className="border-b border-gray-700/30 pb-4">
              <DialogTitle className="text-xl font-semibold text-white flex items-center gap-2">
                <motion.div
                  initial={{ rotate: -180 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Edit className="h-5 w-5 text-blue-400" />
                </motion.div>
                Edit Monitor
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Update your monitor configuration and settings
              </DialogDescription>
            </DialogHeader>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <Tabs
              value={activeTab}
              onValueChange={(value) =>
                setActiveTab(value as "basic" | "regions")
              }
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-gray-800/60 backdrop-blur-sm border border-gray-700/30 h-fit">
                <motion.div
                  className="absolute top-1 bottom-1 bg-blue-600/30 rounded-md border border-blue-500/40 shadow-lg shadow-blue-500/20"
                  animate={indicatorStyle}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8,
                  }}
                />
                <TabsTrigger
                  ref={tabRefs.basic}
                  value="basic"
                  className="relative z-10 px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:text-blue-300"
                >
                  <motion.span
                    animate={{ scale: activeTab === "basic" ? 1.05 : 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    Basic Settings
                  </motion.span>
                </TabsTrigger>
                <TabsTrigger
                  ref={tabRefs.regions}
                  value="regions"
                  className="relative z-10 px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:text-blue-300"
                >
                  <motion.span
                    animate={{ scale: activeTab === "regions" ? 1.05 : 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    Monitoring Regions
                  </motion.span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6 mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="space-y-6"
                >
                  {/* Website Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="websiteName"
                      className="text-gray-300 flex items-center gap-2 font-medium"
                    >
                      <Globe className="h-4 w-4 text-blue-400" />
                      Website Name *
                    </Label>
                    <Input
                      id="websiteName"
                      value={formData.websiteName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          websiteName: e.target.value,
                        }))
                      }
                      placeholder="My API Service"
                      className="bg-gray-800/40 border-gray-600/50 text-white placeholder-gray-500 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all duration-200"
                    />
                    <AnimatePresence>
                      {errors.websiteName && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-red-400 text-sm flex items-center gap-1"
                        >
                          <AlertCircle className="h-3 w-3" />
                          {errors.websiteName}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* URL */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="url"
                      className="text-gray-300 flex items-center gap-2 font-medium"
                    >
                      <ExternalLink className="h-4 w-4 text-blue-400" />
                      URL to Monitor *
                    </Label>
                    <Input
                      id="url"
                      value={formData.url}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          url: e.target.value,
                        }))
                      }
                      placeholder="https://api.example.com/health"
                      className="bg-gray-800/40 border-gray-600/50 text-white placeholder-gray-500 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all duration-200"
                    />
                    <AnimatePresence>
                      {errors.url && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-red-400 text-sm flex items-center gap-1"
                        >
                          <AlertCircle className="h-3 w-3" />
                          {errors.url}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* HTTP Method and Expected Status */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="space-y-2">
                      <Label className="text-gray-300 font-medium">
                        HTTP Method
                      </Label>
                      <Select
                        value={formData.method}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            method: value as MonitorFormData["method"],
                          }))
                        }
                      >
                        <SelectTrigger className="bg-gray-800/40 border-gray-600/50 text-white hover:bg-gray-700/50 focus:border-blue-500/50 transition-all duration-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600 shadow-2xl backdrop-blur-lg">
                          {httpMethods.map((method) => (
                            <SelectItem
                              key={method}
                              value={method}
                              className="text-white hover:bg-blue-600/20 focus:bg-blue-600/20 transition-colors duration-150"
                            >
                              {method}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300 font-medium">
                        Expected Status Code
                      </Label>
                      <Select
                        value={formData.expectedStatus.toString()}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            expectedStatus: Number.parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger className="bg-gray-800/40 border-gray-600/50 text-white hover:bg-gray-700/50 focus:border-blue-500/50 transition-all duration-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600 shadow-2xl backdrop-blur-lg">
                          {statusCodes.map((status) => (
                            <SelectItem
                              key={status.value}
                              value={status.value.toString()}
                              className="text-white hover:bg-blue-600/20 focus:bg-blue-600/20 transition-colors duration-150"
                            >
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>

                  {/* Interval and Timeout */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="space-y-2">
                      <Label className="text-gray-300 flex items-center gap-2 font-medium">
                        <Clock className="h-4 w-4 text-blue-400" />
                        Check Interval
                      </Label>
                      <Select
                        value={formData.interval.toString()}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            interval: Number.parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger className="bg-gray-800/40 border-gray-600/50 text-white hover:bg-gray-700/50 focus:border-blue-500/50 transition-all duration-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600 shadow-2xl backdrop-blur-lg">
                          {intervals.map((interval) => (
                            <SelectItem
                              key={interval.value}
                              value={interval.value.toString()}
                              className="text-white hover:bg-blue-600/20 focus:bg-blue-600/20 transition-colors duration-150"
                            >
                              {interval.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300 font-medium">
                        Request Timeout
                      </Label>
                      <Select
                        value={formData.timeout.toString()}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            timeout: Number.parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger className="bg-gray-800/40 border-gray-600/50 text-white hover:bg-gray-700/50 focus:border-blue-500/50 transition-all duration-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600 shadow-2xl backdrop-blur-lg">
                          {timeouts.map((timeout) => (
                            <SelectItem
                              key={timeout.value}
                              value={timeout.value.toString()}
                              className="text-white hover:bg-blue-600/20 focus:bg-blue-600/20 transition-colors duration-150"
                            >
                              {timeout.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>

                  {/* Pause Monitor */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:bg-gray-800/40 transition-all duration-200"
                  >
                    <div>
                      <Label className="text-gray-300 font-medium">
                        Monitor Status
                      </Label>
                      <p className="text-gray-400 text-sm">
                        {formData.isPaused
                          ? "Monitor is currently paused"
                          : "Monitor is actively checking"}
                      </p>
                    </div>
                    <Switch
                      checked={formData.isPaused}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, isPaused: checked }))
                      }
                      className="w-11 h-6 relative inline-flex items-center rounded-full border border-gray-600 transition-colors data-[state=checked]:bg-yellow-600 bg-green-600"
                    >
                      <span className="inline-block w-5 h-5 transform rounded-full bg-white transition-transform data-[state=checked]:translate-x-5 translate-x-1" />
                    </Switch>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="regions" className="space-y-4 mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="space-y-3">
                    <Label className="text-gray-300 flex items-center gap-2 font-medium">
                      <Globe className="h-4 w-4 text-blue-400" />
                      Monitoring Regions *
                    </Label>
                    <p className="text-gray-400 text-sm">
                      Select regions where your monitor will run from
                    </p>

                    <div className="grid grid-cols-1 gap-3">
                      {availableRegions.map((region, index) => (
                        <motion.div
                          key={region.value}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index, duration: 0.3 }}
                        >
                          <Card
                            className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                              formData.regions.includes(region.value)
                                ? "bg-blue-600/20 border-blue-500/40 shadow-lg shadow-blue-500/10"
                                : "bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50 hover:border-gray-600/50"
                            }`}
                            onClick={() => toggleRegion(region.value)}
                          >
                            <CardContent className="p-4 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <motion.span
                                  animate={{
                                    scale: formData.regions.includes(
                                      region.value
                                    )
                                      ? 1.2
                                      : 1,
                                  }}
                                  transition={{ duration: 0.2 }}
                                  className="text-lg"
                                >
                                  {region.flag}
                                </motion.span>
                                <div>
                                  <p className="text-white font-medium">
                                    {region.label}
                                  </p>
                                  <p className="text-gray-400 text-sm">
                                    {region.value}
                                  </p>
                                </div>
                              </div>
                              <AnimatePresence>
                                {formData.regions.includes(region.value) && (
                                  <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{
                                      duration: 0.2,
                                      ease: "easeOut",
                                    }}
                                  >
                                    <CheckCircle className="h-5 w-5 text-blue-400" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    <AnimatePresence>
                      {errors.regions && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-red-400 text-sm flex items-center gap-1"
                        >
                          <AlertCircle className="h-3 w-3" />
                          {errors.regions}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center gap-2 mt-4"
                    >
                      <Badge
                        variant="secondary"
                        className="bg-blue-600/20 text-blue-300 border-blue-500/30"
                      >
                        {formData.regions.length} region
                        {formData.regions.length !== 1 ? "s" : ""} selected
                      </Badge>
                    </motion.div>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>

            {/* Form Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.3 }}
              className="flex items-center justify-end gap-3 pt-6 border-t border-gray-700/30"
            >
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-gray-600 text-gray-400 hover:text-white hover:border-gray-500 transition-all duration-200 bg-transparent"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-200 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Update Monitor
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
}
