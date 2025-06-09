import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../component/ui/input";
import { Button } from "../../component/ui/button";
import logo from "../../assets/logo.svg";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendMagicLink = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in with:", email, password);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0c0c12] text-white flex items-center justify-center px-4">
      <Link
        to="/"
        className="absolute top-6 left-6 text-sm text-gray-400 hover:text-white hidden lg:block"
      >
        &larr; Back to Home
      </Link>

      <div className="w-full max-w-md p-6 text-center">
        <Link
          to="/"
          className="lg:hidden text-sm text-gray-400 hover:text-white block text-left mb-4"
        >
          &larr; Back to Home
        </Link>

        <div className="mt-4">
          <img src={logo} alt="Logo" className="mx-auto h-16" />
          <h1 className="text-2xl font-bold mt-6">Welcome back</h1>
          <p className="text-gray-400 mt-2 text-sm">
            First time here?{" "}
            <Link to="/signup" className="text-white underline">
              Sign up for free.
            </Link>
          </p>
        </div>

        <form onSubmit={sendMagicLink} className="mt-6 space-y-4 text-left">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-400 mb-1">
              E-mail
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Your e-mail"
              className="w-full bg-[#1a1a1f] text-white border-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm text-gray-400 mb-1"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Your secret"
              className="w-full bg-[#1a1a1f] text-white border-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-white text-black shadow-[0_0_10px_rgba(255,255,255,0.4)] hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all duration-300"
          >
            Sign In
          </Button>
        </form>

        <div className="my-6 flex items-center justify-center">
          <span className="border-b border-gray-700 w-1/5" />
          <span className="border-b border-gray-700 w-1/5" />
        </div>

        <p className="text-xs text-gray-500 mt-6">
          You acknowledge that you read, and agree to our{" "}
          <Link className="underline" to="/terms">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link className="underline" to="/privacy">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
