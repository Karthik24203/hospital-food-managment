import { db } from "@/config/db";
import { Meals } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const result = await db.select().from(Meals).where(eq(Meals.patientId, id));
    console.log(result);

    return NextResponse.json({ result: result });
  } catch (error) {
    console.error("Error fetching user info:", error);
    return NextResponse.json(
      { error: error.message, details: error },
      { status: 400 }
    );
  }
}
