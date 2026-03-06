import React, { use, useState } from "react";
import "./Navbar.css";
import Img from "../../../assets/Frame 3.png";
import { Link, NavLink } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../../Provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        toast.success("SignOut successfully");
        setIsDropdownOpen(false);
      })
      .catch(() => {
        toast.error("Logout failed. Please try again.");
      });
  };

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navLinks = (
    <>
      <NavLink to="/jobs" className="text-neutral p-2 rounded">
        Find Jobs
      </NavLink>
      <NavLink to="/companies" className="text-neutral  p-2 rounded">
        Browse Companies
      </NavLink>
      {user && (
        <NavLink to="/dashboard" className="text-neutral  p-2 rounded">
          Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    <nav className="bg-white px-5 sm:px-10 lg:px-20 py-4 fixed top-0 left-0 right-0 z-50 shadow-sm font-epilogue">
      <div className="flex justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center">
            <img src={Img} alt="" className="h-8 w-8" />
            <Link to="/" className="font-redhat font-bold text-dark ml-2">
              QuickHire
            </Link>
          </div>
          {/* Desktop Nav Links */}
          <div className="hidden menu md:flex items-center ml-10 gap-5 font-epilogue">
            {navLinks}
          </div>
        </div>

        {/* Desktop login */}
        <div className="hidden md:flex items-center font-epilogue gap-5">
          {user ? (
            <div className="relative">
              <img
                onClick={handleDropdown}
                src={`${user.photoURL}`}
                className="h-10 w-10 rounded-full border-2 border-primary hover:scale-105 transition cursor-pointer"
                alt="User"
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-1 w-48 z-50 bg-white rounded-lg shadow-xl border border-gray-100">
                  <div className="p-4 border-b border-gray-100">
                    <p className="text-sm font-bold truncate">{user.displayName}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    <div className="mt-2 flex flex-col gap-1">
                      <Link
                        to="/dashboard/profile"
                        className="text-center text-sm border border-blue-500 text-blue-600 hover:bg-blue-100 rounded p-1"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogOut}
                        className="text-sm border border-red-500 text-red-600 hover:bg-red-50 rounded p-1"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="text-primary font-bold p-2 rounded"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="bg-primary font-bold p-2 text-white hover:opacity-90 rounded"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-dark text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden  menu mt-4 flex flex-col gap-4 font-epilogue bg-white p-4 shadow-xl rounded-2xl border border-gray-100">
          {navLinks}
          <hr className="border-gray-100" />
          {user ? (
            <>
              <div className="flex items-center gap-3 p-2">
                <img src={user.photoURL} className="h-8 w-8 rounded-full" alt="User" />
                <div>
                  <p className="text-sm font-bold">{user.displayName}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <Link
                to="/dashboard/profile"
                className="text-center border border-green-500 text-green-600 hover:bg-green-50 rounded p-2"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => { handleLogOut(); setIsOpen(false); }}
                className="border border-red-500 text-red-600 hover:bg-red-50 rounded p-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="text-primary font-bold p-2 hover:bg-gray-100 rounded text-center"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="bg-primary font-bold p-3 text-white rounded-xl text-center hover:opacity-90"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}

      <Toaster/>
    </nav>
  );
};

export default Navbar;