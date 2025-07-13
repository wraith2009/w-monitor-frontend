// src/routes/index.tsx
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages/dashboard/Dashboard";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AuthRedirect from "../components/auth/AuthRedirect";
import LandingPage from "@/pages/landing/landingPage";
import MonitorPage from "@/pages/dashboard/monitor/MonitorPage";
import ForgotPassword from "@/pages/auth/ForgetPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      {/* <Route path="/" element={<Landing />} /> */}
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/monitor/:slug" element={<MonitorPage />} />

      {/* Auth Routes - No redirect */}
      {/* Auth Routes - Redirect if already authenticated */}
      <Route
        path="/signin"
        element={
          <AuthRedirect>
            <SignIn />
          </AuthRedirect>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthRedirect>
            <SignUp />
          </AuthRedirect>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <AuthRedirect>
            <ForgotPassword />
          </AuthRedirect>
        }
      />
      <Route
        path="/reset-password"
        element={
          <AuthRedirect>
            <ResetPassword />
          </AuthRedirect>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<SignIn />} />
    </Routes>
  );
};

export default AppRoutes;
