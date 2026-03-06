import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { FiArrowRight, FiMapPin, FiBriefcase } from 'react-icons/fi';
import BASE_URL from '../../ApiBaseUrl/ApiBaseUrl';

const tagColors = {
  Marketing: 'bg-[#eb85331a] text-[#eb8533]',
  Design: 'bg-[#56cdad1a] text-[#56cdad]',
  Business: 'bg-[#4640de1a] text-primary',
  Technology: 'bg-[#ff68001a] text-[#ff6800]',
  Engineering: 'bg-[#56cdad1a] text-[#56cdad]',
  Finance: 'bg-[#eb85331a] text-[#eb8533]',
  Sales: 'bg-[#4640de1a] text-primary',
  'Human Resources': 'bg-[#ff68001a] text-[#ff6800]',
  Other: 'bg-gray-100 text-gray-500',
};

const jobTypeColors = {
  'Full Time': 'text-primary border-primary/30 bg-primary/5',
  'Part Time': 'text-[#56cdad] border-[#56cdad]/30 bg-[#56cdad]/5',
  'Remote': 'text-[#26a4ff] border-[#26a4ff]/30 bg-[#26a4ff]/5',
  'Internship': 'text-[#eb8533] border-[#eb8533]/30 bg-[#eb8533]/5',
  'Contract': 'text-[#ff6550] border-[#ff6550]/30 bg-[#ff6550]/5',
  'Freelance': 'text-[#a855f7] border-[#a855f7]/30 bg-[#a855f7]/5',
};

const FeaturedJobs = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/featured-jobs`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const JobCard = ({ job, className = "" }) => (
    <button
      onMouseEnter={() => setHovered(job._id)}
      onMouseLeave={() => setHovered(null)}
      onClick={() => navigate(`/jobs/${job._id}`)}
      className={`text-left p-5 rounded-lg border transition-all duration-200 cursor-pointer group bg-white ${
        hovered === job._id
          ? "border-primary shadow-md shadow-primary/10"
          : "border-gray-200"
      } ${className}`}
    >
      {/* Top row */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-10 w-10 rounded-md border border-gray-100 flex items-center justify-center overflow-hidden bg-indigo-50 shrink-0">
          <span className="text-primary font-black text-base">
            {job.company?.charAt(0).toUpperCase()}
          </span>
        </div>
        <span
          className={`text-xs font-semibold border px-2.5 py-1 rounded ${
            jobTypeColors[job.jobType] || "text-primary border-primary/30 bg-primary/5"
          }`}
        >
          {job.jobType}
        </span>
      </div>

      {/* Title & Company */}
      <p className="font-bold text-sm text-[#25324B] mb-0.5 group-hover:text-primary transition">
        {job.title}
      </p>
      <p className="text-xs text-gray-400 flex items-center gap-1 mb-3">
        {job.company}
        <span className="text-gray-200">•</span>
        <FiMapPin size={11} />
        {job.location}
      </p>

      {/* Description */}
      <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">
        {job.description}
      </p>

      {/* Category Tag */}
      <div className="flex flex-wrap gap-2">
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded ${
            tagColors[job.category] || "bg-gray-100 text-gray-500"
          }`}
        >
          {job.category}
        </span>
       
      </div>
    </button>
  );

  return (
    <section className="mx-5 sm:mx-10 lg:mx-20 my-16 font-epilogue">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-redhat text-2xl sm:text-3xl font-black text-[#25324B]">
          Featured <span className="text-[#26A4FF]">jobs</span>
        </h2>
        <button
          onClick={() => navigate("/jobs")}
          className="sm:flex hidden items-center gap-2 text-sm text-primary font-semibold hover:underline cursor-pointer"
        >
          Show all jobs <FiArrowRight size={14} />
        </button>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-lg p-5 animate-pulse">
              <div className="flex justify-between mb-4">
                <div className="h-10 w-10 bg-gray-100 rounded-md" />
                <div className="h-6 w-16 bg-gray-100 rounded" />
              </div>
              <div className="h-4 bg-gray-100 rounded mb-2" />
              <div className="h-3 bg-gray-100 rounded w-2/3 mb-3" />
              <div className="h-3 bg-gray-100 rounded mb-1" />
              <div className="h-3 bg-gray-100 rounded w-4/5 mb-4" />
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-gray-100 rounded" />
                <div className="h-6 w-16 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-300 text-xl font-bold">No jobs available yet.</p>
        </div>
      ) : (
        <>
          {/* Desktop Grid */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>

          {/* Mobile horizontal scroll */}
          <div className="flex sm:hidden gap-4 overflow-x-auto pb-4 -mx-5 px-5 snap-x snap-mandatory scrollbar-hide">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                className="shrink-0 w-[75vw] snap-start"
              />
            ))}
          </div>

          <button
            onClick={() => navigate("/jobs")}
            className="flex sm:hidden mt-5 items-center gap-2 text-sm text-primary font-semibold hover:underline cursor-pointer"
          >
            Show all jobs <FiArrowRight size={14} />
          </button>
        </>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default FeaturedJobs;