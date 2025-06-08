import { Button } from "../ui/button";

import logo from "../../assets/logo.svg";

export default function Navbar() {
  return (
    <nav className="px-6 lg:px-[200px] py-4 bg-gradient-to-b from-[#0a0a1d] to-[#0C0C14] ">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer">
          <img
            src={logo}
            alt="MonitorStack Logo"
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
          <h1 className="lg:text-md font-bold text-slate-300 hover:text-slate-200 transition-colors duration-300 ease-in-out">
            Monitor Stack
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-300 hover:text-white transition-colors cursor-pointer">
            Sign in
          </span>
          <Button
            size="sm"
            className=" px-6 py-3 rounded-full bg-white text-black font-semibold shadow-[0_0_10px_rgba(255,255,255,0.4)] hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all duration-300"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
}
