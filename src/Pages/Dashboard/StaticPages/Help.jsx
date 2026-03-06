import React from "react";
import { RiQuestionLine, RiMailLine, RiFileTextLine, RiChat1Line } from "react-icons/ri";

const Help = () => {
  const faqs = [
    {
      q: "How do I post a job?",
      a: 'Click the "Post a Job" button in the top navigation bar and fill in the job details.',
    },
    {
      q: "How do I delete a job listing?",
      a: 'Go to "Job Listing" in the sidebar, find the job card and click the Delete button.',
    },
    {
      q: "How do I update my profile?",
      a: 'Navigate to "Company Profile" and click "Update Profile" to change your name or photo.',
    },
    {
      q: "How do I logout?",
      a: "Click on your company name in the top left corner and select Logout from the dropdown.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-extrabold text-gray-800 mb-1">Help Center</h1>
      <p className="text-sm text-gray-500 mb-8">Find answers and get support</p>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col items-center text-center gap-2">
          <div className="bg-indigo-100 p-3 rounded-full">
            <RiFileTextLine className="text-indigo-600 text-xl" />
          </div>
          <p className="font-bold text-gray-700 text-sm">Documentation</p>
          <p className="text-xs text-gray-400">Read our full guides</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col items-center text-center gap-2">
          <div className="bg-green-100 p-3 rounded-full">
            <RiChat1Line className="text-green-600 text-xl" />
          </div>
          <p className="font-bold text-gray-700 text-sm">Live Chat</p>
          <p className="text-xs text-gray-400">Chat with our support team</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col items-center text-center gap-2">
          <div className="bg-orange-100 p-3 rounded-full">
            <RiMailLine className="text-orange-500 text-xl" />
          </div>
          <p className="font-bold text-gray-700 text-sm">Email Support</p>
          <p className="text-xs text-gray-400">support@quickhire.com</p>
        </div>
      </div>

      {/* FAQs */}
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <RiQuestionLine className="text-primary" /> Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <p className="font-bold text-gray-700 text-sm mb-1">{faq.q}</p>
            <p className="text-sm text-gray-500">{faq.a}</p>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="mt-10 bg-indigo-50 rounded-xl p-6 text-center">
        <p className="text-gray-700 font-bold mb-1">Still need help?</p>
        <p className="text-sm text-gray-500 mb-4">Our support team is available Mon–Fri, 9am–6pm</p>
        <a
          href="mailto:support@quickhire.com"
          className="inline-block bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition text-sm"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default Help;