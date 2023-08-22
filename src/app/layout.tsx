import TopNav from "@/components/TopNav";
import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Todo",
  description: "Next + DaisyUI Todo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="min-h-screen">
      <body className="min-h-screen">
        <TopNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
