import type { ReactNode } from "react";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Todo",
  description: "Next + DaisyUI Todo",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="min-h-screen">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
