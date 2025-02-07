import { useState } from "react";
import Header from "../MatcheTabs";
import MatchList from "../matchCards/Cards";
const tabs = [
  { id: "tab-1", icon: "fas fa-info-circle", label: "All Matches" },
  { id: "tab-2", icon: "fas fa-list", label: "Available" },
  { id: "tab-3", icon: "fas fa-envelope", label: "Pending" },
  { id: "tab-4", icon: "fas fa-question-circle", label: "Booked" },
];

export default function ModernTabs({page}) {
  const [activeTab, setActiveTab] = useState("tab-1");
  return (
    <div className="flex flex-col items-center bg-dark  mx-auto card">
      {/* Tabs Navigation - Switch to Select on Mobile */}
      <div className="">
        <div className="d-flex justify-content-end align-items-center   card-header">
          <select
            className="text-white bg-dark p-2"
            onChange={(e) => setActiveTab(e.target.value)}
            value={activeTab}
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id} className="text-white bg-dark p-2">{tab.label}</option>
            ))}
          </select>
          <Header />
          {page === "matches" && (
        <button className=" text-white bg-dark p-2">
          New Bets
        </button>
      )}
        </div>
        <div className="hidden md:flex md:gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 text-white font-semibold flex items-center gap-2 rounded-md transition-all duration-300 ${
                activeTab === tab.id ? "" : "hover:bg-indigo-700"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={tab.icon}></i> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs Content */}
      <div className="mt-6 p-6 bg-white shadow-lg rounded-lg w-full">
        {activeTab === "tab-1" && (
          <div>
            <h2 className="text-xl font-bold">All Matches</h2>
            <MatchList />
          </div>
        )}

        {activeTab === "tab-2" && (
          <div>
            <h2 className="text-xl font-bold">Details</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>Responsive across all devices</li>
              <li>Smooth animations and transitions</li>
              <li>Modern, gradient-based design</li>
              <li>Clean, easy-to-read fonts</li>
            </ul>
            <button className="mt-4 px-4 py-2 text-white rounded-md">
              Get Started
            </button>
          </div>
        )}

        {activeTab === "tab-3" && (
          <div>
            <h2 className="text-xl font-bold">Contact Us</h2>
            <form className="mt-4 space-y-3">
              <input type="text" placeholder="Your Name" className="w-full p-2 border rounded-md" />
              <input type="email" placeholder="Your Email" className="w-full p-2 border rounded-md" />
              <textarea placeholder="Your Message" className="w-full p-2 border rounded-md"></textarea>
              <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Submit
              </button>
            </form>
          </div>
        )}

        {activeTab === "tab-4" && (
          <div>
            <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
            <ul className="mt-4 text-gray-700">
              <li><strong>Q:</strong> What is this component for?</li>
              <li><strong>A:</strong> It’s a modern, interactive tab interface for websites.</li>
              <li><strong>Q:</strong> Is it responsive?</li>
              <li><strong>A:</strong> Yes! It’s built to work perfectly on any screen size.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
