"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Delivery() {
  const [meals, setMeals] = useState([]);
  const [patients, setPatients] = useState({});

  const fetchMeal = async () => {
    try {
      const response = await axios.get("/api/get-meal");
      setMeals(response.data.result);
      console.log(response.data.result);
    } catch (error) {
      console.error("Error fetching meal data:", error);
    }
  };

  const fetchPatientData = async () => {
    try {
      const response = await axios.get("/api/get-patient");

      const patientDict = response.data.patients.reduce((acc, patient) => {
        acc[patient.id] = patient;
        return acc;
      }, {});
      setPatients(patientDict);
      console.log(response.data.patients);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  const markAsDelivered = async (mealId) => {
    try {
      const response = await axios.post("/api/up-delivered", { mealId });
      if (response.data.success) {
        setMeals((prevMeals) =>
          prevMeals.map((meal) =>
            meal.id === mealId ? { ...meal, deliveryStatus: "delivered" } : meal
          )
        );
      }
    } catch (error) {
      console.error("Error updating delivery status:", error);
    }
  };

  useEffect(() => {
    fetchMeal();
    fetchPatientData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4">
      <h1 className="text-center text-2xl font-bold mb-6">Delivery Status</h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {meals.length > 0 ? (
          meals.map((meal) => {
            const patient = patients[meal.patientId];

            return (
              <div key={meal.id} className="bg-white p-5 rounded-lg shadow-lg">
                <h2 className="text-xl flex flex-col gap-1 font-semibold text-blue-600 mb-3">
                  {meal.mealName}
                </h2>

                <div className="text-sm mb-2">
                  <strong>Meal Time:</strong> {meal.mealTime}
                </div>
                <div className="text-sm mb-2">
                  <strong>Ingredients:</strong> {meal.mealIngredients}
                </div>
                <div className="text-sm mb-2">
                  <strong>Cook:</strong> {meal.cook}
                </div>
                <div className="text-sm mb-4">
                  <strong>Deliverer:</strong> {meal.deliverer}
                </div>

                {patient && (
                  <div className="text-sm flex flex-col gap-1 text-gray-500 mb-4">
                    <p>
                      <strong>Patient:</strong> {patient.patientName}{" "}
                    </p>
                    <br />
                    <p>
                      <strong>Room Number:</strong> {patient.roomNumber}
                    </p>{" "}
                    <br />
                    <p>
                      <strong>Bed Number:</strong> {patient.bedNumber}
                    </p>
                  </div>
                )}

                {meal.deliveryStatus === "delivered" ? (
                  <div className="text-sm text-green-500 font-semibold">
                    Status: Delivered
                  </div>
                ) : (
                  <div className="text-sm text-red-500 font-semibold">
                    Status: Not Delivered
                  </div>
                )}

                {meal.deliveryStatus === "not-delivered" && (
                  <button
                    onClick={() => markAsDelivered(meal.id)}
                    className="w-full py-2 text-md bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    Mark as Delivered
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">
            No meals to be delivered at the moment.
          </p>
        )}
      </div>
    </div>
  );
}

export default Delivery;
