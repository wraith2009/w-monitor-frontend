import Navbar from "../component/sections/Navbar";
import HeroSection from "../component/sections/HeroSection";
import FeaturesSection from "../component/sections/FeatureSection";
import CTASection from "../component/sections/CTASession";
import Footer from "../component/sections/Footer";
import DashboardPreview from "../component/sections/DashboardPreview";
export default function Landing() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <DashboardPreview imageSrc="" />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </>
  );
}
