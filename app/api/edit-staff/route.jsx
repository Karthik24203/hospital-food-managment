import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.json();

    const updateStaff = await db
      .update(Users)
      .set({
        name: formData.name,
        email: formData.email,
        designation: formData.designation,
      })
      .where(eq(Users.id, formData.id))
      .returning();

    return NextResponse.json({ success: "success", updateStaff: updateStaff });
  } catch (error) {
    console.error("Error updating staff:", error);
    return NextResponse.json({ error: error });
  }
}
