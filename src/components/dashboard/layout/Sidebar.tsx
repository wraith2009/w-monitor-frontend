import {
  User,
  Activity,
  TrendingUp,
  Settings,
  LogOut,
  BarChart3,
  AlertCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../stores/authStore";
import { motion } from "framer-motion";

const menuItems = [
  { title: "Dashboard", icon: BarChart3, path: "/dashboard" },
  { title: "Monitors", icon: Activity, path: "/dashboard/monitors" },
  { title: "Incidents", icon: AlertCircle, path: "/dashboard/incidents" },
  { title: "Analytics", icon: TrendingUp, path: "/dashboard/analytics" },
  { title: "Settings", icon: Settings, path: "/dashboard/settings" },
];

interface SidebarProps {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
}

const Sidebar = ({ onScreenChange }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const handleNavigation = (path: string, key: string) => {
    console.log(`Navigating to ${path} with key ${key}`);
    navigate(path);
    onScreenChange(key);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 bg-[#161616] border-r border-gray-800/30 flex flex-col relative z-20">
      {/* User Profile Section */}
      <div className="p-6 border-b border-gray-800/30">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-gray-700 text-gray-300">
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-white text-sm">
              {user?.name || "Admin User"}
            </div>
            <div className="text-gray-500 text-xs">
              {user?.email || "admin@company.com"}
            </div>
          </div>
        </div>

        {/* Search Bar */}
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 p-4">
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.path}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleNavigation(item.path, item.title.toLowerCase());
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{
                scale: 1.02,
                x: 4,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer select-none relative ${
                isActive(item.path)
                  ? "bg-gray-800/60 text-white shadow-sm"
                  : "text-gray-400 hover:bg-gray-800/40 hover:text-white"
              }`}
              style={{
                pointerEvents: "auto",
                zIndex: 1,
              }}
            >
              <motion.div
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
              </motion.div>
              <span className="truncate">{item.title}</span>

              {/* Active indicator */}
              {isActive(item.path) && (
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 rounded-r-full"
                  layoutId="activeIndicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800/30">
        <motion.button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleLogout();
          }}
          whileHover={{
            scale: 1.02,
            x: 4,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-400 hover:bg-red-900/20 hover:text-red-400 transition-all duration-200 cursor-pointer select-none"
          style={{
            pointerEvents: "auto",
            zIndex: 1,
          }}
        >
          <motion.div
            whileHover={{ rotate: -5 }}
            transition={{ duration: 0.2 }}
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
          </motion.div>
          <span>Logout</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Sidebar;
