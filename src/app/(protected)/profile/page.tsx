"use client";

import { useAuthContext } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuthContext();

  return (
    <>
      <h1 className="text-center text-3xl mb-3">
        {user ? user.email : "No Info"}
      </h1>
    </>
  );
}
