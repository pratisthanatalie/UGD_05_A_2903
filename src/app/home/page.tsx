'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Game1 from "../../components/Game1";

export default function Home() {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn) {
      router.replace('/auth/not-authorized');
    } else {
      setIsAllowed(true);
    }

    setChecked(true);
  }, []);

  // ⛔ jangan render apa-apa sebelum cek selesai
  if (!checked) return null;

  // ⛔ kalau tidak login, jangan render halaman
  if (!isAllowed) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <h1 className="text-4xl font-bold mb-4">Selamat Datang!</h1>
      <Game1 />
    </div>
  );
}