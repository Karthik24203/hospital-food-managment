import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PenLineIcon } from "lucide-react";
import axios from "axios";

function StaffCard({ staff }) {
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: staff.id,
    name: staff.name,
    email: staff.email,
    designation: staff.designation,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setEdit((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const pushEdit = await axios.post("/api/edit-staff", formData);
      setEdit(false); 
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="m-2">
      {!edit ? (
        <div className="grid grid-cols-4 text-center border shadow-md px-3 py-2 rounded-md">
          <p className="flex items-center justify-center h-full">
            {formData.name}
          </p>
          <p className="flex items-center justify-center h-full">
            {formData.email}
          </p>
          <p className={"flex items-center justify-center h-full"}>
            {formData.designation}
          </p>
          <div className="flex gap-3 justify-center items-center">
            <Button
              onClick={handleEdit}
              className="bg-blue-600 w-fit self-center text-white"
            >
              <PenLineIcon />
            </Button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-4 gap-3 bg-gray-400 py-3 px-1 mt-2 rounded-sm"
        >
          <div className="flex gap-2 items-center">
            <label className="block text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              className="mt-1 block w-full p-2 border rounded-md"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label className="block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="mt-1 block w-full p-2 border rounded-md"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="designation" className="block text-sm font-medium">
              Designation
            </label>
            <select
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
            >
              <option value="Manager">Manager</option>
              <option value="Cook">Cook</option>
              <option value="Deliverer">Deliverer</option>
            </select>
          </div>
          <div className="flex justify-center gap-4 items-center">
            <Button
              type="button"
              onClick={handleEdit}
              className="bg-gray-500 text-white"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 text-white">
              Save
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default StaffCard;
