import { db } from "@/config/db";
import { Patients } from "@/config/schema";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const patients = await db.select().from(Patients);
    return NextResponse.json({ patients: patients });
  } catch (error) {}
}
