import "@fontsource/inter/700.css";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <section className="relative text-center bg-[#0C0C14] overflow-hidden px-6 py-20 font-sans">
      {/* <div className="absolute left-1/2 top-0 w-[500px] h-[500px] -translate-x-1/2 blur-[120px] bg-white opacity-10 pointer-events-none" /> */}

      <h1 className="relative z-10 text-2xl sm:text-4xl lg:text-5xl font-semibold text-slate-100 mt-2 leading-tight">
        Uptime Monitoring for Modern Time
      </h1>

      <p className="relative z-10 mt-6 text-slate-400 text-base font-semibold sm:text-lg">
        Monitor your website, APIs, and infrastructure
        <br className="hidden sm:block" />
        from multiple regions in real time.
      </p>

      <Button
        size="lg"
        className="relative z-10 mt-8 px-6 py-3 rounded-full bg-white text-black font-semibold shadow-[0_0_10px_rgba(255,255,255,0.4)] hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all duration-300"
      >
        Get Started for Free
      </Button>
    </section>
  );
}
