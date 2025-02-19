import { useState } from "react";
import Header from "../MatcheTabs";
import MatchList from "../matchCards/Cards";

const tabs = [
  { id: "tab-1", icon: "fas fa-info-circle", label: "All Matches", status: "all" },
  { id: "tab-2", icon: "fas fa-list", label: "Available", status: "available" },
  { id: "tab-3", icon: "fas fa-envelope", label: "Pending", status: "pending" },
  { id: "tab-4", icon: "fas fa-question-circle", label: "Booked", status: "booked" },
];

export default function ModernTabs({ page }) {
  const [activeTab, setActiveTab] = useState("tab-1");

  return (
    <div className="w-100 flex flex-col items-center bg-dark rounded-4">
      
   
  
  {/* Left: Dropdown + Button with Space */}
  <div className="d-flex align-items-center justify-content-between  p-3 w-100">
    {/* 🔹 Dropdown (Takes Equal Space) */}
    <select
      className="text-white bg-dark p-2 border rounded-md flex-1"
      onChange={(e) => setActiveTab(e.target.value)}
      value={activeTab}
    >
      {tabs.map((tab) => (
        <option key={tab.id} value={tab.id} className="text-white bg-dark p-2">
          {tab.label}
        </option>
      ))}
    </select>

    {/* 🔹 New Bets Button (Takes Fixed Width) */}
    <button className="text-dark bg-warning p-2 rounded-md min-w-[140px]">
      New Bets
    </button>
  </div>


      {/* 🔹 Tabs */}
      <div className="hidden md:flex md:gap-4 px-4 mt-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 text-white font-semibold flex items-center gap-2 rounded-md transition-all duration-300 ${
              activeTab === tab.id ? "bg-indigo-700" : "hover:bg-indigo-700"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <i className={tab.icon}></i> {tab.label}
          </button>
        ))}
      </div>

      {/* 🔹 Header Component (Neeche Shift) */}
      <div className="w-full mt-4">
        <Header />
      </div>

      {/* 🔹 Tabs Content */}
      <div className="mt-6 p-6 bg-white shadow-lg rounded-lg w-full">
        <MatchList matchType={tabs.find(tab => tab.id === activeTab).status} />
      </div>
    </div>
  );
}
