import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { FiMapPin, FiBriefcase, FiCalendar, FiArrowLeft, FiX } from "react-icons/fi";
import { RiBuildingLine, RiTimeLine } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import BASE_URL from "../../ApiBaseUrl/ApiBaseUrl";
import Loading from "../../Components/Common/Loading/Loading";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    resumeLink: "",
    coverNote: "",
  });

  useEffect(() => {
    fetch(`${BASE_URL}/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data.result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${BASE_URL}/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          jobId: id,
          jobTitle: job.title,
          company: job.company,
          appliedAt: new Date(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Application submitted successfully!");
        setShowModal(false);
        setForm({ name: "", email: "", resumeLink: "", coverNote: "" });
      } else {
         if (data.errors) {
        data.errors.forEach((err) => toast.error(err));
      } else {
        toast.error("Failed to submit. Please try again.");
      }
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;
  if (!job) return (
    <div className="text-center py-20">
      <p className="text-gray-400 text-lg">Job not found.</p>
      <button onClick={() => navigate("/jobs")} className="mt-4 text-primary font-semibold hover:underline">
        Back to jobs
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-epilogue mt-15">

      {/* Back Button */}
      <div className="px-5 sm:px-10 lg:px-20 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition mb-6"
        >
          <FiArrowLeft /> Back to jobs
        </button>
      </div>

      <div className="px-5 sm:px-10 lg:px-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left - Main Content */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Job Header Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                  <span className="text-primary font-black text-xl">
                    {job.company?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-[#25324B] mb-1">
                    {job.title}
                  </h1>
                  <p className="text-sm text-gray-400 font-medium flex items-center gap-1">
                    <RiBuildingLine /> {job.company}
                  </p>
                </div>
                <span className="text-xs font-semibold bg-green-50 text-green-600 px-3 py-1 rounded-full shrink-0">
                  {job.jobType}
                </span>
              </div>

              {/* Tags Row */}
              <div className="flex flex-wrap gap-3 mt-5 pt-5 border-t border-gray-50 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <FiMapPin size={12} className="text-primary" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <FiBriefcase size={12} className="text-primary" />
                  {job.category}
                </span>
                <span className="flex items-center gap-1">
                  <FiCalendar size={12} className="text-primary" />
                  {new Date(job.created_at).toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <RiTimeLine size={12} className="text-primary" />
                  {job.jobType}
                </span>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-base font-extrabold text-[#25324B] mb-4">
                Job Description
              </h2>
              <div className="text-sm text-gray-500 leading-7 whitespace-pre-line">
                {job.description}
              </div>
            </div>

            {/* Posted By */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-base font-extrabold text-[#25324B] mb-3">
                Posted By
              </h2>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center">
                  <span className="text-white text-sm font-black">
                    {job.postedByName?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-700">{job.postedByName}</p>
                  <p className="text-xs text-gray-400">{job.postedByEmail}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Sidebar */}
          <div className="flex flex-col gap-5">

            {/* Apply Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-base font-extrabold text-[#25324B] mb-1">
                Interested in this role?
              </h2>
              <p className="text-xs text-gray-400 mb-5">
                Submit your application and we'll get back to you.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:opacity-90 transition text-sm"
              >
                Apply Now
              </button>
            </div>

            {/* Job Overview */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-base font-extrabold text-[#25324B] mb-4">
                Job Overview
              </h2>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Category</span>
                  <span className="font-semibold text-gray-700">{job.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Job Type</span>
                  <span className="font-semibold text-green-600">{job.jobType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Location</span>
                  <span className="font-semibold text-gray-700">{job.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Company</span>
                  <span className="font-semibold text-gray-700">{job.company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Posted</span>
                  <span className="font-semibold text-gray-700">
                    {new Date(job.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-extrabold text-[#25324B]">Apply for this Job</h2>
                <p className="text-xs text-gray-400">{job.title} · {job.company}</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-400"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleApply} className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="e.g. john@email.com"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resume Link (URL)
                </label>
                <input
                  type="url"
                  name="resumeLink"
                  required
                  value={form.resumeLink}
                  onChange={handleChange}
                  placeholder="e.g. https://drive.google.com/your-resume"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Note
                </label>
                <textarea
                  name="coverNote"
                  required
                  rows="4"
                  value={form.coverNote}
                  onChange={handleChange}
                  placeholder="Tell us why you're a great fit for this role..."
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:opacity-90 transition text-sm disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Toaster/>
    </div>
  );
};

export default JobDetails;