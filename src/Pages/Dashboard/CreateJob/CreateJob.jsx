import React, { use } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../../Provider/AuthProvider";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";

const CreateJob = () => {
  const { user } = use(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title: e.target.title.value,
      company: e.target.company.value,
      location: e.target.location.value,
      category: e.target.category.value,
      jobType: e.target.jobType.value,
      description: e.target.description.value,
      created_at: new Date(),
      postedByEmail: user.email,
      postedByName: user.displayName,
    };

    fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
    if (data.success) {
      toast.success("Job has been posted successfully!");
      e.target.reset();
    } else {
      if (data.errors) {
        data.errors.forEach((err) => toast.error(err));
      } else {
        toast.error("Failed to post job.");
      }
    }
      })
      .catch(() => {
        toast.error("Failed to post job. Please try again.");
      });
  };

  return (
    <>
      <div className="max-w-xl mx-auto my-10 p-6 bg-white rounded-xl shadow-2xl border border-gray-100">
        <h2 className="text-3xl text-center font-extrabold text-black mb-6 pb-3">
          Post a New Job
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Title:
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g., Frontend Developer"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company:
            </label>
            <input
              type="text"
              name="company"
              required
              placeholder="e.g., Google"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location:
            </label>
            <input
              type="text"
              name="location"
              required
              placeholder="e.g., New York, NY or Remote"
              className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category:
            </label>
            <select
              defaultValue=""
              name="category"
              required
              className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Category</option>
              <option value="Engineering">Engineering</option>
              <option value="Technology">Technology</option>
              <option value="Business">Business</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Sales">Sales</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {/* Job Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Type:
            </label>
            <select
              defaultValue=""
              name="jobType"
              required
              className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Job Type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Description:
            </label>
            <textarea
              name="description"
              required
              rows="5"
              placeholder="Describe the role, responsibilities, requirements..."
              className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-y"
            />
          </div>

          {/* Posted By (Read-only) */}
          <div className="pt-2 border-t mt-4 border-gray-200">
            <p className="text-lg font-semibold text-gray-700 mb-2">
              Posted By:
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-500">
                User Name:
              </label>
              <input
                type="text"
                value={user.displayName}
                name="UserName"
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-600 sm:text-sm cursor-not-allowed"
              />
            </div>

            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-500">
                User Email:
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-600 sm:text-sm cursor-not-allowed"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Post Job
          </button>
        </form>
      </div>

      <Toaster />
    </>
  );
};

export default CreateJob;
