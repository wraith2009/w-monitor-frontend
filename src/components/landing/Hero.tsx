import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

export default function HeroSection() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 filter blur-xl opacity-20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-96 h-96 filter blur-xl opacity-20"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.2, 0.3] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 filter blur-xl opacity-20"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.25, 0.2] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <motion.div
        className="relative z-10 container mx-auto px-6 py-32 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl flex items-center justify-center font-black mb-6 bg-gradient-to-r from-white via-gray-100 to-purple-200 bg-clip-text text-transparent leading-tight tracking-tight font-inter"
          variants={{
            hidden: { y: 30, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: { duration: 0.8, ease: "easeInOut" },
            },
          }}
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
          >
            Never Miss
          </motion.span>

          <motion.span
            className="block ml-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-outfit"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
          >
            a Beat
          </motion.span>
        </motion.h1>

        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-gray-300 font-inter"
          variants={{
            hidden: { y: 30, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
            },
          }}
        >
          Monitor Everything
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-4 leading-relaxed font-light font-inter"
          variants={{
            hidden: { y: 30, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
            },
          }}
        >
          The most reliable uptime monitoring platform that never sleeps.
          <br />
          Get instant alerts when your websites, APIs, and services go down.
        </motion.p>

        <motion.p
          className="text-lg text-purple-300 mb-12 font-medium font-inter"
          variants={{
            hidden: { y: 30, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
            },
          }}
        >
          Monitor from 15+ global locations with 30-second checks
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={{
            hidden: { y: 30, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
            },
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 group font-inter"
            >
              Start Monitoring Free
              <motion.div
                className="inline-block ml-2"
                animate={{ x: [0, 3, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 backdrop-blur-sm font-inter"
            >
              View Live Demo
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <style>{`
        .font-inter {
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .font-outfit {
  font-family: "Outfit", sans-serif;
}
        .bg-grid-pattern {
          background-image:
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
}
