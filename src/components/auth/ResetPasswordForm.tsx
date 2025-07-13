import type React from "react";

import { useState, useEffect } from "react";
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
import {
  Eye,
  EyeOff,
  Loader2,
  Shield,
  AlertCircle,
  Check,
  X,
  CheckCircle,
} from "lucide-react";
import { useResetPassword } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import validatePasswordStrength from "@/utils/validatePasswordStrength";
import type { PasswordStrength } from "@/utils/validatePasswordStrength";
interface ResetPasswordFormProps {
  token: string | null;
}

const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    feedback: [],
    isValid: false,
  });
  const [resetSuccess, setResetSuccess] = useState(false);

  const navigate = useNavigate();
  const resetPasswordMutation = useResetPassword();

  useEffect(() => {
    if (!token) {
      navigate("/forgot-password");
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordStrength.isValid) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      return;
    }

    try {
      await resetPasswordMutation.mutateAsync({
        token: token!,
        newPassword: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      setResetSuccess(true);
    } catch (err: any) {
      // Error is handled by the mutation
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Update password strength in real-time
    if (name === "password") {
      setPasswordStrength(validatePasswordStrength(value));
    }
  };

  const getPasswordStrengthColor = (score: number) => {
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score <= 3) return "bg-yellow-500";
    if (score <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = (score: number) => {
    if (score <= 1) return "Very Weak";
    if (score <= 2) return "Weak";
    if (score <= 3) return "Fair";
    if (score <= 4) return "Good";
    return "Strong";
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

  if (resetSuccess) {
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
                Password Reset Successful
              </CardTitle>
              <CardDescription className="text-gray-400">
                Your password has been successfully updated
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                  <Shield className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <p className="text-gray-300 text-sm">
                    You can now sign in with your new password
                  </p>
                </div>

                <Button
                  onClick={() => navigate("/signin")}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200"
                >
                  Continue to Sign In
                </Button>
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

  if (!token) {
    return null; // Will redirect
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
              Reset Password
            </CardTitle>
            <CardDescription className="text-gray-400">
              Enter your new password to complete the reset process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password */}
              <motion.div variants={itemVariants} className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-gray-300 text-sm font-medium"
                >
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Create a strong password"
                    className={`bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-500 pr-12 transition-all duration-200 ${
                      focusedField === "password"
                        ? "border-gray-600 bg-gray-800/70 shadow-lg"
                        : "hover:border-gray-600/70"
                    }`}
                    required
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </motion.button>
                </div>

                {/* Password Strength Indicator */}
                {formData.password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-800 rounded-full h-1.5">
                        <motion.div
                          className={`h-1.5 rounded-full transition-all duration-300 ${getPasswordStrengthColor(
                            passwordStrength.score
                          )}`}
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(passwordStrength.score / 5) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">
                        {getPasswordStrengthText(passwordStrength.score)}
                      </span>
                    </div>
                    {passwordStrength.feedback.length > 0 && (
                      <div className="text-xs text-gray-500">
                        <span>Password must include: </span>
                        {passwordStrength.feedback.map((item, index) => (
                          <span key={index}>
                            {item}
                            {index < passwordStrength.feedback.length - 1
                              ? ", "
                              : ""}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>

              {/* Confirm Password */}
              <motion.div variants={itemVariants} className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-gray-300 text-sm font-medium"
                >
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("confirmPassword")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Confirm your password"
                    className={`bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-500 pr-12 transition-all duration-200 ${
                      focusedField === "confirmPassword"
                        ? "border-gray-600 bg-gray-800/70 shadow-lg"
                        : "hover:border-gray-600/70"
                    }`}
                    required
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </motion.button>

                  {/* Password Match Indicator */}
                  {formData.confirmPassword && (
                    <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                      {formData.password === formData.confirmPassword ? (
                        <Check className="h-4 w-4 text-green-400" />
                      ) : (
                        <X className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                  )}
                </div>

                {formData.confirmPassword &&
                  formData.password !== formData.confirmPassword && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1 mt-1 text-red-400 text-xs"
                    >
                      <AlertCircle className="h-3 w-3" />
                      Passwords do not match
                    </motion.div>
                  )}
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
                    disabled={
                      resetPasswordMutation.isPending ||
                      !passwordStrength.isValid ||
                      formData.password !== formData.confirmPassword
                    }
                  >
                    {resetPasswordMutation.isPending ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center"
                      >
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resetting Password...
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center"
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        Reset Password
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
              </motion.div>

              {resetPasswordMutation.error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  <p className="text-red-400 text-sm text-center">
                    {resetPasswordMutation.error?.message ||
                      "Failed to reset password"}
                  </p>
                </motion.div>
              )}
            </form>
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

export default ResetPasswordForm;
