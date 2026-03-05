import React from "react";
import errorImg from "../../../assets/error-404.png";
import { Link } from "react-router";
import { FaArrowLeft, FaHome } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 selection:bg-blue-600 selection:text-white font-sans">
      <div className="flex flex-col flex-grow items-center justify-center p-6 text-center animate__animated animate__fadeIn">
        <div className="max-w-md mb-8 transition-transform hover:scale-105 duration-500">
          <img
            src={errorImg}
            alt="404 Error"
            className="w-full h-auto drop-shadow-2xl"
          />
        </div>

        {/* Text Content */}
        <div className="space-y-4 max-w-lg">
          <h1 className="text-5xl lg:text-6xl font-black  tracking-tighter">
            Oops! Lost in Space?
          </h1>

          <p className="text-lg text-gray-600 font-medium px-4">
            The page you're looking for has moved or doesn't exist. Let's get
            you back to familiar territory.
          </p>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 transition-all duration-200 gap-2"
          >
            <FaHome className="text-lg" />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold rounded-2xl transition-all duration-200 gap-2"
          >
            <FaArrowLeft className="text-lg" />
            Go Previous
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
