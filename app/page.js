"use client";
import { UserButton } from "@clerk/nextjs"; // Import Clerk's UserButton for authentication
import Link from "next/link"; // Import Next.js Link for navigation
import { Button } from "@/components/ui/button"; // Assuming you have a button component

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-blue-500 text-white">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Home Page!</h1>

      {/* User Button for Authentication */}
      <div className="mb-6">
        <UserButton />
      </div>

      {/* Button to redirect to Dashboard */}
      <Link href="/dashboard">
        <Button className="bg-blue-700 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200">
          Go to Dashboard
        </Button>
      </Link>
    </div>
  );
}
