import { motion } from "framer-motion";
import CardSwap, { Card } from "@/components/ui/CardSwap";
import FeatureGlobe from "./FeatureGlobe";

export default function FeatureSection() {
  const dashboardScreens = [
    {
      title: "Live Monitoring Dashboard",
      content: "Real-time status overview with instant alerts",
    },
    {
      title: "Performance Analytics",
      content: "Deep insights into response times and uptime trends",
    },
    {
      title: "Alert Management Center",
      content: "Configure and manage all your notification preferences",
    },
  ];

  const features = [
    {
      title:
        "You don't know how to consistently improve your uptime monitoring.",
      subtitle: "Performance Insights",
      visual: (
        <div className="relative w-full h-36 bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700">
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-800/80 to-transparent">
            <svg className="w-full h-full" viewBox="0 0 300 48">
              <path
                d="M0,36 L50,28 L100,20 L150,12 L200,16 L250,8 L300,4"
                stroke="#8b5cf6"
                strokeWidth="2"
                fill="none"
                className="opacity-80"
              />
              <circle
                cx="150"
                cy="12"
                r="2"
                fill="#8b5cf6"
                className="animate-pulse"
              />
            </svg>
          </div>
          <div className="absolute top-2 left-2 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
              <span>Current</span>
            </div>
          </div>
          <div className="absolute top-2 right-2 text-xs text-gray-300">
            Potential
          </div>
        </div>
      ),
    },
    {
      title: "Your monitoring setup is too expensive or slow.",
      subtitle: "Global Coverage",
      visual: (
        <div className="w-full h-full relative">
          <FeatureGlobe />
        </div>
      ),
    },
    {
      title: "You are overwhelmed by complex monitoring tools.",
      subtitle: "Simple Solution",
      visual: (
        <div className="relative w-full h-36 bg-gray-800/50 rounded-lg p-3 border border-gray-700">
          <div className="grid grid-cols-6 gap-1 h-full opacity-60">
            <div className="bg-gray-600 rounded-sm"></div>
            <div className="bg-gray-500 rounded-sm"></div>
            <div className="bg-gray-600 rounded-sm"></div>
            <div className="bg-gray-500 rounded-sm"></div>
            <div className="bg-gray-600 rounded-sm"></div>
            <div className="bg-gray-500 rounded-sm"></div>
            <div className="bg-gray-500 rounded-sm"></div>
            <div className="bg-gray-600 rounded-sm"></div>
            <div className="bg-gray-500 rounded-sm"></div>
            <div className="bg-gray-600 rounded-sm"></div>
            <div className="bg-gray-500 rounded-sm"></div>
            <div className="bg-gray-600 rounded-sm"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gradient-to-r from-purple-400 to-cyan-400 text-black px-2 py-1 rounded text-xs font-bold">
              AI
            </div>
          </div>
        </div>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section className="py-16 bg-black text-white min-h-screen flex flex-col justify-center overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-6 space-y-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.div
          className="flex flex-col items-center w-full"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            },
          }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              },
            }}
          >
            See Our Platform In Action
          </motion.h2>
          <motion.p
            className="text-gray-400 mb-8 text-center max-w-2xl text-lg"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              },
            }}
          >
            Experience real-time monitoring through our intuitive dashboard
          </motion.p>

          <motion.div
            className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-700/50 relative overflow-hidden w-full max-w-6xl"
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.2,
                },
              },
            }}
            whileHover={{
              boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.3)",
              borderColor: "rgb(139, 92, 246, 0.5)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-cyan-900/10 pointer-events-none" />

            <div className="feature-swap mx-auto h-48 w-full overflow-hidden rounded-xl flex items-center justify-between relative z-10">
              <div className="w-[45%] pr-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  Live Dashboard Preview
                </h3>
                <p className="text-gray-300 text-base leading-relaxed mb-4">
                  Watch as our monitoring system tracks your services in
                  real-time, providing instant insights and alerts.
                </p>
                <div className="flex items-center space-x-2 text-sm text-purple-400">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span>Live monitoring active</span>
                </div>
              </div>

              <div className="w-[55%] overflow-hidden">
                <CardSwap
                  width="60%"
                  height="100%"
                  cardDistance={50}
                  verticalDistance={20}
                  delay={3500}
                  pauseOnHover={true}
                >
                  {dashboardScreens.map((screen, i) => (
                    <Card
                      key={i}
                      customClass="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-600/50 h-full"
                    >
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="w-full h-20 bg-gray-700/50 rounded-lg mb-3 border border-gray-600/50 flex items-center justify-center">
                          <span className="text-gray-300 text-xs">
                            {screen.title} Preview
                          </span>
                        </div>
                        <h3 className="text-base font-semibold text-white mb-2">
                          {screen.title}
                        </h3>
                        <p className="text-gray-300 text-xs leading-relaxed">
                          {screen.content}
                        </p>
                      </div>
                    </Card>
                  ))}
                </CardSwap>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col items-center"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            },
          }}
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl"
            variants={containerVariants}
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="relative group"
                variants={{
                  hidden: { opacity: 0, scale: 0.9, y: 20 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  },
                  hover: {
                    scale: 1.02,
                    y: -3,
                    transition: {
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  },
                }}
                whileHover="hover"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 group-hover:border-gray-600/50 transition-all duration-300 h-full">
                  <motion.div
                    className=""
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.visual}
                  </motion.div>

                  <div className="mb-2">
                    <span className="text-xs font-medium text-purple-400 tracking-wider uppercase">
                      {feature.subtitle}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white leading-tight group-hover:text-purple-300 transition-colors duration-300">
                    {feature.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
