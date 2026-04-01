'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/auth/login'); // ✅ selalu ke login
  }, [router]);

  return null;
}