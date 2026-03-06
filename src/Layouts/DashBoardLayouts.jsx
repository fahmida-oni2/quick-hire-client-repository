import React, { use, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import {
  RiDashboardLine,
  RiUserLine,
  RiGroupLine,
  RiBriefcaseLine,
  RiSettings3Line,
  RiQuestionLine,
  RiNotification3Line,
  RiAddLine,
  RiMenuLine,
  RiCloseLine,
} from "react-icons/ri";
import Img from "../assets/Frame 3.png";
import { AuthContext } from "../Provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { MdKeyboardArrowDown } from "react-icons/md";
import BASE_URL from "../ApiBaseUrl/ApiBaseUrl";

const DashBoardLayouts = () => {
  const { user, signOutUser } = use(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
const navigate = useNavigate();

useEffect(() => {
  if (user?.email) {
    fetch(`${BASE_URL}/jobs?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setCompanyName(data[0].company || user.displayName);
        } else {
          setCompanyName(user.displayName);
        }
      })
      .catch(() => {
        setCompanyName(user.displayName);
      });
  }
}, [user]);


  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        toast.success("SignOut successfully");
        setIsDropdownOpen(false);
         navigate("/");
      })
      .catch(() => {
        toast.error("Logout failed. Please try again.");
      });
  };

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-epilogue flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-56 bg-white border-r border-gray-100 z-50 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-5 border-b border-gray-100"
        >
          <img src={Img} alt="" className="h-7 w-7" />
          <span className="font-redhat font-black text-[#25324B] text-lg">
            QuickHire
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex-1 px-3 py-6 flex flex-col gap-1 overflow-y-auto">
          <NavLink
            to="/dashboard/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-primary text-white" : "text-gray-400 hover:text-[#25324B] hover:bg-gray-50"}`
            }
          >
            <RiDashboardLine size={18} /> Dashboard
          </NavLink>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-primary text-white" : "text-gray-400 hover:text-[#25324B] hover:bg-gray-50"}`
            }
          >
            <RiUserLine size={18} /> Company Profile
          </NavLink>
          <NavLink
            to="/dashboard/applicants"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-primary text-white" : "text-gray-400 hover:text-[#25324B] hover:bg-gray-50"}`
            }
          >
            <RiGroupLine size={18} /> All Applicants
          </NavLink>
          <NavLink
            to="/dashboard/job-listing"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-primary text-white" : "text-gray-400 hover:text-[#25324B] hover:bg-gray-50"}`
            }
          >
            <RiBriefcaseLine size={18} /> Job Listing
          </NavLink>
     

          {/* Settings section */}
          <p className="text-xs font-bold text-gray-300 uppercase tracking-widest px-3 mt-6 mb-2">
            Settings
          </p>
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-primary text-white" : "text-gray-400 hover:text-[#25324B] hover:bg-gray-50"}`
            }
          >
            <RiSettings3Line size={18} /> Settings
          </NavLink>
          <NavLink
            to="/dashboard/help"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-primary text-white" : "text-gray-400 hover:text-[#25324B] hover:bg-gray-50"}`
            }
          >
            <RiQuestionLine size={18} /> Help Center
          </NavLink>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-56 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-100 px-5 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-400 hover:text-[#25324B] transition-colors"
            >
              {sidebarOpen ? (
                <RiCloseLine size={22} />
              ) : (
                <RiMenuLine size={22} />
              )}
            </button>

            {/* Company selector */}
            <div className="flex items-center gap-2 cursor-pointer relative">
              <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-black">
                  {companyName?.charAt(0).toUpperCase() || "N"}
                </span>
              </div>
              <div className=" sm:block">
                <p className="text-[10px] text-gray-400 leading-none">
                  Company
                </p>
                <p
                  className="text-sm flex items-center font-bold text-[#25324B]"
                  onClick={handleDropdown}
                >
                  {companyName || "Guest"}
                  <MdKeyboardArrowDown
                    className={`text-lg transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </p>
              </div>

              {/* Dropdown  */}
              {isDropdownOpen && (
                <div className="absolute left-0 top-10 w-36 z-50 bg-white rounded-lg shadow-xl border border-gray-100">
                  <div className="p-2">
                    <button
                      onClick={handleLogOut}
                      className="w-full text-sm border border-red-500 text-red-600 hover:bg-red-50 rounded p-1"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

       
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-400 hover:text-[#25324B] transition-colors">
              <RiNotification3Line size={20} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary rounded-full"></span>
            </button>
            <Link
              to="/dashboard/post-job"
              className="flex items-center gap-1.5 bg-primary text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              <RiAddLine size={16} /> Post a Job
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
      <Toaster></Toaster>
    </div>
  );
};

export default DashBoardLayouts;
