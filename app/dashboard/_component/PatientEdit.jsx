import React, { useState } from "react";
import { Button } from "@/components/ui/button";

function PatientEdit({ patient, setEditing }) {
  const [formValues, setFormValues] = useState(patient);
  const handleEdit = () => {
    setEditing((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Compare formValues with patient to find changed fields
    const updatedFields = {};
    Object.keys(formValues).forEach((key) => {
      if (formValues[key] !== patient[key]) {
        updatedFields[key] = {
          fieldName: key,
          newValue: formValues[key],
        };
      }
    });

    console.log(updatedFields); // Log the changes
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-2 w-full grid grid-cols-2 gap-2 bg-gray-300 p-2 rounded-md"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Patient Name
        </label>
        <input
          id="patientName"
          type="text"
          onChange={handleChange}
          defaultValue={patient.patientName}
          className="mt-1 block w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="diseases" className="block text-sm font-medium">
          Diseases
        </label>
        <input
          id="diseases"
          type="text"
          onChange={handleChange}
          defaultValue={patient.diseases}
          className="mt-1 block w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="allergies" className="block text-sm font-medium">
          Allergies
        </label>
        <input
          id="allergies"
          type="text"
          onChange={handleChange}
          defaultValue={patient.allergies}
          className="mt-1 block w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="roomNumber" className="block text-sm font-medium">
          Room Number
        </label>
        <input
          id="roomNumber"
          type="text"
          onChange={handleChange}
          defaultValue={patient.roomNumber}
          className="mt-1 block w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="bedNumber" className="block text-sm font-medium">
          Bed Number
        </label>
        <input
          id="bedNumber"
          type="text"
          onChange={handleChange}
          defaultValue={patient.bedNumber}
          className="mt-1 block w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="floorNumber" className="block text-sm font-medium">
          Floor Number
        </label>
        <input
          id="floorNumber"
          type="text"
          onChange={handleChange}
          defaultValue={patient.floorNumber}
          className="mt-1 block w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium">
          Age
        </label>
        <input
          id="age"
          type="number"
          defaultValue={patient.age}
          className="mt-1 block w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="gender" className="block text-sm font-medium">
          Gender
        </label>
        <select
          id="gender"
          defaultValue={patient.gender}
          className="mt-1 block w-full p-2 border rounded-md"
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="contactInfo" className="block text-sm font-medium">
          Contact Information
        </label>
        <input
          id="contactInfo"
          type="text"
          onChange={handleChange}
          defaultValue={patient.contactInfo}
          className="mt-1 block w-full p-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="emergencyContact" className="block text-sm font-medium">
          Emergency Contact
        </label>
        <input
          id="emergencyContact"
          type="text"
          onChange={handleChange}
          defaultValue={patient.emergencyContact}
          className="mt-1 block w-full p-2 border rounded-md"
        />
      </div>
      <div className="col-span-2 flex justify-end gap-4">
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
  );
}

export default PatientEdit;
