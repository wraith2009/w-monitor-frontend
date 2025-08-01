import DarkVeil from "@/components/ui/DarkVeil";
import { Navigation } from "@/components/landing/Navigation";
import HeroSection from "@/components/landing/Hero";
export default function Landing() {
  return (
    <div className="relative w-full  bg-black">
      {/* DarkVeil should render behind everything */}
      <DarkVeil />

      {/* Foreground content */}
      <div className="relative z-10 text-7xl">
        <Navigation />
        <HeroSection />
      </div>
    </div>
  );
}
