'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Game1 from "../../components/Game1";

export default function Home() {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn) {
      router.replace('/auth/not-authorized'); // ❌ belum login → tolak
    } else {
      setIsAllowed(true); // ✅ sudah login → boleh masuk
    }
  }, [router]);

  if (!isAllowed) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Game1 />
    </div>
  );
}