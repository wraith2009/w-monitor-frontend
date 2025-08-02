import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isInHero, setIsInHero] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight; // Assuming hero is full height

      // Check if we're in the hero section
      const inHero = currentScrollY < heroHeight * 0.8; // Show nav when 80% through hero
      setIsInHero(inHero);

      if (inHero) {
        // Always show in hero section
        setIsVisible(true);
      } else {
        // Outside hero section - show on scroll up, hide on scroll down
        if (currentScrollY < lastScrollY || currentScrollY <= 10) {
          // Scrolling up or near top
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down and past 100px
          setIsVisible(false);
          setIsMenuOpen(false); // Close mobile menu when hiding
        }
      }

      setLastScrollY(currentScrollY);

      // Clear existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // If not in hero and not scrolling, hide after 3 seconds of inactivity
      if (!inHero) {
        timeoutId = setTimeout(() => {
          if (window.scrollY > heroHeight * 0.8) {
            setIsVisible(false);
            setIsMenuOpen(false);
          }
        }, 3000);
      }
    };

    // Show nav on mouse movement (when not in hero)
    const handleMouseMove = () => {
      if (!isInHero) {
        setIsVisible(true);

        // Clear existing timeout
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        // Hide after 3 seconds of no movement
        timeoutId = setTimeout(() => {
          if (window.scrollY > window.innerHeight * 0.8) {
            setIsVisible(false);
            setIsMenuOpen(false);
          }
        }, 3000);
      }
    };

    // Add event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Initial call
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [lastScrollY, isInHero]);

  return (
    <nav
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4 transition-all duration-300 ease-in-out ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`backdrop-blur-lg border rounded-full px-6 py-3 transition-all duration-300 ${
          isInHero
            ? "bg-black/20 border-white/10"
            : "bg-black/40 border-white/20 shadow-lg"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-white">W Monitor</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-white/80 hover:text-white text-sm font-medium transition-colors duration-200 hover:scale-105 transform"
            >
              Home
            </a>
            <a
              href="#docs"
              className="text-white/80 hover:text-white text-sm font-medium transition-colors duration-200 hover:scale-105 transform"
            >
              Docs
            </a>
            <Button
              size="sm"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-full px-6 transition-all duration-200 hover:scale-105 transform"
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
              className="text-white hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-105 transform"
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
          <div className="md:hidden mt-4 pt-4 border-t border-white/10 animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-3">
              <a
                href="#home"
                className="text-white/80 hover:text-white block text-sm font-medium transition-colors duration-200 hover:translate-x-1 transform"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#docs"
                className="text-white/80 hover:text-white block text-sm font-medium transition-colors duration-200 hover:translate-x-1 transform"
                onClick={() => setIsMenuOpen(false)}
              >
                Docs
              </a>
              <Button
                size="sm"
                className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-full transition-all duration-200 mt-3 hover:scale-105 transform"
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
