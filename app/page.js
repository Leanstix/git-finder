"use client"
import Home from "@/components/index";
import { useEffect, useState } from "react";

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null; // Prevents server-side rendering issues
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">GitHub User Finder</h1>
      <Home />
    </main>
  );
}