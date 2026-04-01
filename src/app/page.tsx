'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Game1 from '../components/Game1';

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      router.push('/auth/not-authorized');
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Game1 />
    </div>
  );
}