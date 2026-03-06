import React, { useState, useEffect, use } from "react";
import { FiX, FiExternalLink, FiMail, FiBriefcase, FiCalendar } from "react-icons/fi";
import { RiBuilding2Line, RiUserLine } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";
import Loading from "../../../Components/Common/Loading/Loading";
import { AuthContext } from "../../../Provider/AuthProvider";

const ApplicantsList = () => {
     const { user } = use(AuthContext);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${BASE_URL}/jobs?email=${user.email}`)
      .then((res) => res.json())
      .then((jobs) => {
        if (jobs.length === 0) {
          setLoading(false);
          return;
        }

        const company = jobs[0].company;
        fetch(`${BASE_URL}/applications?company=${encodeURIComponent(company)}`)
          .then((res) => res.json())
          .then((data) => {
            setApplicants(data);
            setLoading(false);
          })
          .catch(() => {
            toast.error("Failed to fetch applicants.");
            setLoading(false);
          });
      })
      .catch(() => {
        toast.error("Failed to fetch company.");
        setLoading(false);
      });
  }, [user]);


  const filtered = applicants.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 font-epilogue">
      <div className="max-w-6xl mx-auto py-8 px-4">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-[#25324B]">All Applicants</h1>
            <p className="text-sm text-gray-400 mt-1">{filtered.length} total applications</p>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2.5 sm:w-72">
            <RiUserLine className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search name, job.."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent w-full text-sm outline-none text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl font-bold text-gray-300">No applicants found</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden sm:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                    <th className="text-left px-6 py-4 font-semibold">Applicant</th>
                    <th className="text-left px-6 py-4 font-semibold">Job</th>
                    <th className="text-left px-6 py-4 font-semibold">Company</th>
                    <th className="text-left px-6 py-4 font-semibold">Applied</th>
                    <th className="text-left px-6 py-4 font-semibold">CV</th>
                    <th className="text-left px-6 py-4 font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((applicant, i) => (
                    <tr
                      key={applicant._id}
                      className={`border-b border-gray-50 hover:bg-gray-50 transition ${
                        i === filtered.length - 1 ? "border-none" : ""
                      }`}
                    >
                      {/* Applicant */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                            <span className="text-primary font-black text-sm">
                              {applicant.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-bold text-[#25324B]">{applicant.name}</p>
                            <p className="text-xs text-gray-400">{applicant.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Job */}
                      <td className="px-6 py-4">
                        <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full font-medium">
                          {applicant.jobTitle}
                        </span>
                      </td>

                      {/* Company */}
                      <td className="px-6 py-4 text-gray-500 font-medium">
                        {applicant.company}
                      </td>

                      {/* Applied At */}
                      <td className="px-6 py-4 text-gray-400 text-xs">
                        {new Date(applicant.appliedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>

                      {/* CV Link */}
                      <td className="px-6 py-4">
                        <a
                          href={applicant.resumeLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
                        >
                          View CV <FiExternalLink size={11} />
                        </a>
                      </td>

                      {/* Details */}
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelected(applicant)}
                          className="text-xs bg-primary text-white font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden flex flex-col gap-4">
              {filtered.map((applicant) => (
                <div
                  key={applicant._id}
                  className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                      <span className="text-primary font-black">
                        {applicant.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-[#25324B] text-sm">{applicant.name}</p>
                      <p className="text-xs text-gray-400">{applicant.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">
                      {applicant.jobTitle}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                      {applicant.company}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={applicant.resumeLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center text-xs bg-indigo-50 text-primary font-semibold py-2 rounded-lg hover:opacity-90"
                    >
                      View CV
                    </a>
                    <button
                      onClick={() => setSelected(applicant)}
                      className="flex-1 text-xs bg-primary text-white font-semibold py-2 rounded-lg hover:opacity-90"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/*Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-lg font-extrabold text-[#25324B]">Application Details</h2>
              <button
                onClick={() => setSelected(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-400"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-5 flex flex-col gap-4">

              {/* Applicant Info */}
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <span className="text-primary font-black text-lg">
                    {selected.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-extrabold text-[#25324B]">{selected.name}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <FiMail size={11} /> {selected.email}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400 flex items-center gap-1">
                    <FiBriefcase size={13} /> Job Title
                  </span>
                  <span className="font-semibold text-gray-700">{selected.jobTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 flex items-center gap-1">
                    <RiBuilding2Line size={13} /> Company
                  </span>
                  <span className="font-semibold text-gray-700">{selected.company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 flex items-center gap-1">
                    <FiCalendar size={13} /> Applied At
                  </span>
                  <span className="font-semibold text-gray-700">
                    {new Date(selected.appliedAt).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Cover Note */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Cover Note</p>
                <p className="text-sm text-gray-600 leading-6">{selected.coverNote}</p>
              </div>

              {/* CV Button */}
              <a
                href={selected.resumeLink}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 rounded-xl hover:opacity-90 transition text-sm"
              >
                <FiExternalLink size={15} /> View Full CV
              </a>

              <button
                onClick={() => setSelected(null)}
                className="w-full bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster/>
    </div>
  );
};

export default ApplicantsList;