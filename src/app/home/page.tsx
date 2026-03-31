'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Game1 from "../../components/Game1";

export default function Home() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn) {
      router.replace('/auth/not-authorized');
    } else {
      setChecking(false);
    }
  }, []);

  if (checking) return null; 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <h1 className="text-4xl font-bold mb-4">Selamat Datang!</h1>
      <Game1 />
    </div>
  );
}