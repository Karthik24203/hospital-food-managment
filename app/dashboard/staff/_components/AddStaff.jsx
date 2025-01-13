"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useState } from "react";

function AddStaff({ setAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    designation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addStaff = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/add-staff", formData);

      if (response?.data?.error) {
        console.error("Error:", response.data.error);
        alert("Error: " + response.data.error);
        return;
      }

      console.log("Staff added successfully:", response.data);
      setAdd(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.", error);
    }
  };

  return (
    <div className="flex flex-col items-center my-2 justify-center bg-gray-300 p-4">
      <h2 className="mb-5 text-xl font-semibold">Add Staff</h2>
      <form onSubmit={addStaff} className="grid gap-5 grid-cols-2">
        <div className="items-center flex justify-between gap-4">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            className="py-3 px-2 rounded-md"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </div>
        <div className="items-center flex justify-between gap-4">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            className="w-72 py-3 px-2 rounded-md"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="flex justify-center text-center gap-2 items-center">
          <label htmlFor="designation">Designation</label>
          <select
            id="designation"
            name="designation"
            value={formData.designation || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="" disabled>
              Select Designation
            </option>
            <option value="Manager">Manager</option>
            <option value="Cook">Cook</option>
            <option value="Deliverer">Deliverer</option>
          </select>
        </div>

        <div className="items-center flex justify-between gap-4">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            className="w-72 py-3 px-2 rounded-md"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div className="flex gap-3 justify-center col-span-2">
          <Button type="submit">Submit</Button>
          <Button onClick={() => setAdd(false)} variant="secondary">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddStaff;
