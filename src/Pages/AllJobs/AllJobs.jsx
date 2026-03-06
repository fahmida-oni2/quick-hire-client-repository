import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { FiSearch, FiMapPin, FiBriefcase, FiFilter } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import BASE_URL from "../../ApiBaseUrl/ApiBaseUrl";

const categories = [
  "All", "Engineering", "Technology", "Business",
  "Design", "Marketing", "Finance", "Sales", "Human Resources", "Other",
];

const jobTypes = [
  "All", "Full Time", "Part Time", "Remote",
  "Internship", "Contract", "Freelance",
];

const AllJobs = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const search = searchParams.get("title") || "";
  const locationFilter = searchParams.get("location") || "";
  const selectedCategory = searchParams.get("category") || "All";
  const selectedType = searchParams.get("jobType") || "All";


  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (!value || value === "All") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    setSearchParams(params);
  };

  const clearFilters = () => setSearchParams({});

  const isFiltered = search || locationFilter || selectedCategory !== "All" || selectedType !== "All";


  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("title", search);
    if (locationFilter) params.set("location", locationFilter);
    if (selectedCategory !== "All") params.set("category", selectedCategory);

    fetch(`${BASE_URL}/jobs?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        const filtered =
          selectedType !== "All"
            ? data.filter((job) => job.jobType === selectedType)
            : data;
        setJobs(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search, locationFilter, selectedCategory, selectedType]);

  return (
    <div className="min-h-screen bg-gray-50 font-epilogue mt-15">

      {/* Hero Search Bar */}
      <div className="bg-white border-b border-gray-100 px-5 sm:px-10 lg:px-20 py-10">
        <h1 className="text-2xl sm:text-3xl font-black text-[#25324B] mb-2">
          Find your <span className="text-primary">dream job</span>
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          {loading ? "Searching..." : `${jobs.length} jobs available`}
        </p>

        {/* Search Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5">
            <FiSearch className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Job title or company..."
              value={search}
              onChange={(e) => updateParam("title", e.target.value)}
              className="bg-transparent w-full text-sm outline-none text-gray-700 placeholder-gray-400"
            />
            {search && (
              <button onClick={() => updateParam("title", "")}>
                <RiCloseLine className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 sm:w-56 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5">
            <FiMapPin className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Location..."
              value={locationFilter}
              onChange={(e) => updateParam("location", e.target.value)}
              className="bg-transparent w-full text-sm outline-none text-gray-700 placeholder-gray-400"
            />
            {locationFilter && (
              <button onClick={() => updateParam("location", "")}>
                <RiCloseLine className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`flex items-center justify-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg transition sm:w-auto ${
              showFilter
                ? "bg-primary/10 text-primary border border-primary"
                : "bg-primary text-white hover:opacity-90"
            }`}
          >
            <FiFilter size={15} />
            Filters {isFiltered && <span className="bg-white text-primary rounded-full w-4 h-4 text-xs flex items-center justify-center font-black">!</span>}
          </button>
        </div>

        {/* Expandable Filters */}
        {showFilter && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Category</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => updateParam("category", cat)}
                    className={`text-xs px-3 py-1.5 rounded-full border font-medium transition ${
                      selectedCategory === cat
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-gray-500 border-gray-200 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Job Type</p>
              <div className="flex flex-wrap gap-2">
                {jobTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => updateParam("jobType", type)}
                    className={`text-xs px-3 py-1.5 rounded-full border font-medium transition ${
                      selectedType === type
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-gray-500 border-gray-200 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active filters */}
        {isFiltered && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400">Active filters:</span>
            {search && (
              <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full flex items-center gap-1">
                "{search}"
                <button onClick={() => updateParam("title", "")}>
                  <RiCloseLine size={12} />
                </button>
              </span>
            )}
            {selectedCategory !== "All" && (
              <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full flex items-center gap-1">
                {selectedCategory}
                <button onClick={() => updateParam("category", "")}>
                  <RiCloseLine size={12} />
                </button>
              </span>
            )}
            {selectedType !== "All" && (
              <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full flex items-center gap-1">
                {selectedType}
                <button onClick={() => updateParam("jobType", "")}>
                  <RiCloseLine size={12} />
                </button>
              </span>
            )}
            {locationFilter && (
              <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full flex items-center gap-1">
                📍 {locationFilter}
                <button onClick={() => updateParam("location", "")}>
                  <RiCloseLine size={12} />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1"
            >
              <RiCloseLine /> Clear all
            </button>
          </div>
        )}
      </div>

      {/* Job Cards */}
      <div className="px-5 sm:px-10 lg:px-20 py-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-5 animate-pulse border border-gray-100">
                <div className="flex justify-between mb-3">
                  <div className="h-10 w-10 bg-gray-100 rounded-lg" />
                  <div className="h-6 w-16 bg-gray-100 rounded-full" />
                </div>
                <div className="h-4 bg-gray-100 rounded mb-2" />
                <div className="h-3 bg-gray-100 rounded w-2/3 mb-3" />
                <div className="h-3 bg-gray-100 rounded mb-1" />
                <div className="h-3 bg-gray-100 rounded w-4/5" />
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl font-bold text-gray-300">No jobs found</p>
            <p className="text-sm text-gray-400 mt-2">Try adjusting your filters</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-sm text-primary font-semibold hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {jobs.map((job) => (
              <div
                key={job._id}
                onClick={() => navigate(`/jobs/${job._id}`)}
                className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-primary transition cursor-pointer group"
              >
                {/* Top Row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                    <FiBriefcase className="text-primary" />
                  </div>
                  <span className="text-xs font-semibold bg-green-50 text-green-600 px-2 py-1 rounded-full">
                    {job.jobType}
                  </span>
                </div>

                {/* Title & Company */}
                <h3 className="text-sm font-bold text-[#25324B] group-hover:text-primary transition mb-0.5">
                  {job.title}
                </h3>
                <p className="text-xs text-gray-400 font-medium mb-3">{job.company}</p>

                {/* Location & Category */}
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-4 flex-wrap">
                  <span className="flex items-center gap-1">
                    <FiMapPin size={11} /> {job.location}
                  </span>
                  <span className="bg-indigo-50 text-indigo-500 px-2 py-0.5 rounded-full font-medium">
                    {job.category}
                  </span>
                </div>

                {/* Description preview */}
                <p className="text-xs text-gray-400 line-clamp-2 mb-4">
                  {job.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  <span className="text-xs text-gray-300">
                    {new Date(job.created_at).toLocaleDateString()}
                  </span>
                  <span className="text-xs text-primary font-semibold group-hover:underline">
                    View details →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllJobs;