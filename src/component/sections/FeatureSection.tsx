import { Globe, Zap, FileText } from "lucide-react"; // or any preferred icon lib

const features = [
  {
    title: "Global Checks",
    desc: "Run uptime checks from 5 continents.",
    icon: <Globe className="w-6 h-6 text-white" />,
  },
  {
    title: "Instant Alerts",
    desc: "Get notified via Email, Slack, or WhatsApp.",
    icon: <Zap className="w-6 h-6 text-white" />,
  },
  {
    title: "Detailed Logs",
    desc: "View exact failures and response times.",
    icon: <FileText className="w-6 h-6 text-white" />,
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#0C0C14] text-slate-300 px-6 lg:px-[200px] py-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-y-12 lg:gap-x-16">
        {/* Left: Heading */}
        <div className="lg:w-1/2">
          <span className="uppercase text-xs tracking-widest text-slate-400 font-semibold">
            Why MonitorStack?
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold text-white">
            Powerful Monitoring, Simplified
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-md">
            Stay ahead with real-time visibility and intelligent alerting.
          </p>
        </div>

        {/* Right: Icon-based Features List */}
        <div className="space-y-8 lg:w-1/2">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start space-x-4">
              <div className="mt-1">{feature.icon}</div>
              <div>
                <h4 className="text-lg font-semibold text-white">
                  {feature.title}
                </h4>
                <p className="text-sm text-slate-400">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
