"use client";
import { Button } from "@/components/ui/button";
import { temp } from "@/data/temp";
import React, { useState } from "react";
import { X } from "lucide-react"; // Importing X icon from react-feather

function FoodChart() {
  const [meal, setMeal] = useState(false);
  const [mealName, setMealName] = useState("");
  const [mealIng, setMealIng] = useState(""); // For input ingredients
  const [ingredients, setIngredients] = useState([]); // Combined ingredients
  const [isMounted, setIsMounted] = useState(false);

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

  const submitMeal = () => {
    console.log("Meal Name:", mealName);
    console.log("Ingredients:", ingredients.join(", "));
    setMeal(false);
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

  // Function to remove ingredient when X is clicked
  const removeIngredient = (ingredientToRemove) => {
    setIngredients((prev) =>
      prev.filter((ingredient) => ingredient !== ingredientToRemove)
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-fit flex flex-col items-center">
        <Button className="w-full my-3" onClick={() => setMeal(true)}>
          Add Meal
        </Button>
        {meal ? (
          <div className="border-2 border-black p-5 *:mt-2 w-full">
            <div className="w-full">
              <select
                className="border-2 rounded-md w-full text-center text-xl"
                name="mealTime"
                id="mealTime"
                defaultValue=""
                onChange={(e) => console.log(e.target.value)} // Handle meal time selection
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
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                placeholder="Enter meal name"
                className="rounded-md p-3 border-2"
              />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={mealIng}
                  onChange={(e) => setMealIng(e.target.value)}
                  placeholder="Enter ingredients"
                  className="rounded-md p-5 border-2 flex-1"
                />
                <Button onClick={addIngredientFromInput}>Add</Button>
              </div>

              <div className="flex flex-wrap justify-center items-center w-[500px] gap-2">
                {commonInstructions.map((ing, index) => (
                  <Button
                    className="text-black hover:text-white p-2 bg-gray-200 rounded-md"
                    key={index}
                    onClick={() => addIngredientFromButton(ing)}
                  >
                    {ing}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <h4>Current Ingredients:</h4>
              <div className="flex flex-wrap gap-2 w-[500px]">
                {ingredients.map((ingredient, idx) => (
                  <p
                    key={idx}
                    className="rounded-md flex gap-1 items-center bg-gray-300 px-2"
                  >
                    {ingredient}
                    <X
                      className="h-4 w-5 cursor-pointer"
                      onClick={() => removeIngredient(ingredient)}
                    />
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <Button onClick={submitMeal}>Submit</Button>
              <Button variant="secondary" onClick={() => setMeal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}
        {["Morning", "Afternoon", "Evening", "Night"].map((time) => (
          <div key={time} className=" border-2 w-[600px] flex flex-col
     justify-center items-center flex-wrap my-2">
            <h3 className=" text-xl w-full text-center bg-blue-200">{time}</h3>
            {temp
              .filter((item) => item.time === time)
              .map((meal, index) => (
                <div key={index}>
                  <h4 className=" mt-2 text-xl font-semibold text-center">{meal.mealName}</h4>
                  <div className="p-2 flex gap-2">
                    {meal.mealIngredients.split(",").map((ingredient, idx) => (
                      <p key={idx} className="rounded-md bg-gray-300 px-2 py-1">
                        {ingredient.trim()}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodChart;
