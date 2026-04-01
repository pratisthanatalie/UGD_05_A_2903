'use client';

import { useRouter } from 'next/navigation';

export default function NotAuthorized() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen">
      
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-[350px] text-center">

        {/* IMAGE */}
        <img
          src="/gambar.jpg"
          alt="not authorized"
          className="w-full h-48 object-contain mb-4"
        />

        {/* TITLE */}
        <h2 className="text-lg font-semibold text-gray-800 flex justify-center items-center gap-2">
          <span className="text-red-500 text-xl">✖</span>
          Anda belum login
        </h2>

        {/* SUBTEXT */}
        <p className="text-sm text-gray-600 mt-2">
          Silakan login terlebih dahulu
        </p>

        {/* BUTTON */}
        <button
          onClick={() => router.push('/auth/login')}
          type="button"
          className="mt-4 bg-blue-500 text-white px-5 py-2 rounded-lg flex items-center justify-center gap-2 mx-auto hover:bg-blue-700 transition"
        >
          ← Kembali
        </button>

      </div>

    </div>
  );
}