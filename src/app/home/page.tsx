'use client';

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Game1 from "../../components/Game1";

export default function Home() {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = React.useState<boolean | null>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn !== 'true') {
      router.push('/auth/not-authorized');
      setIsAllowed(false);
    } else {
      setIsAllowed(true);
    }
  }, [router]);

  if (isAllowed === null) {
    return null; // bisa diganti loading
  }

  if (!isAllowed) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen">
      <h1 className="text-4xl font-bold mb-4">Selamat Datang!</h1>
      <Game1 />
    </div>
  );
}