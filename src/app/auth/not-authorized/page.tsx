'use client';

import { useRouter } from 'next/navigation';

export default function NotAuthorized() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-2">
          ❌ Anda belum login
        </h2>
        <p className="text-gray-600 mb-4">
          Silakan login terlebih dahulu
        </p>
        <button
          onClick={() => router.push('/auth/login')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Kembali ke Login
        </button>
      </div>
    </div>
  );
}