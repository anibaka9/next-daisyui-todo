"use client";

import LoadingPage from "@/components/LoadingPage";
import TopNav from "@/components/TopNav";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [router, user]);

  if (!user) {
    return <LoadingPage />;
  }
  return (
    <>
      <TopNav />
      {children}
    </>
  );
}
