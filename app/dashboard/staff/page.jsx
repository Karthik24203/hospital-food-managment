"use client";

import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import React, { useEffect, useState } from "react";
import StaffCard from "./_components/StaffCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddStaff from "./_components/AddStaff";

function Staff() {
  const [staff, setStaff] = useState([]);
  const [add, setAdd] = useState(false);

  const fetchStaff = async () => {
    try {
      const staffList = await axios.get("/api/get-staff");
      console.log(staffList);
      setStaff(staffList.data.result);
    } catch (error) {
      console.error("Error fetching staff list:", error);
    }
  };
  useEffect(() => {
    fetchStaff();
  }, []);

  return (
    <div>
      <h2 className=" text-3xl font-semibold text-center">Staff List</h2>
      <div className=" w-full flex flex-col items-center justify-center my-2">
        <Button
          onClick={() => setAdd((prev) => !prev)}
          className=" hover:bg-gray-500 active:bg-blue-600"
        >
          {" "}
          <Plus /> Add
        </Button>
        {add && <AddStaff setAdd={setAdd} />}
      </div>
      <div className=" ">
        <div
          className="grid grid-cols-4 text-center bg-gray-200  px-3 py-2 mx-2 mt-1
        font-semibold text-xl rounded-md "
        >
          <h2>Name</h2>
          <h2>Email</h2>
          <h2>Designation</h2>
          <h2>Edit</h2>
        </div>
        {staff.length === 0 ? (
          <div>
            <Skeleton className="w-700px  h-[50px]  m-2 rounded-md" />
            <Skeleton className="w-700px  h-[50px]  m-2 rounded-md" />
            <Skeleton className="w-700px  h-[50px]  m-2 rounded-md" />
            <Skeleton className="w-700px  h-[50px]  m-2 rounded-md" />
            <Skeleton className="w-700px  h-[50px]  m-2 rounded-md" />
            <Skeleton className="w-700px  h-[50px]  m-2 rounded-md" />
          </div>
        ) : (
          staff.map((item, index) => <StaffCard key={index} staff={item} />)
        )}
      </div>
    </div>
  );
}

export default Staff;
