import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const formData = await req.json();
    const client = await clerkClient();
    console.log(formData);

    const userInfo = await db
      .select()
      .from(Users)
      .where(eq(Users.email, formData.email));

    if (userInfo?.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const user = await client.users.createUser({
      emailAddress: [formData.email],
      password: formData.password,
    });

    const addStaff = await db.insert(Users).values({
      name: formData.name,
      email: formData.email,
      designation: formData.designation,
    });

    return NextResponse.json({ success: "success" });
  } catch (error) {
    console.error("Error fetching user info:", error);
    return NextResponse.json(
      { error: error.message, details: error },
      { status: 400 }
    );
  }
}
