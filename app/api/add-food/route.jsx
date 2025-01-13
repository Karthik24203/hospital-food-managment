import { db } from "@/config/db";
import { Meals } from "@/config/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.json();
    console.log(formData);
    const result = await db.insert(Meals).values(formData);
    return NextResponse.json({ hello: "hello" });
  } catch (error) {
    return NextResponse.json(
      { error: error.message, details: error },
      { status: 400 }
    );
  }
}
