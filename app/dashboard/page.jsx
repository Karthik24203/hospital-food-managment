"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./_component/Sidebar";
import PatientList from "./_component/PatientList";
import FoodtoCook from "./_component/FoodtoCook";
import Delivery from "./_component/Delivery";
import { useUser } from "@clerk/nextjs"; // To access the user details
import axios from "axios";

function Pages() {
  const [designation, setDesignation] = useState(null);
  const { user } = useUser();
  const [loading, setLoading] = useState(true); // For handling the loading state

  // Fetch staff details based on the logged-in user's email
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
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      const emailAddress = user.primaryEmailAddress.emailAddress;
      fetchStaff(emailAddress); // Fetch staff data based on email
    }
  }, [user]);

  // Render page content based on the user's designation
  const renderPageContent = () => {
    if (loading) {
      return <p>Loading...</p>; // Show loading while fetching data
    }

    if (designation === "Manager") {
      return <PatientList />; // Render PatientList for Manager
    }

    if (designation === "Cook") {
      return <FoodtoCook />; // Render FoodtoCook for Cook
    }

    if (designation === "Deliverer") {
      return <Delivery />; // Render Delivery for Deliverer
    }

    return <p>No page content available for your designation.</p>; // Fallback if no matching designation
  };

  return (
    <div className="flex">
      <div className="flex-1 p-5">
        {renderPageContent()} {/* Render page content based on designation */}
      </div>
    </div>
  );
}

export default Pages;
