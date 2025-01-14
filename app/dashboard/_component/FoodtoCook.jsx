"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

function FoodtoCook() {
  const [meals, setMeals] = useState([]);

  const fetchMeal = async () => {
    try {
      const response = await axios.get("/api/get-meal");
      setMeals(response.data.result);
      console.log(response.data.result);
    } catch (error) {
      console.error("Error fetching meal data:", error);
    }
  };

  const handleCookedStatus = async (mealId) => {
    try {
      const response = await axios.post("/api/up-cooked", { mealId });
      if (response.data.success) {
        setMeals((prevMeals) =>
          prevMeals.map((meal) =>
            meal.id === mealId ? { ...meal, cookStatus: "cooked" } : meal
          )
        );
      }
    } catch (error) {
      console.error("Error updating cook status:", error);
    }
  };

  useEffect(() => {
    fetchMeal();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4">
      <h1 className="text-center text-2xl font-bold mb-6">
        Foods to be Prepared
      </h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div key={meal.id} className="bg-white p-5 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-blue-600 mb-3">
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

              <div className="text-sm text-gray-500 mb-4">
                <strong>Patient ID:</strong> {meal.patientId}
              </div>

              {meal.cookStatus === "not-cooked" && (
                <button
                  onClick={() => handleCookedStatus(meal.id)}
                  className="w-full py-2 text-white bg-green-600 rounded hover:bg-green-700"
                >
                  Mark as Cooked
                </button>
              )}

              <div className="mt-2 text-sm">
                <strong>Status: </strong>
                <span
                  className={
                    meal.cookStatus === "cooked"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {meal.cookStatus === "cooked" ? "Cooked" : "Not Cooked"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No meals to be prepared at the moment.
          </p>
        )}
      </div>
    </div>
  );
}

export default FoodtoCook;
