import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaEye, FaArrowLeft } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const { signIn, signInWihGoogle } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        toast.success("Welcome back!");
        navigate(location.state || "/");
      })
      .catch(() => {
        setError("Account not found. Please check your credentials.");
        toast.error("Authentication Failed");
      });
  };

  const handleGoogleSignIn = () => {
    signInWihGoogle()
      .then(() => {
        toast.success("Logged in successfully");
        navigate(location.state || "/");
      })
      .catch(() => toast.error("Google Sign-In failed"));
  };

  return (
    <div className="min-h-screen bg-white font-epilogue flex flex-col">

      {/* Top Nav */}
      <div className="px-6 md:px-20 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm  hover:text-gray-700 transition-colors"
        >
          <FaArrowLeft size={12} />
          Back to Home
        </Link>
      </div>

      {/* Center Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm">

          {/* Header */}
          <div className="mb-8">
            <h2 className="font-redhat text-2xl font-bold text-dark mb-1">
              Sign in
            </h2>
            <p className="text-sm text-gray-400">
              Welcome back — enter your details below.
            </p>
          </div>

          {/* Google */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2.5 py-3 border border-gray-200 rounded-lg text-sm font-medium text-dark hover:bg-gray-50 transition-colors"
          >
            <FcGoogle size={18} />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <span className="flex-1 h-px bg-gray-100"></span>
            <span className="text-xs text-gray-700 uppercase tracking-widest">or</span>
            <span className="flex-1 h-px bg-gray-100"></span>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-dark">Email</label>
              <input
                name="email"
                type="email"
                className="w-full px-3.5 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-primary focus:bg-white transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-dark">Password</label>
              </div>
              <div className="relative">
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  className="w-full px-3.5 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-primary focus:bg-white transition-colors pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
                >
                  {show ? <FaEye size={15} /> : <IoEyeOff size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-500 bg-red-50 border border-red-100 px-3 py-2.5 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity mt-1 cursor-pointer"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <p className="text-xs text-gray-400 text-center mt-6">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-primary font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default Login;