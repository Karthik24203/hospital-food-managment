import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className=" flex flex-col gap-2 justify-center items-center h-screen">
      <p>*credentials as specified in the assignment</p>
      <p>Email: hospital_manager@xyz.com</p>
      <p>Email: hospital_pantry@xyz.com</p>
      <p>Email: hospital_delivery@xyz.com</p>
      <SignUp />
    </div>
  );
}
