import React from "react";
import Sidebar from "./_component/Sidebar";

function Dashboardlayout({ children }) {
  return (
    <div>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export default Dashboardlayout;
