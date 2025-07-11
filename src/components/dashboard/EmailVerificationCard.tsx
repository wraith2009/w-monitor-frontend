import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  RefreshCw,
  Shield,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useResendVerificationEmail } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/authStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const EmailVerificationCard = () => {
  const { user } = useAuthStore();
  const [emailSent, setEmailSent] = useState(false);
  const resendMutation = useResendVerificationEmail();

  const handleResendEmail = () => {
    if (user?.email) {
      resendMutation.mutate();
      setEmailSent(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-[#1f1f1f] border-gray-800/50">
        <CardContent className="p-12 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="mb-6"
          >
            <div className="relative inline-flex">
              <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center border border-gray-700/50 mb-4">
                <Mail className="h-8 w-8 text-gray-400" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                <AlertCircle className="h-3 w-3 text-purple-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-white mb-3">
              Email Verification Required
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto leading-relaxed">
              Please verify your email address to start adding and managing
              monitors. We've sent a verification link to{" "}
              <span className="font-medium text-purple-300 bg-purple-500/10 px-2 pb-1 rounded">
                {user?.email}
              </span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="space-y-4"
          >
            <Button
              onClick={handleResendEmail}
              disabled={resendMutation.isPending || emailSent}
              className="bg-purple-600 hover:bg-purple-700 text-white border-0 shadow-lg transition-all duration-200 disabled:bg-purple-600/50 group cursor-pointer"
            >
              {resendMutation.isPending ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : emailSent ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Email Sent!
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 transition-transform duration-700 group-hover:rotate-180" />
                  Resend Verification
                </>
              )}
            </Button>

            <div className="text-sm text-gray-500">
              <p>Check your spam folder if you don't see the email</p>
            </div>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-600"
          >
            <Shield className="h-3 w-3" />
            <span>Secure email verification</span>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
