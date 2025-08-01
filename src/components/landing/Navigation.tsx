import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4">
      <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-full px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-white">W Monitor</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-white/80 hover:text-white text-sm font-medium transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="#docs"
              className="text-white/80 hover:text-white text-sm font-medium transition-colors duration-200"
            >
              Docs
            </a>
            <Button
              size="sm"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-full px-6 transition-all duration-200"
            >
              Login
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/10 rounded-full"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10">
            <div className="space-y-3">
              <a
                href="#home"
                className="text-white/80 hover:text-white block text-sm font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#docs"
                className="text-white/80 hover:text-white block text-sm font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Docs
              </a>
              <Button
                size="sm"
                className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-full transition-all duration-200 mt-3"
              >
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
