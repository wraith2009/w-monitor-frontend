"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle,
  Loader2,
  Users,
} from "lucide-react";
import {
  useAddMonitorRecipient,
  useDeleteMonitorRecipient,
} from "@/hooks/useMonitors";
import { toast } from "sonner";

interface AlertRecipient {
  id: number;
  email: string;
  monitorId: number;
  createdAt: string;
}

interface MonitorRecipientSectionProps {
  monitorId: number;
  alertRecipients?: AlertRecipient[];
  monitorName: string;
}

export function MonitorRecipientSection({
  monitorId,
  alertRecipients = [],
  monitorName,
}: MonitorRecipientSectionProps) {
  const [email, setEmail] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addRecipientMutation = useAddMonitorRecipient();
  const deleteRecipientMutation = useDeleteMonitorRecipient();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddRecipient = async () => {
    setErrors({});

    if (!email.trim()) {
      setErrors({ email: "Email is required" });
      return;
    }

    if (!validateEmail(email)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    // Check if email already exists
    if (alertRecipients.some((recipient) => recipient.email === email.trim())) {
      setErrors({ email: "This email is already added as a contact" });
      return;
    }

    try {
      await addRecipientMutation.mutateAsync({
        monitorId,
        email: email.trim(),
      });

      setEmail("");
      setIsAdding(false);
      toast.success("Emergency contact added successfully!");
    } catch (error: any) {
      setErrors({ email: "Failed to add contact. Please try again." });
    }
  };

  const handleDeleteRecipient = async (recipientToDelete: AlertRecipient) => {
    try {
      await deleteRecipientMutation.mutateAsync({
        monitorId,
        email: recipientToDelete.email,
      });

      toast.success("Emergency contact removed successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to remove emergency contact");
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEmail("");
    setErrors({});
  };

  return (
    <Card className="bg-[#1f1f1f] border-gray-800/50">
      <CardHeader className="border-b border-gray-800/30 pb-4">
        <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-400" />
          Emergency Contacts
          {alertRecipients.length > 0 && (
            <Badge
              variant="secondary"
              className="ml-2 bg-blue-500/10 text-blue-400 border-blue-500/20"
            >
              {alertRecipients.length}
            </Badge>
          )}
        </CardTitle>
        <p className="text-gray-400 text-sm">
          Add engineers to be notified when this monitor goes down
        </p>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Existing Recipients List */}
          <AnimatePresence>
            {alertRecipients.map((recipient, index) => (
              <motion.div
                key={recipient.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Emergency Engineer</p>
                    <p className="text-gray-400 text-sm">{recipient.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-green-500/10 text-green-400 border-green-500/20"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Active
                  </Badge>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteRecipient(recipient)}
                    disabled={deleteRecipientMutation.isPending}
                    className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 p-0"
                    title="Remove contact"
                  >
                    {deleteRecipientMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add New Contact Section */}
          <AnimatePresence mode="wait">
            {!isAdding ? (
              <motion.div
                key="add-button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {alertRecipients.length === 0 ? (
                  /* Empty State */
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="h-8 w-8 text-gray-500" />
                    </div>
                    <h3 className="text-white font-medium mb-2">
                      No Emergency Contacts
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
                      Add engineers' emails to receive instant notifications
                      when this monitor has issues.
                    </p>

                    <Button
                      onClick={() => setIsAdding(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Emergency Contact
                    </Button>
                  </div>
                ) : (
                  /* Add Another Contact Button */
                  <Button
                    onClick={() => setIsAdding(true)}
                    variant="outline"
                    className="w-full border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800/50 bg-transparent border-dashed"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another Contact
                  </Button>
                )}
              </motion.div>
            ) : (
              /* Add Contact Form */
              <motion.div
                key="add-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 p-4 bg-gray-800/20 rounded-lg border border-gray-700/30"
              >
                <div className="space-y-2">
                  <Label
                    htmlFor="engineer-email"
                    className="text-gray-300 font-medium"
                  >
                    Engineer Email Address
                  </Label>
                  <Input
                    id="engineer-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) {
                        setErrors({});
                      }
                    }}
                    placeholder="engineer@company.com"
                    className={`bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-500 focus:border-blue-500/50 transition-all duration-200 ${
                      errors.email ? "border-red-500/50" : ""
                    }`}
                  />

                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-400 text-sm flex items-center gap-1"
                      >
                        <AlertCircle className="h-3 w-3" />
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button
                    onClick={handleAddRecipient}
                    disabled={addRecipientMutation.isPending}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                  >
                    {addRecipientMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Contact
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={addRecipientMutation.isPending}
                    className="border-gray-700 text-gray-400 hover:text-white bg-transparent"
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info Box */}
          {alertRecipients.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg"
            >
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-300">
                  <p className="font-medium mb-1">Notification Settings</p>
                  <p className="text-blue-400/80">
                    {alertRecipients.length === 1
                      ? "This engineer will receive immediate email alerts"
                      : `All ${alertRecipients.length} engineers will receive immediate email alerts`}{" "}
                    when "{monitorName}" goes down or becomes degraded.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
