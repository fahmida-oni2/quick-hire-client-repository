import React, { useState, useEffect, use } from "react";
import { RiArrowRightSLine, RiCalendarLine } from "react-icons/ri";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { AuthContext } from "../../../Provider/AuthProvider";
import BASE_URL from "../../../ApiBaseUrl/ApiBaseUrl";
import Loading from "../../../Components/Common/Loading/Loading";
import { Link } from "react-router";
import { FiExternalLink } from "react-icons/fi";
const jobTypeColors = {
  "Full Time": "#4640de",
  Internship: "#56cdad",
  "Part Time": "#26a4ff",
  Contract: "#ff6550",
  Remote: "#ffbe57",
  Freelance: "#a855f7",
};

const OverView = () => {
  const { user } = use(AuthContext);
  const [activeChart, setActiveChart] = useState("Overview");
  const [activeRange, setActiveRange] = useState("Week");
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    //  Fetch user's jobs
    fetch(`${BASE_URL}/my-jobs?email=${user.email}`)
      .then((res) => res.json())
      .then((jobData) => {
        setJobs(jobData);

        if (jobData.length === 0) {
          setLoading(false);
          return;
        }

        const company = jobData[0].company;

        // Fetch applicants for that company
        fetch(`${BASE_URL}/applications?company=${encodeURIComponent(company)}`)
          .then((res) => res.json())
          .then((appData) => {
            setApplicants(appData);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      })
      .catch(() => setLoading(false));
  }, [user]);

  const chartData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
    (day, i) => {
      const dayApplicants = applicants.filter(
        (a) => new Date(a.appliedAt).getDay() === (i + 1) % 7,
      ).length;
      const dayJobs = jobs.filter(
        (j) => new Date(j.created_at).getDay() === (i + 1) % 7,
      ).length;
      return { day, jobView: dayJobs, jobApplied: dayApplicants };
    },
  );

  //Applicants by job type
  const jobTypeCounts = applicants.reduce((acc, app) => {
    const job = jobs.find(
      (j) => j._id === app.jobId || j.title === app.jobTitle,
    );
    const type = job?.jobType || "Other";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const maxCount = Math.max(...Object.values(jobTypeCounts), 1);

  if (loading) return <Loading />;

  return (
    <div className="font-epilogue space-y-6">
      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
        <div>
          <h1 className="font-redhat text-xl sm:text-2xl font-black text-[#25324B]">
            Good morning, {user?.displayName?.split(" ")[0]} 👋
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Here is your job listings statistic report.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 border border-gray-200 rounded-lg px-3 py-2 bg-white shrink-0">
          <RiCalendarLine size={14} className="text-primary" />
          {new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-primary rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-4xl font-black text-white">
              {applicants.length}
            </p>
            <p className="text-white/80 text-sm mt-1">
              New candidates to review
            </p>
          </div>
          <RiArrowRightSLine size={24} className="text-white/60" />
        </div>
        <div className="bg-[#56cdad] rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-4xl font-black text-white">{jobs.length}</p>
            <p className="text-white/80 text-sm mt-1">Jobs posted by you</p>
          </div>
          <RiArrowRightSLine size={24} className="text-white/60" />
        </div>
        <div className="bg-[#26a4ff] rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-4xl font-black text-white">
              {[...new Set(applicants.map((a) => a.email))].length}
            </p>
            <p className="text-white/80 text-sm mt-1">Unique applicants</p>
          </div>
          <RiArrowRightSLine size={24} className="text-white/60" />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job Statistics Chart */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6">
            <div>
              <p className="font-bold text-[#25324B] text-sm">Job statistics</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Jobs posted vs Applications received this week
              </p>
            </div>
            <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1 shrink-0">
              {["Week", "Month", "Year"].map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRange(r)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    activeRange === r
                      ? "bg-primary text-white"
                      : "text-gray-400 hover:text-[#25324B]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Tabs */}
          <div className="flex gap-4 border-b border-gray-100 mb-6">
            {["Overview", "Jobs Posted", "Applications"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveChart(tab)}
                className={`text-xs font-semibold pb-2.5 border-b-2 transition-colors cursor-pointer ${
                  activeChart === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-400 hover:text-[#25324B]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Bar Chart */}
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} barCategoryGap="35%" barGap={4}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#9199a8" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#9199a8" }}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  fontSize: "12px",
                }}
                cursor={{ fill: "transparent" }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "11px", paddingTop: "16px" }}
                formatter={(value) =>
                  value === "jobView" ? "Jobs Posted" : "Applications"
                }
              />
              {(activeChart === "Overview" ||
                activeChart === "Jobs Posted") && (
                <Bar
                  dataKey="jobView"
                  fill="#f5c518"
                  radius={[4, 4, 0, 0]}
                  name="jobView"
                />
              )}
              {(activeChart === "Overview" ||
                activeChart === "Applications") && (
                <Bar
                  dataKey="jobApplied"
                  fill="#4640de"
                  radius={[4, 4, 0, 0]}
                  name="jobApplied"
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          {/* Job Open */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <p className="text-sm font-bold text-[#25324B] mb-3">Job Open</p>
            <div className="flex items-end gap-2">
              <p className="text-5xl font-black text-[#25324B]">
                {jobs.length}
              </p>
            </div>
            <p className="text-xs text-gray-400 mt-1">Jobs Posted</p>
          </div>

          {/* Applicants Summary */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 flex-1">
            <p className="text-sm font-bold text-[#25324B] mb-3">
              Applicants Summary
            </p>
            <div className="flex items-end gap-2 mb-1">
              <p className="text-5xl font-black text-[#25324B]">
                {applicants.length}
              </p>
            </div>
            <p className="text-xs text-gray-400 mb-4">Total Applicants</p>

            {/*  progress bars by job type */}
            <div className="space-y-2.5">
              {Object.entries(jobTypeCounts).length === 0 ? (
                <p className="text-xs text-gray-400">No applicants yet.</p>
              ) : (
                Object.entries(jobTypeCounts).map(([type, count]) => (
                  <div key={type}>
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span className="flex items-center gap-1.5">
                        <span
                          className="h-2 w-2 rounded-full inline-block"
                          style={{
                            backgroundColor: jobTypeColors[type] || "#ccc",
                          }}
                        />
                        {type}
                      </span>
                      <span className="font-semibold text-[#25324B]">
                        {count}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(count / maxCount) * 100}%`,
                          backgroundColor: jobTypeColors[type] || "#ccc",
                        }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Recent Applications */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <p className="font-bold text-[#25324B] text-sm">
              Recent Applications
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              Latest candidates who applied to your jobs
            </p>
          </div>
          <Link
            to="/dashboard/applicants"
            className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
          >
            View All <RiArrowRightSLine size={14} />
          </Link>
        </div>

        {applicants.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-sm text-gray-300 font-bold">
              No applications yet.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden sm:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                    <th className="text-left px-6 py-3 font-semibold">
                      Applicant
                    </th>
                    <th className="text-left px-6 py-3 font-semibold">Job</th>
                    <th className="text-left px-6 py-3 font-semibold">
                      Company
                    </th>
                    <th className="text-left px-6 py-3 font-semibold">
                      Applied
                    </th>
                    <th className="text-left px-6 py-3 font-semibold">CV</th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.slice(0, 5).map((applicant, i) => (
                    <tr
                      key={applicant._id}
                      className={`hover:bg-gray-50 transition ${
                        i !== Math.min(applicants.length, 5) - 1
                          ? "border-b border-gray-50"
                          : ""
                      }`}
                    >
                      {/* Applicant */}
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                            <span className="text-primary font-black text-xs">
                              {applicant.name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-bold text-[#25324B] text-xs">
                              {applicant.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {applicant.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Job */}
                      <td className="px-6 py-3">
                        <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full font-medium">
                          {applicant.jobTitle}
                        </span>
                      </td>

                      {/* Company */}
                      <td className="px-6 py-3 text-xs text-gray-500 font-medium">
                        {applicant.company}
                      </td>

                      {/* Applied At */}
                      <td className="px-6 py-3 text-xs text-gray-400">
                        {new Date(applicant.appliedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </td>

                      {/* CV */}
                      <td className="px-6 py-3">
                        <a
                          href={applicant.resumeLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
                        >
                          View CV <FiExternalLink size={11} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden flex flex-col divide-y divide-gray-50">
              {applicants.slice(0, 5).map((applicant) => (
                <div
                  key={applicant._id}
                  className="p-4 flex items-center gap-3"
                >
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                    <span className="text-primary font-black text-sm">
                      {applicant.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#25324B] text-sm truncate">
                      {applicant.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {applicant.email}
                    </p>
                    <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-medium">
                      {applicant.jobTitle}
                    </span>
                  </div>
                  <a
                    href={applicant.resumeLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-primary font-semibold hover:underline shrink-0"
                  >
                    CV
                  </a>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OverView;
