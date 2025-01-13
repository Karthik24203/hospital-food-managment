import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const result = await db.select().from(Users).orderBy(Users.id);
    return NextResponse.json({ result: result });
  } catch (error) {
    console.error("Error while fetching the staff details", error);
    return NextResponse.json({ error: error });
  }
}
