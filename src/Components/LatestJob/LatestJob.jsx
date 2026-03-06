import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  FaGoogle,
  FaSpotify,
  FaUber,
  FaShopify,
  FaLinkedin,
  FaYoutube,
  FaBriefcase,
  FaDollarSign,
  FaShieldAlt,
  FaBox,
  FaBolt,
  FaChartLine,
  FaGlobe,
  FaFilm,
  FaMobile,
} from "react-icons/fa";
import {
  FiArrowRight,
  FiMapPin,
  FiBriefcase,
  FiCode,
  FiDollarSign,
  FiPenTool,
  FiSettings,
  FiShoppingCart,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import BASE_URL from "../../ApiBaseUrl/ApiBaseUrl";

const companyLogos = {
  Google: { icon: FaGoogle, bg: "bg-[#4285f41a]", color: "text-[#4285f4]" },
  Netflix: { icon: FaFilm, bg: "bg-[#e500001a]", color: "text-[#e50000]" },
  Samsung: { icon: FaMobile, bg: "bg-[#1428a01a]", color: "text-[#1428a0]" },
  Spotify: { icon: FaSpotify, bg: "bg-[#1db9541a]", color: "text-[#1db954]" },
  Uber: { icon: FaUber, bg: "bg-black/10", color: "text-black" },
  Shopify: { icon: FaShopify, bg: "bg-[#96bf481a]", color: "text-[#96bf48]" },
  LinkedIn: { icon: FaLinkedin, bg: "bg-[#0a66c21a]", color: "text-[#0a66c2]" },
  YouTube: { icon: FaYoutube, bg: "bg-[#ff00001a]", color: "text-[#ff0000]" },
  Adobe: { icon: FaBolt, bg: "bg-[#ff00001a]", color: "text-[#ff0000]" },
  IBM: { icon: FaShieldAlt, bg: "bg-[#0061ff1a]", color: "text-[#0061ff]" },
  Meta: { icon: FaGlobe, bg: "bg-[#0082fb1a]", color: "text-[#0082fb]" },
  HubSpot: { icon: FaChartLine, bg: "bg-[#ff7a591a]", color: "text-[#ff7a59]" },
  Deloitte: {
    icon: FaBriefcase,
    bg: "bg-[#86bc251a]",
    color: "text-[#86bc25]",
  },
  KPMG: { icon: FaDollarSign, bg: "bg-[#00338d1a]", color: "text-[#00338d]" },
  Unilever: { icon: FaBox, bg: "bg-[#1f36c71a]", color: "text-[#1f36c7]" },
  "Coca-Cola": { icon: FaBolt, bg: "bg-[#f400091a]", color: "text-[#f40009]" },
  "Startup BD": { icon: FaBolt, bg: "bg-[#4640de1a]", color: "text-primary" },
};
const categoryIcons = {
  Marketing: {
    icon: FiTrendingUp,
    bg: "bg-[#eb85331a]",
    color: "text-[#eb8533]",
  },
  Design: { icon: FiPenTool, bg: "bg-[#56cdad1a]", color: "text-[#56cdad]" },
  Business: { icon: FiBriefcase, bg: "bg-[#4640de1a]", color: "text-primary" },
  Technology: { icon: FiCode, bg: "bg-[#ff68001a]", color: "text-[#ff6800]" },
  Engineering: {
    icon: FiSettings,
    bg: "bg-[#56cdad1a]",
    color: "text-[#56cdad]",
  },
  Finance: {
    icon: FiDollarSign,
    bg: "bg-[#eb85331a]",
    color: "text-[#eb8533]",
  },
  Sales: { icon: FiShoppingCart, bg: "bg-[#4640de1a]", color: "text-primary" },
  "Human Resources": {
    icon: FiUsers,
    bg: "bg-[#ff68001a]",
    color: "text-[#ff6800]",
  },
  Other: { icon: FiBriefcase, bg: "bg-gray-100", color: "text-gray-400" },
};
const tagColors = {
  "Full Time": "bg-[#eb85331a] text-[#eb8533] border border-[#eb853340]",
  "Part Time": "bg-[#56cdad1a] text-[#56cdad] border border-[#56cdad40]",
  Remote: "bg-[#26a4ff1a] text-[#26a4ff] border border-[#26a4ff40]",
  Internship: "bg-[#eb85331a] text-[#eb8533] border border-[#eb853340]",
  Contract: "bg-[#ff65501a] text-[#ff6550] border border-[#ff655040]",
  Freelance: "bg-[#a855f71a] text-[#a855f7] border border-[#a855f740]",
  Marketing: "bg-[#56cdad1a] text-[#56cdad] border border-[#56cdad40]",
  Design: "bg-[#4640de1a] text-primary border border-primary/20",
  Technology: "bg-[#ff68001a] text-[#ff6800] border border-[#ff680040]",
  Engineering: "bg-[#56cdad1a] text-[#56cdad] border border-[#56cdad40]",
  Finance: "bg-[#eb85331a] text-[#eb8533] border border-[#eb853340]",
  Sales: "bg-[#4640de1a] text-primary border border-primary/20",
  "Human Resources": "bg-[#ff68001a] text-[#ff6800] border border-[#ff680040]",
  Business: "bg-[#26a4ff1a] text-[#26a4ff] border border-[#26a4ff40]",
};

const LatestJob = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/latest-jobs`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="mx-5 sm:mx-10 lg:mx-20 my-16 font-epilogue">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-redhat text-2xl sm:text-3xl font-black text-[#25324B]">
          Latest <span className="text-[#26A4FF]">jobs open</span>
        </h2>
        <button
          onClick={() => navigate("/jobs")}
          className="hidden sm:flex items-center gap-2 text-sm text-primary font-semibold hover:underline cursor-pointer"
        >
          Show all jobs <FiArrowRight size={14} />
        </button>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 rounded-lg border border-gray-100 bg-white animate-pulse"
            >
              <div className="h-12 w-12 rounded-lg bg-gray-100 shrink-0" />
              <div className="flex-1">
                <div className="h-4 bg-gray-100 rounded mb-2 w-3/4" />
                <div className="h-3 bg-gray-100 rounded mb-3 w-1/2" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-gray-100 rounded-full" />
                  <div className="h-6 w-16 bg-gray-100 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-300 text-xl font-bold">
            No jobs available yet.
          </p>
        </div>
      ) : (
        <>
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {jobs.map((job) => (
              <button
                key={job._id}
                onMouseEnter={() => setHovered(job._id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => navigate(`/jobs/${job._id}`)}
                className={`lg:flex items-start gap-4 text-left p-5  border transition-all duration-200 cursor-pointer ${
                  hovered === job._id
                    ? "border-primary shadow-sm shadow-primary/10"
                    : "border-gray-200 bg-white"
                }`}
              >
                {/* Company Avatar */}
                {(() => {
                  const company =
                    companyLogos[job.company] ||
                    categoryIcons[job.category] ||
                    categoryIcons["Other"];
                  const Icon = company.icon;
                  return (
                    <div
                      className={`h-15 w-15 rounded-lg flex items-center justify-center shrink-0 `}
                    >
                      <Icon size={20} className={company.color} />
                    </div>
                  );
                })()}
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-[#25324B] mb-0.5 group-hover:text-primary">
                    {job.title}
                  </p>
                  <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
                    {job.company}
                    <span className="text-gray-200">•</span>
                    <FiMapPin size={10} />
                    {job.location}
                  </p>

                  {/* Tags: jobType + category */}
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        tagColors[job.jobType] || "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {job.jobType}
                    </span>
                    <span className="text-gray-300  ">|</span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        tagColors[job.category] || "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {job.category}
                    </span>
                  </div>
                </div>

              
              </button>
            ))}
          </div>

          {/* Mobile show all */}
          <button
            onClick={() => navigate("/jobs")}
            className="flex sm:hidden mt-6 items-center gap-2 text-sm text-primary font-semibold hover:underline cursor-pointer"
          >
            Show all jobs <FiArrowRight size={14} />
          </button>
        </>
      )}
    </section>
  );
};

export default LatestJob;
