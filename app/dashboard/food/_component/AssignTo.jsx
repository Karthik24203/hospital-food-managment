import axios from "axios";
import React, { useEffect, useState } from "react";

function AssignTo({ cook, delivery, setDelivery, setCook }) {
  const [staff, setStaff] = useState([]);

  const fetchStaff = async () => {
    try {
      const result = await axios.get("/api/get-staff");
      setStaff(result.data.result || []);
      console.log(result.data.result);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Assign Tasks to Staff
      </h2>

      {/* Cook Selection */}
      <div className="mb-4">
        <label
          htmlFor="cook"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Assign to Cook:
        </label>
        <div className="relative">
          {staff.length > 0 ? (
            <select
              name="cook"
              id="cook"
              value={cook}
              onChange={(e) => setCook(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select a Cook</option>
              {staff
                .filter((item) => item.designation === "Cook")
                .map((item, index) => (
                  <option value={item.name} key={index}>
                    {item.name}
                  </option>
                ))}
            </select>
          ) : (
            <p className="text-sm text-gray-500">No cooks available.</p>
          )}
        </div>
      </div>

      {/* Delivery Selection */}
      <div className="mb-4">
        <label
          htmlFor="delivery"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Assign to Delivery:
        </label>
        <div className="relative">
          {staff.length > 0 ? (
            <select
              name="delivery"
              id="delivery"
              value={delivery}
              onChange={(e) => setDelivery(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select a Delivery Staff</option>
              {staff
                .filter((item) => item.designation === "Deliverer")
                .map((item, index) => (
                  <option value={item.name} key={index}>
                    {item.name}
                  </option>
                ))}
            </select>
          ) : (
            <p className="text-sm text-gray-500">
              No delivery staff available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssignTo;
