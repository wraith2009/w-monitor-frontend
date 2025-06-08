import logo from "../../assets/logo.svg"; // Adjust path as needed

export default function Footer() {
  return (
    <footer className="bg-[#0C0C14] border-t border-white/10 px-6 lg:px-[200px] py-6 text-sm text-slate-400">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="MonitorStack Logo"
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
          <span className="text-slate-200 font-semibold text-sm">
            MonitorStack
          </span>
        </div>

        <div className="text-center sm:text-right w-full sm:w-auto">
          © {new Date().getFullYear()} MonitorStack. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
