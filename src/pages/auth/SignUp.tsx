import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../component/ui/input";
import { Button } from "../../component/ui/button";
import logo from "../../assets/logo.svg";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    console.log("Signing up with:", form);
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
          <h1 className="text-2xl font-bold mt-6">Create your account</h1>
          <p className="text-gray-400 mt-2 text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="text-white underline">
              Sign in here.
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-400 mb-1">
              Name
            </label>
            <Input
              id="name"
              name="name"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-[#1a1a1f] text-white border-none"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-400 mb-1">
              E-mail
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Your e-mail"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-[#1a1a1f] text-white border-none"
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
              name="password"
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-[#1a1a1f] text-white border-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm text-gray-400 mb-1"
            >
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full bg-[#1a1a1f] text-white border-none"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-white text-black shadow-[0_0_10px_rgba(255,255,255,0.4)] hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all duration-300"
          >
            Sign Up
          </Button>
        </form>

        <div className="my-6 flex items-center justify-center">
          <span className="border-b border-gray-700 w-1/5" />
          <span className="border-b border-gray-700 w-1/5" />
        </div>

        <p className="text-xs text-gray-500 mt-6">
          By signing up, you agree to our{" "}
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
