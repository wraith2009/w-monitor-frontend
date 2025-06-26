import { Bell, User, ChevronRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface HeaderProps {
  breadcrumbs: string[];
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Header = ({ breadcrumbs, onToggleSidebar }: HeaderProps) => {
  return (
    <header className="bg-[#161616] border-b border-gray-800/30 px-4 md:px-6 py-4 relative z-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.button
            onClick={onToggleSidebar}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800/40 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </motion.button>

          {/* <motion.button
            onClick={onToggleSidebar}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800/40 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </motion.button>
 */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && <ChevronRight className="h-4 w-4" />}
                <span
                  className={
                    index === breadcrumbs.length - 1 ? "text-white" : ""
                  }
                >
                  {crumb}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white hover:bg-gray-800/40 relative rounded-md h-8 w-8"
          >
            <Bell className="h-4 w-4" />
            <div className="absolute -top-1 -right-1 h-2 w-2 bg-purple-500 rounded-full"></div>
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback className="bg-gray-700 text-gray-300 text-xs">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
