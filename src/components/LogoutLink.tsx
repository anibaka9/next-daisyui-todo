"use client";

import { ReactNode } from "react";
import logOut from "@/firebase/auth/loguot";

export default function LogoutLink({ children }: { children: ReactNode }) {
  return <a onClick={logOut}>{children}</a>;
}
