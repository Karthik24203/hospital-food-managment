import { db } from "@/config/db";
import { Meals } from "@/config/schema";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const result = await db.select().from(Meals);
    return NextResponse.json({ result: result });
  } catch (error) {}
}
