import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import {
  Search,
  LogOut,
  BarChart3,
  Activity,
  AlertCircle,
  TrendingUp,
  Settings,
} from "lucide-react";
import { Input } from "@/components/ui/input";
const menuItems = [
  { title: "Dashboard", icon: BarChart3, isActive: true },
  { title: "Monitors", icon: Activity },
  { title: "Incidents", icon: AlertCircle },
  { title: "Analytics", icon: TrendingUp },
  { title: "Settings", icon: Settings },
];
const Sidebar = () => {
  return (
    <div className="w-64 bg-[#161616] border-r border-gray-800/30 flex flex-col">
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
            <div className="font-medium text-white text-sm">Admin User</div>
            <div className="text-gray-500 text-xs">admin@company.com</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-gray-800/50 border-gray-700/50 text-gray-300 placeholder-gray-500 focus:border-gray-600 h-9 text-sm"
          />
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.title}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                item.isActive
                  ? "bg-gray-800/60 text-white"
                  : "text-gray-400 hover:bg-gray-800/40 hover:text-white"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </button>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800/30">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-400 hover:bg-gray-800/40 hover:text-white transition-colors duration-200">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
