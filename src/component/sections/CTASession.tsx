import { Button } from "../ui/button";

export default function CTASection() {
  return (
    <section className="relative text-center px-6 py-20 bg-[#0C0C14] text-white overflow-hidden">
      <div className="relative z-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight">
          Ready to improve your uptime?
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base font-medium">
          Join hundreds of teams monitoring their stack.
        </p>

        <Button
          size="lg"
          className="mt-8 px-6 py-3 rounded-full bg-white text-black font-semibold shadow-[0_0_10px_rgba(255,255,255,0.4)] hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all duration-300"
        >
          Start Monitoring
        </Button>
      </div>
    </section>
  );
}
