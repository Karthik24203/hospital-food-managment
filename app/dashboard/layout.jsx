import React, { Suspense } from "react";
import Sidebar from "./_component/Sidebar";

function Dashboardlayout({ children }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>{" "}
    </Suspense>
  );
}

export default Dashboardlayout;
