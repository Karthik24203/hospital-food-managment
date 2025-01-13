"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, X, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

const DietChartEditor = () => {
  const [meals, setMeals] = useState({
    morning: [],
    evening: [],
    night: [],
  });

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

  const addMeal = (mealTime) => {
    setMeals((prev) => ({
      ...prev,
      [mealTime]: [
        ...prev[mealTime],
        {
          name: "",
          ingredients: "",
          instructions: [],
        },
      ],
    }));
  };

  const removeMeal = (mealTime, index) => {
    setMeals((prev) => ({
      ...prev,
      [mealTime]: prev[mealTime].filter((_, i) => i !== index),
    }));
  };

  const updateMeal = (mealTime, index, field, value) => {
    setMeals((prev) => {
      const newMeals = { ...prev };
      newMeals[mealTime][index] = {
        ...newMeals[mealTime][index],
        [field]: value,
      };
      return newMeals;
    });
  };

  const addInstruction = (mealTime, mealIndex, instruction) => {
    setMeals((prev) => {
      const newMeals = { ...prev };
      if (!newMeals[mealTime][mealIndex].instructions.includes(instruction)) {
        newMeals[mealTime][mealIndex].instructions = [
          ...newMeals[mealTime][mealIndex].instructions,
          instruction,
        ];
      }
      return newMeals;
    });
  };

  const removeInstruction = (mealTime, mealIndex, instruction) => {
    setMeals((prev) => {
      const newMeals = { ...prev };
      newMeals[mealTime][mealIndex].instructions = newMeals[mealTime][
        mealIndex
      ].instructions.filter((i) => i !== instruction);
      return newMeals;
    });
  };

  const MealCard = ({ mealTime, meals, title }) => (
    <Card className="mb-6">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-lg font-semibold capitalize">
          {title}
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => addMeal(mealTime)}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          Add Meal
        </Button>
      </CardHeader>
      <CardContent>
        {meals.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No meals added. Click 'Add Meal' to begin.
          </p>
        ) : (
          meals.map((meal, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <Input
                      placeholder="Enter meal name"
                      value={meal.name}
                      onChange={(e) =>
                        updateMeal(mealTime, index, "name", e.target.value)
                      }
                      className="mb-2"
                    />
                    <Input
                      placeholder="Enter ingredients"
                      value={meal.ingredients}
                      onChange={(e) =>
                        updateMeal(
                          mealTime,
                          index,
                          "ingredients",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMeal(mealTime, index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {meal.instructions.map((instruction, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {instruction}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() =>
                            removeInstruction(mealTime, index, instruction)
                          }
                        />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {commonInstructions
                      .filter(
                        (instruction) =>
                          !meal.instructions.includes(instruction)
                      )
                      .map((instruction, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() =>
                            addInstruction(mealTime, index, instruction)
                          }
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          {instruction}
                        </Button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Patient Diet Chart</h1>
      <div className="space-y-6">
        <MealCard
          mealTime="morning"
          meals={meals.morning}
          title="Morning Meals"
        />
        <MealCard
          mealTime="evening"
          meals={meals.evening}
          title="Evening Meals"
        />
        <MealCard mealTime="night" meals={meals.night} title="Night Meals" />
      </div>
    </div>
  );
};

export default DietChartEditor;
