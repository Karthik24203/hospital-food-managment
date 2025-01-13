import { db } from "@/config/db"; // Import your database connection
import { Meals } from "@/config/schema"; // Import your schema for Meals
import { eq } from "drizzle-orm";
export async function POST(req) {
  try {
    // Extract the mealId from the request body
    const { mealId } = await req.json();

    // Check if mealId exists in the request body
    if (!mealId) {
      return new Response(
        JSON.stringify({ success: false, message: "Meal ID is required" }),
        { status: 400 }
      );
    }

    // Update the cookStatus of the specified meal
    const updateFoodStatus = await db
      .update(Meals) // Reference to your Meals table
      .set({ cookStatus: "cooked" }) // Set the new cookStatus
      .where(eq(Meals.id, mealId)) // Find the meal by its ID
      .returning(); // Return the updated row

    return new Response(
      JSON.stringify({ success: true, message: "Meal status updated" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating meal status:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
