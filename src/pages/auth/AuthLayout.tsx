import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen overflow-hidden relative bg-[#161616] flex justify-center items-center">
      <AnimatedGridPattern
        numSquares={50}
        maxOpacity={0.05}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 w-full"
        )}
      />
      {children}
    </div>
  );
};
export default AuthLayout;
