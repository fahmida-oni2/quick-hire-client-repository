import React, { useState, useEffect } from "react";
import { FiBriefcase, FiMapPin, FiX } from "react-icons/fi";
import { RiBuilding2Line } from "react-icons/ri";
import BASE_URL from "../../ApiBaseUrl/ApiBaseUrl";
import Loading from "../../Components/Common/Loading/Loading";

const AllCompanies = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/jobs`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);


  const companies = jobs.reduce((acc, job) => {
    if (!acc[job.company]) {
      acc[job.company] = {
        name: job.company,
        jobs: [],
      };
    }
    acc[job.company].jobs.push(job);
    return acc;
  }, {});

  const companyList = Object.values(companies).filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedJobs = selectedCompany
    ? companies[selectedCompany]?.jobs || []
    : [];

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 font-epilogue mt-15">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-5 sm:px-10 lg:px-20 py-10">
        <h1 className="text-2xl sm:text-3xl font-black text-[#25324B] mb-1">
          All <span className="text-primary">Companies</span>
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          {companyList.length} companies hiring now
        </p>

        {/* Search */}
        <div className="flex items-center gap-2 max-w-md bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5">
          <RiBuilding2Line className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent w-full text-sm outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Company Cards */}
      <div className="px-5 sm:px-10 lg:px-20 py-10">
        {companyList.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl font-bold text-gray-300">No companies found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {companyList.map((company) => (
              <div
                key={company.name}
                onClick={() => setSelectedCompany(company.name)}
                className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-primary transition cursor-pointer group"
              >
                {/* Avatar */}
                <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                  <span className="text-primary font-black text-lg">
                    {company.name.charAt(0).toUpperCase()}
                  </span>
                </div>

                {/* Company Name */}
                <h3 className="text-sm font-bold text-[#25324B] group-hover:text-primary transition mb-1">
                  {company.name}
                </h3>

                {/* Location from first job */}
                <p className="text-xs text-gray-400 flex items-center gap-1 mb-3">
                  <FiMapPin size={11} />
                  {company.jobs[0]?.location}
                </p>

                {/* Categories */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {[...new Set(company.jobs.map((j) => j.category))]
                    .slice(0, 2)
                    .map((cat) => (
                      <span
                        key={cat}
                        className="text-xs bg-indigo-50 text-indigo-500 px-2 py-0.5 rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                </div>

                {/* Job Count */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <FiBriefcase size={11} />
                    {company.jobs.length} open{" "}
                    {company.jobs.length === 1 ? "job" : "jobs"}
                  </span>
                  <span className="text-xs text-primary font-semibold group-hover:underline">
                    View jobs →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <span className="text-primary font-black text-base">
                    {selectedCompany.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-[#25324B]">
                    {selectedCompany}
                  </h2>
                  <p className="text-xs text-gray-400">
                    {selectedJobs.length} open{" "}
                    {selectedJobs.length === 1 ? "job" : "jobs"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCompany(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-gray-600"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto px-6 py-4 flex flex-col gap-3">
              {selectedJobs.map((job) => (
                <div
                  key={job._id}
                  className="border border-gray-100 rounded-xl p-4 hover:border-primary hover:shadow-sm transition cursor-pointer"
                  onClick={() => {
                    setSelectedCompany(null);
                    window.location.href = `/jobs/${job._id}`;
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-bold text-[#25324B]">
                      {job.title}
                    </h3>
                    <div className="flex gap-2 shrink-0 ml-2">
                      <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium">
                        {job.jobType}
                      </span>
                      <span className="text-xs bg-indigo-50 text-indigo-500 px-2 py-0.5 rounded-full font-medium">
                        {job.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                      <FiMapPin size={11} /> {job.location}
                    </span>
                    <span>
                      {new Date(job.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 line-clamp-2">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100">
              <button
                onClick={() => setSelectedCompany(null)}
                className="w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCompanies;