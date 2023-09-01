"use client";

import TopNav from "@/components/TopNav";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/login");
  }, [router, user]);

  return (
    <>
      <TopNav />
      {children}
    </>
  );
}
