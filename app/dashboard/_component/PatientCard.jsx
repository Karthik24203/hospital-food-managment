import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

function PatientCard({ patient }) {
  return (
    <div>
      <div className="grid grid-cols-5 text-center px-3 py-2 border shadow-md m-2 rounded-md">
        <h2>{patient.patientName}</h2>
        <p>{patient.roomNumber}</p>
        <p>{patient.bedNumber}</p>
        <p>{patient.diseases}</p>

        <div className="flex gap-3 justify-center items-center">
          <Link
            href={{
              pathname: "/dashboard/food",
              query: {
                id: patient.id,
                name: patient.patientName,
              },
            }}
          >
            <Button className="bg-blue-600 text-white">
              <PlusCircleIcon /> Food
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PatientCard;
