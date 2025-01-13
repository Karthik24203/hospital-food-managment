"use client";

import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import PatientCard from "./PatientCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function PatientList() {
  const [patient, setPatientList] = useState([]);
  const fetchList = async () => {
    try {
      const patientList = await axios.get("/api/get-patient");
      console.log("Fetched patient list:", patientList.data.patients);
      setPatientList(patientList.data.patients);
    } catch (error) {
      console.error("Error fetching patient list:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="overflow-y-auto flex-1 ">
      <h2 className=" text-3xl font-semibold text-center my-3">Patient List</h2>
      <div className=" flex w-full justify-center">
        <Link href="/patients/details">
          <Button className="hover:bg-gray-500 active:bg-blue-600">
            <Plus /> Add
          </Button>
        </Link>
      </div>
      <div
        className=" grid grid-cols-5 text-center bg-gray-200  px-3 py-2 mx-2 mt-1
        font-semibold text-xl rounded-md"
      >
        <h2>Name</h2>
        <h2>Room Number</h2>
        <h2>Bed Number</h2>
        <h2>Diseases</h2>
      </div>
      {patient.length === 0 ? (
        <div>
          <Skeleton className="w-700px  h-[50px]  m-2 rounded-md" />
          <Skeleton className="w-700px  h-[50px]  m-2 rounded-md" />
          <Skeleton className="w-700px  h-[50px]  m-2 rounded-md" />
          <Skeleton className="w-700px  h-[50px]  m-2 rounded-md" />
          <Skeleton className="w-700px  h-[50px]  m-2 rounded-md" />
          <Skeleton className="w-700px  h-[50px]  m-2 rounded-md" />
        </div>
      ) : (
        patient.map((item, index) => {
          return <PatientCard key={index} patient={item} />;
        })
      )}
    </div>
  );
}

export default PatientList;
