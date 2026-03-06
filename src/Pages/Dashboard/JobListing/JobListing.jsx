import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";
import Loading from "../../../Components/Common/Loading/Loading";
import { Link } from "react-router";

const JobListing = () => {
  const { user } = use(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs by user email
  useEffect(() => {
    if (user?.email) {
      fetch(`${BASE_URL}/my-jobs?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setJobs(data);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Failed to fetch jobs.");
          setLoading(false);
        });
    }
  }, [user]);

  // Delete job
  const handleDelete = (id) => {
    fetch(`${BASE_URL}/jobs/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Job deleted successfully!");
        setJobs((prev) => prev.filter((job) => job._id !== id));
      })
      .catch(() => {
        toast.error("Failed to delete job.");
      });
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <>
      <div className="max-w-5xl mx-auto my-10 px-4">
        <h2 className="text-3xl font-extrabold text-center text-black mb-8">
          My Job Listings
        </h2>

        {jobs.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-xl font-medium">No jobs posted yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white border border-gray-100 rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition"
              >
                {/* Top: Category Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
                    {job.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(job.created_at).toLocaleDateString()}
                  </span>
                </div>

                {/* Job Title & Company */}
                <div className="mb-3">
                  <h3 className="text-lg font-bold text-gray-800">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">
                    {job.company}
                  </p>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                  <span>📍</span>
                  <span>{job.location}</span>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/jobs/${job._id}`}
                    className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition duration-150 text-center"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition duration-150"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Toaster />
    </>
  );
};

export default JobListing;
