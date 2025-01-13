"use client"; // Needed for client-side interactivity in Next.js components

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // For getting the current route
import Link from "next/link"; // Next.js Link for navigation
import { Button } from "@/components/ui/button";
import axios from "axios";
import { UserButton, useUser } from "@clerk/nextjs";

function Sidebar() {
  const pathname = usePathname();
  const [designation, setDesignation] = useState(null);
  const [email, setEmail] = useState(null); // Initialize email state to null
  const { user } = useUser();

  // Fetch staff details (e.g., for logged-in user)
  const fetchStaff = async (userEmail) => {
    try {
      const { data } = await axios.get("/api/get-staff");
      const loggedInUser = data.result.find(
        (staff) => staff.email === userEmail
      );

      if (loggedInUser) {
        setDesignation(loggedInUser.designation);
      }
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  useEffect(() => {
    // Wait for the user object to be available
    if (user?.primaryEmailAddress?.emailAddress) {
      const emailAddress = user.primaryEmailAddress.emailAddress;
      setEmail(emailAddress);
      fetchStaff(emailAddress); // Fetch staff data with email
    }
  }, [user]);

  // Helper function to check if the route matches
  const isActive = (path) => pathname === path;

  // Render the sidebar based on the designation
  const renderSidebarContent = () => {
    if (designation === "Manager") {
      return (
        <>
          <Link href="/dashboard">
            <Button
              className={`w-full py-2 text-md active:bg-slate-500 ${
                isActive("/dashboard") ? "bg-white text-blue-500" : "text-white"
              }`}
            >
              Patients
            </Button>
          </Link>
          <Link href="/dashboard/staff">
            <Button
              className={`w-full py-2 text-md active:bg-slate-500 ${
                isActive("/dashboard/staff")
                  ? "bg-white text-blue-500"
                  : "text-white"
              }`}
            >
              Staff
            </Button>
          </Link>
        </>
      );
    }

    if (designation === "Cook") {
      return (
        <Link href="/dashboard">
          <Button
            className={`w-full py-2 text-md active:bg-slate-500 bg-white text-blue-500`}
          >
            Food Prepare
          </Button>
        </Link>
      );
    }

    if (designation === "Deliverer") {
      return (
        <Link href="/dashboard">
          <Button
            className={`w-full py-2 text-md active:bg-slate-500 bg-white text-blue-500`}
          >
            Food Delivers
          </Button>
        </Link>
      );
    }

    return <p className="text-white">No designation found</p>;
  };

  return (
    <div className="flex flex-col w-fit gap-2 px-5 py-2 bg-blue-500 h-screen">
      <h2 className="text-white flex justify-center gap-3 items-center text-center font-semibold text-xl">
        Dashboard <UserButton />
      </h2>
      {renderSidebarContent()}
    </div>
  );
}

export default Sidebar;
