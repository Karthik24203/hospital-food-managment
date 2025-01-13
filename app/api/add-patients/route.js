import { db } from "@/config/db";
import { Patients } from "@/config/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const patient = await req.json();

    const upload = await db
      .insert(Patients)
      .values({
        patientName: patient.name,
        diseases: patient.diseases,
        allergies: patient.allergies,
        roomNumber: patient.roomNumber,
        bedNumber: patient.bedNumber,
        floorNumber: patient.floorNumber,
        age: patient.age,
        gender: patient.gender,
        contactInformation: patient.contactInfo,
        emergencyContact: patient.emergencyContact,
      })
      .returning();

    return NextResponse.json({ hello: upload });
  } catch (error) {
    console.error("error in uploading the patient data", error);
  }
}
