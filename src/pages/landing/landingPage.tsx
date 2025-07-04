import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function SpotlightLanding() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  interface MouseEventWithClient extends React.MouseEvent<HTMLDivElement> {
    clientX: number;
    clientY: number;
  }

  const handleMouseMove = (e: MouseEventWithClient): void => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const xPercent = useTransform(
    mouseX,
    (latestX) => (latestX / windowSize.width) * 100
  );
  const yPercent = useTransform(
    mouseY,
    (latestY) => (latestY / windowSize.height) * 100
  );

  const background = useTransform(
    [xPercent, yPercent],
    ([x, y]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(30,64,175,0.7) 0%, rgba(30,64,175,0.3) 20%, rgba(0,0,0,0.9) 60%)`
  );

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated spotlight background */}
      <motion.div className="fixed inset-0 z-0" style={{ background }} />

      {/* Center Hero Text */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          A domain odyssey
        </h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-white text-black rounded-lg font-semibold">
            Register
          </button>
          <button className="px-4 py-2 bg-gray-800 text-white rounded-lg font-semibold">
            Transfer
          </button>
        </div>
        <div className="mt-8 flex items-center bg-black/70 rounded-full px-4 py-2 max-w-md w-full">
          <input
            type="text"
            placeholder="Search for a domain name..."
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
          />
          <button className="ml-2 px-4 py-2 bg-blue-700 rounded-full font-semibold">
            Search
          </button>
        </div>
      </div>

      {/* Silhouettes (placeholder for your images/SVGs) */}
      <motion.img
        src="/left-silhouette.png"
        alt="left silhouette"
        className="absolute bottom-0 left-10 w-40 md:w-64 z-10"
        style={{
          x: useTransform(mouseX, (x) => (x - windowSize.width / 2) / 50),
          y: useTransform(mouseY, (y) => (y - windowSize.height / 2) / 50),
        }}
      />
      <motion.img
        src="/right-silhouette.png"
        alt="right silhouette"
        className="absolute bottom-0 right-10 w-40 md:w-64 z-10"
        style={{
          x: useTransform(mouseX, (x) => (windowSize.width / 2 - x) / 50),
          y: useTransform(mouseY, (y) => (y - windowSize.height / 2) / 50),
        }}
      />
    </div>
  );
}
