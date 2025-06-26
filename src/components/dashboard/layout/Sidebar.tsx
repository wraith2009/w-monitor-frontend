import {
  User,
  Activity,
  TrendingUp,
  Settings,
  LogOut,
  BarChart3,
  AlertCircle,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../stores/authStore";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const menuItems = [
  { title: "Dashboard", icon: BarChart3, path: "/dashboard" },
  { title: "Monitors", icon: Activity, path: "/dashboard/monitors" },
  { title: "Incidents", icon: AlertCircle, path: "/dashboard/incidents" },
  { title: "Analytics", icon: TrendingUp, path: "/dashboard/analytics" },
  { title: "Settings", icon: Settings, path: "/dashboard/settings" },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  console.log("Sidebar isOpen:", isOpen);
  console.log("Sidebar onToggle function:", onToggle);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile && isOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          sidebarRef.current &&
          !sidebarRef.current.contains(event.target as Node)
        ) {
          onToggle();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMobile, isOpen, onToggle]);

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) onToggle();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    if (isMobile) onToggle();
  };

  const isActive = (path: string) => location.pathname === path;

  const sidebarClasses = `
    bg-[#161616] border-r border-gray-800/30 flex flex-col
    ${isMobile ? "fixed top-0 left-0 h-full w-64 z-50" : "h-screen"}
  `;

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        ref={sidebarRef}
        initial={false}
        animate={
          isMobile ? { x: isOpen ? 0 : -300 } : { width: isOpen ? 256 : 64 }
        }
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={sidebarClasses}
      >
        {/* Mobile Header */}
        {isMobile && (
          <div className="flex items-center justify-between p-4 border-b border-gray-800/30">
            <h2 className="text-white font-semibold">Menu</h2>
            <button
              onClick={onToggle}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* User Info */}
        <div className="p-6 border-b border-gray-800/30">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-gray-700 text-gray-300">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            {!isMobile && isOpen && (
              <div>
                <div className="text-white text-sm font-medium truncate">
                  {user?.name || "Admin"}
                </div>
                <div className="text-gray-500 text-xs truncate">
                  {user?.email || "admin@company.com"}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 p-4 overflow-y-auto">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium ${
                  isActive(item.path)
                    ? "bg-gray-800/60 text-white"
                    : "text-gray-400 hover:bg-gray-800/40 hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {isOpen && <span className="truncate">{item.title}</span>}
              </button>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-800/30">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-400 hover:bg-red-900/20 hover:text-red-400"
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
