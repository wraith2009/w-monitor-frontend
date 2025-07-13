import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { useForgotPassword } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  const forgotPasswordMutation = useForgotPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await forgotPasswordMutation.mutateAsync({ email });
      setEmailSent(true);
    } catch (err: any) {
      // Error is handled by the mutation
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1] as const,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.42, 0, 0.58, 1] as const,
      },
    },
  };

  if (emailSent) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full sm:max-w-md mx-4 md:max-w-lg"
      >
        <motion.div variants={itemVariants}>
          <Card className="bg-[#1f1f1f] border-gray-800/50 text-xl shadow-2xl backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="mx-auto mb-4"
              >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
              </motion.div>
              <CardTitle className="text-2xl font-semibold text-white">
                Check Your Email
              </CardTitle>
              <CardDescription className="text-gray-400">
                We've sent a password reset link to your email address
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                  <Mail className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-300 text-sm">
                    We sent a password reset link to:
                    <br />
                    <span className="font-medium text-white">{email}</span>
                  </p>
                </div>

                <div className="text-sm text-gray-400 space-y-2">
                  <p>Didn't receive the email? Check your spam folder.</p>
                  <p>The link will expire in 15 minutes.</p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      setEmailSent(false);
                      setEmail("");
                    }}
                    variant="outline"
                    className="w-full border-gray-700 text-gray-400 hover:text-white bg-transparent"
                  >
                    Try Different Email
                  </Button>

                  <Button
                    onClick={() => navigate("/signin")}
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Sign In
                  </Button>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 text-center text-xs text-gray-500"
        >
          <p>© 2024 Uptime Monitor. Secure and reliable monitoring.</p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 w-full sm:max-w-md mx-4 md:max-w-lg"
    >
      <motion.div variants={itemVariants}>
        <Card className="bg-[#1f1f1f] border-gray-800/50 text-xl shadow-2xl backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-semibold text-white">
              Forgot Password?
            </CardTitle>
            <CardDescription className="text-gray-400">
              Enter your email address and we'll send you a link to reset your
              password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants} className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-gray-300 text-sm font-medium"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your email"
                    className={`bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-500 transition-all duration-200 ${
                      focusedField === "email"
                        ? "border-gray-600 bg-gray-800/70 shadow-lg"
                        : "hover:border-gray-600/70"
                    }`}
                    required
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200 h-11 font-medium shadow-lg"
                    disabled={forgotPasswordMutation.isPending}
                  >
                    {forgotPasswordMutation.isPending ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center"
                      >
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Reset Link...
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Send Reset Link
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
              </motion.div>

              {forgotPasswordMutation.error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  <p className="text-red-400 text-sm text-center">
                    {forgotPasswordMutation.error?.message ||
                      "Failed to send reset link"}
                  </p>
                </motion.div>
              )}
            </form>

            <motion.div variants={itemVariants} className="mt-8 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-800/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#1f1f1f] px-2 text-gray-500">
                    Remember your password?
                  </span>
                </div>
              </div>
              <motion.div
                className="mt-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <button
                  type="button"
                  onClick={() => navigate("/signin")}
                  className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors duration-200 group"
                >
                  <ArrowLeft className="mr-1 h-3 w-3 group-hover:-translate-x-1 transition-transform duration-200" />
                  Back to Sign In
                </button>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-8 text-center text-xs text-gray-500"
      >
        <p>© 2024 Uptime Monitor. Secure and reliable monitoring.</p>
      </motion.div>
    </motion.div>
  );
};

export default ForgotPasswordForm;
