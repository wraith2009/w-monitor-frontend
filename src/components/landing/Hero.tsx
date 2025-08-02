"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <motion.div
        className="relative z-10 container mx-auto px-6 py-32 text-center"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.12,
              delayChildren: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl flex flex-col sm:flex-row items-center justify-center font-black mb-6 leading-tight tracking-tight font-geist"
          variants={{
            hidden: { y: 60, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 1.4,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 80,
                damping: 20,
              },
            },
          }}
        >
          <motion.span
            className="block bg-gradient-to-r from-white via-gray-100 to-purple-200 bg-clip-text text-transparent"
            variants={{
              hidden: { opacity: 0, x: -120, rotateX: 90 },
              visible: {
                opacity: 1,
                x: 0,
                rotateX: 0,
                transition: {
                  duration: 1.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                },
              },
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.4, ease: "easeOut" },
            }}
          >
            Never Miss
          </motion.span>

          <motion.span
            className="block sm:ml-4  relative"
            variants={{
              hidden: { opacity: 0, x: 120, rotateX: -90 },
              visible: {
                opacity: 1,
                x: 0,
                rotateX: 0,
                transition: {
                  duration: 1.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: 0.15,
                },
              },
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.4, ease: "easeOut" },
            }}
          >
            <motion.span
              animate={{
                scale: [1, 1.08, 1],
                filter: [
                  "drop-shadow(0 0 0px rgba(168, 85, 247, 0))",
                  "drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))",
                  "drop-shadow(0 0 0px rgba(168, 85, 247, 0))",
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1.5,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 2,
              }}
              className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent font-satoshi"
            >
              a Beat
            </motion.span>
          </motion.span>
        </motion.h1>

        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-gray-300 font-jakarta tracking-wide"
          variants={{
            hidden: { y: 40, opacity: 0, scale: 0.95 },
            visible: {
              y: 0,
              opacity: 1,
              scale: 1,
              transition: {
                duration: 1,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 90,
                damping: 12,
              },
            },
          }}
          whileHover={{
            scale: 1.01,
            color: "#f3f4f6",
            transition: { duration: 0.3 },
          }}
        >
          Monitor Everything
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-4 leading-relaxed font-light font-inter"
          variants={{
            hidden: { y: 40, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 1,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 70,
                damping: 15,
              },
            },
          }}
        >
          The most reliable uptime monitoring platform that never sleeps.
          <br />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            Get instant alerts when your websites, APIs, and services go down.
          </motion.span>
        </motion.p>

        <motion.p
          className="text-lg text-purple-300 mb-12 font-medium font-manrope tracking-wide"
          variants={{
            hidden: { y: 30, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.9,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            },
          }}
        >
          <motion.span
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            Monitor from 15+ global locations with 30-second checks
          </motion.span>
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          variants={{
            hidden: { y: 60, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 1,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 90,
                damping: 18,
              },
            },
          }}
        >
          <motion.div
            whileHover={{
              scale: 1.05,
              y: -8,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-600 hover:from-purple-700 hover:via-purple-600 hover:to-cyan-700 text-white font-semibold px-12 py-6 rounded-2xl text-lg transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25 group font-geist relative overflow-hidden border-0"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />
              <span className="relative z-10 tracking-wide">
                Start Monitoring Free
              </span>
              <motion.div
                className="inline-block ml-3 relative z-10"
                animate={{ x: [0, 6, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                whileHover={{ x: 10 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.05,
              y: -8,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gray-600 text-gray-300 hover:bg-white/5 hover:text-white hover:border-purple-400/60 font-semibold px-12 py-6 rounded-2xl text-lg transition-all duration-500 backdrop-blur-sm font-geist relative group overflow-hidden bg-transparent"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
              <span className="relative z-10 tracking-wide">
                View Live Demo
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <style>{`
        .font-geist {
          font-family: "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .font-satoshi {
          font-family: "Satoshi", sans-serif;
        }
        .font-jakarta {
          font-family: "Plus Jakarta Sans", sans-serif;
        }
        .font-inter {
          font-family: "Inter", sans-serif;
        }
        .font-manrope {
          font-family: "Manrope", sans-serif;
        }
      `}</style>
    </div>
  );
}
