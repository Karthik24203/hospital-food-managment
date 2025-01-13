"use client";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import React, { useState, useEffect } from "react";

const PatientDetailsForm = () => {
  // Use useEffect to initialize state after hydration
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    diseases: "",
    allergies: "",
    roomNumber: "",
    bedNumber: "",
    floorNumber: "",
    age: "",
    gender: "",
    contactInfo: "",
    emergencyContact: "",
  });

  // Set mounted state after initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mounted) return;

    try {
      setLoading(true);
      const result = await axios.post("/api/add-patients", formData);
      console.log("result:", result);
    } catch (error) {
      console.error("Error submitting the patient details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Don't render form until after hydration
  if (!mounted) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Patient Details</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Patient Name*
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter patient name"
            required
          />
        </div>

        <div>
          <label
            htmlFor="diseases"
            className="block text-sm font-medium text-gray-700"
          >
            Diseases*
          </label>
          <input
            id="diseases"
            type="text"
            name="diseases"
            value={formData.diseases}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter diseases"
            required
          />
        </div>

        <div>
          <label
            htmlFor="allergies"
            className="block text-sm font-medium text-gray-700"
          >
            Allergies
          </label>
          <input
            id="allergies"
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter allergies"
          />
        </div>

        <div>
          <label
            htmlFor="roomNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Room Number*
          </label>
          <input
            id="roomNumber"
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter room number"
            required
          />
        </div>

        <div>
          <label
            htmlFor="bedNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Bed Number*
          </label>
          <input
            id="bedNumber"
            type="text"
            name="bedNumber"
            value={formData.bedNumber}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter bed number"
            required
          />
        </div>

        <div>
          <label
            htmlFor="floorNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Floor Number*
          </label>
          <input
            id="floorNumber"
            type="text"
            name="floorNumber"
            value={formData.floorNumber}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter floor number"
            required
          />
        </div>

        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age*
          </label>
          <input
            id="age"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter age"
            required
          />
        </div>

        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Gender*
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="contactInfo"
            className="block text-sm font-medium text-gray-700"
          >
            Contact Information*
          </label>
          <input
            id="contactInfo"
            type="text"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter contact information"
            required
          />
        </div>

        <div>
          <label
            htmlFor="emergencyContact"
            className="block text-sm font-medium text-gray-700"
          >
            Emergency Contact
          </label>
          <input
            id="emergencyContact"
            type="text"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter emergency contact"
          />
        </div>

        <button
          type="submit"
          disabled={!mounted || loading}
          className="w-full bg-blue-500 text-white text-center flex justify-center py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? <LoaderCircle className="animate-spin" /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PatientDetailsForm;
