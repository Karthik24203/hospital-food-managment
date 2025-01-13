import { db } from "@/config/db"; // Import your database connection
import { Meals } from "@/config/schema"; // Import your schema for Meals
import { eq } from "drizzle-orm"; // Import the eq function for query comparison

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

    // Update the deliveryStatus of the specified meal
    const updateDeliveryStatus = await db
      .update(Meals) // Reference to your Meals table
      .set({ deliveryStatus: "delivered" }) // Set the new deliveryStatus
      .where(eq(Meals.id, mealId)) // Find the meal by its ID
      .returning(); // Return the updated row

    // If update is successful
    if (updateDeliveryStatus) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Meal delivery status updated",
        }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, message: "Meal not found" }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error updating delivery status:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
