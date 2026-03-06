import React, { useState } from "react";
import {
  RiBellLine,
} from "react-icons/ri";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    jobAlerts: false,
    messages: true,
  });


  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-extrabold text-gray-800 mb-1">Settings</h1>
      <p className="text-sm text-gray-500 mb-8">Manage your preferences</p>

      {/* Notifications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-5">
        <h2 className="text-md font-bold text-gray-700 mb-4 flex items-center gap-2">
          <RiBellLine className="text-primary" /> Notifications
        </h2>
        <div className="space-y-4">
          {[
            { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
            { key: "jobAlerts", label: "Job Alerts", desc: "Get notified about new applicants" },
            { key: "messages", label: "Message Notifications", desc: "Notify on new messages" },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-700">{label}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
              <div
                onClick={() => setNotifications({ ...notifications, [key]: !notifications[key] })}
                className={`w-11 h-6 flex items-center rounded-full cursor-pointer transition-colors duration-300 ${
                  notifications[key] ? "bg-primary" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    notifications[key] ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;