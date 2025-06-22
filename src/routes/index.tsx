// src/routes/index.tsx
import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import { Dashboard } from "../pages/dashboard/Dashboard";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AuthRedirect from "../components/auth/AuthRedirect";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />

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

      {/* Protected Routes */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Landing />} />
    </Routes>
  );
};

export default AppRoutes;
