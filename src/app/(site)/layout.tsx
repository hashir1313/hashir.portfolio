import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-[100%] md:w-[700px] m-auto">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
