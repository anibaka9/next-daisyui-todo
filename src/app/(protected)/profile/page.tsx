"use client";

import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/firebase/config";

export default function ProfilePage() {
  const [user] = useAuthState(auth);

  return (
    <>
      <h1 className="text-center text-3xl mb-3">
        {user ? user.email : "No Info"}
      </h1>
    </>
  );
}
