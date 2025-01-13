"use client";

import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import AssignTo from "./_component/AssignTo";
import axios from "axios";
import FoodCard from "./_component/FoodCard";

function Food() {
  const [mealName, setMealName] = useState(""); // For meal name
  const [mealIng, setMealIng] = useState(""); // For input ingredients
  const [ingredients, setIngredients] = useState([]); // Combined ingredients
  const [mealTime, setMealtime] = useState("");
  const search = useSearchParams();
  const [cook, setCook] = useState("");
  const [delivery, setDelivery] = useState("");
  const [clientSide, setClientSide] = useState(false);
  const [foodList, setFoodList] = useState(false);

  const commonInstructions = [
    "No Salt",
    "Low Salt",
    "No Sugar",
    "Low Sugar",
    "No Spices",
    "Low Spices",
    "Gluten Free",
    "Dairy Free",
  ];

  // Trigger this only after the client has mounted
  useEffect(() => {
    setClientSide(true);
  }, []);

  if (!clientSide) {
    return null; // Avoid rendering until the client is ready
  }

  const id = search.get("id");
  const name = search.get("name");

  const submitMeal = async () => {
    if (!mealName.trim()) {
      alert("Please enter a meal name!");
      return;
    }
    if (ingredients.length === 0) {
      alert("Please add at least one ingredient!");
      return;
    }
    console.log(id);
    const result = await axios.post("/api/add-food", {
      mealTime: mealTime,
      mealName: mealName,
      mealIngredients: ingredients.join(", "),
      cook: cook,
      deliverer: delivery,
      patientId: id,
    });

    console.log(result);

    // Reset form after submission
    setMealName("");
    setMealIng("");
    setIngredients([]);
  };

  const addIngredientFromInput = () => {
    if (mealIng.trim() !== "") {
      setIngredients((prev) => [...prev, mealIng.trim()]);
      setMealIng(""); // Clear input after adding
    }
  };

  const addIngredientFromButton = (ingredient) => {
    setIngredients((prev) => {
      if (!prev.includes(ingredient)) {
        return [...prev, ingredient]; // Avoid duplicate entries
      }
      return prev;
    });
  };

  const removeIngredient = (ingredientToRemove) => {
    setIngredients((prev) =>
      prev.filter((ingredient) => ingredient !== ingredientToRemove)
    );
  };

  return (
    <div className="m-3">
      <h2 className="text-xl font-semibold mb-4">{name}'s Meal Details</h2>
      <div className="flex flex-col items-center">
        <Button onClick={() => setFoodList((prev) => !prev)}>
          View Foods so far
        </Button>
        {foodList && <FoodCard id={id} />}
        <div className="w-1/2">
          <form className="w-full mt-3 border-2 p-4 rounded-md shadow">
            <div className="mb-4">
              <label
                htmlFor="mealTime"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Meal Time
              </label>
              <select
                className="border-2 rounded-md w-full text-center text-xl"
                name="mealTime"
                id="mealTime"
                defaultValue=""
                onChange={(e) => setMealtime(e.target.value)}
              >
                <option value="" disabled>
                  Select Meal Time
                </option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </select>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label
                  htmlFor="mealName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Meal Name
                </label>
                <input
                  type="text"
                  id="mealName"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  placeholder="Enter meal name"
                  className="rounded-md p-3 border-2 w-full"
                />
              </div>
              <AssignTo
                cook={cook}
                delivery={delivery}
                setDelivery={setDelivery}
                setCook={setCook}
              />

              <div>
                <label
                  htmlFor="mealIngredient"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Ingredients
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    id="mealIngredient"
                    value={mealIng}
                    onChange={(e) => setMealIng(e.target.value)}
                    placeholder="Enter ingredients"
                    className="rounded-md p-3 border-2 flex-1"
                  />
                  <Button
                    onClick={addIngredientFromInput}
                    type="button"
                    className="bg-blue-500 text-white"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center w-full gap-2 mt-4">
              <h4 className="w-full text-center mb-2 font-medium">
                Common Instructions:
              </h4>
              {commonInstructions.map((ing, index) => (
                <Button
                  type="button"
                  key={index}
                  onClick={() => addIngredientFromButton(ing)}
                  className="text-black hover:text-white p-2 bg-gray-200 rounded-md"
                >
                  {ing}
                </Button>
              ))}
            </div>

            <div className="mt-4">
              <h4 className="font-medium mb-2">Current Ingredients:</h4>
              <div className="flex flex-wrap gap-2 w-full">
                {ingredients.map((ingredient, idx) => (
                  <div
                    key={idx}
                    className="rounded-md flex gap-1 items-center bg-gray-300 px-2 py-1"
                  >
                    {ingredient}
                    <X
                      className="h-4 w-4 cursor-pointer"
                      onClick={() => removeIngredient(ingredient)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-4 justify-center">
              <Button
                onClick={submitMeal}
                type="button"
                className="bg-green-500"
              >
                Submit
              </Button>
              <Button
                variant="secondary"
                type="button"
                className="bg-red-500 text-white"
                onClick={() => {
                  setMealName("");
                  setMealIng("");
                  setIngredients([]);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Food;
