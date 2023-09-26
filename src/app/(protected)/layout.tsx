"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/firebase/config";
import LoadingPage from "@/components/LoadingPage";
import TopNav from "@/components/TopNav";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) router.push("/login");
  }, [router, loading, user]);

  if (loading || !user) {
    return <LoadingPage />;
  }
  return (
    <>
      <TopNav />
      {children}
    </>
  );
}
