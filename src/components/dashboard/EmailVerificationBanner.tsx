import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, RefreshCw, CheckCircle } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useResendVerificationEmail } from "@/hooks/useAuth";

interface EmailVerificationBannerProps {
  onDismiss?: () => void;
}

export const EmailVerificationBanner = ({
  onDismiss,
}: EmailVerificationBannerProps) => {
  const { user } = useAuthStore();
  const [isDismissed, setIsDismissed] = useState(false);
  const resendMutation = useResendVerificationEmail();

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  const handleResendEmail = () => {
    if (user?.email) {
      resendMutation.mutate();
    }
  };
  console.log("useer", user);
  // Don't show banner if user is verified or if banner is dismissed
  if (user?.emailVerified || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        exit={{ opacity: 0, y: -20, height: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mb-6"
      >
        <Card className="bg-gradient-to-r border-purple-500/20 shadow-lg backdrop-blur-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-r animate-pulse" />
              </div>

              <div className="relative p-6">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="flex-shrink-0"
                  >
                    <div className="relative">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                        <Mail className="h-6 w-6 text-purple-400" />
                      </div>
                      <div className="absolute inset-0 w-12 h-12 bg-purple-500/20 rounded-full animate-ping" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          Email Verification Required
                        </h3>
                      </div>

                      <p className="text-gray-300 mb-4 leading-relaxed">
                        To ensure account security and access all dashboard
                        features, please verify your email address. We've sent a
                        verification link to{" "}
                        <span className="font-medium text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded">
                          {user?.email}
                        </span>
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          onClick={handleResendEmail}
                          disabled={
                            resendMutation.isPending || resendMutation.isSuccess
                          }
                          className="bg-purple-600 hover:bg-purple-700 text-white border-0 shadow-lg transition-all duration-200 disabled:bg-purple-600/50 group cursor-pointer"
                        >
                          {resendMutation.isPending ? (
                            <>
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : resendMutation.isSuccess ? (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                              Email Sent!
                            </>
                          ) : (
                            <>
                              <RefreshCw className="h-4 w-4 mr-2 transition-transform duration-700 group-hover:rotate-180" />
                              Resend Verification
                            </>
                          )}
                        </Button>

                        <Button
                          variant="ghost"
                          onClick={handleDismiss}
                          className="text-gray-400 hover:text-white hover:bg-gray-800/50 border border-gray-700/50"
                        >
                          Dismiss for now
                        </Button>
                      </div>
                    </motion.div>
                  </div>

                  {/* Close button */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    onClick={handleDismiss}
                    className="flex-shrink-0 text-gray-400 hover:text-white transition-colors duration-200 p-1 hover:bg-gray-800/50 rounded-md"
                    aria-label="Dismiss notification"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>

                {/* Progress indicator */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-purple-500 via-[#7920ad] to-purple-500 origin-left rounded-b-lg h-1.5"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};
