import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase"; // Pastikan Anda mengimpor auth dari konfigurasi Firebase Anda
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi"; // Pastikan Anda mengimpor ikon yang dibutuhkan

const AuthButton = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user:any) => {
      setUser(user); // Update status user
    });

    return () => unsubscribe(); // Bersihkan listener saat komponen di-unmount
  }, []);

  return (
    <>
      {user ? ( // Cek hanya apakah ada user yang terautentikasi
        <button className="fixed bottom-10 right-10 lg:right-[70px]">
          <Link href="/blogs/create">
            <HiPencilAlt className="text-3xl text-gray-800 hover:text-cyan-500 dark:text-gray-50 dark:hover:text-cyan-500" />
          </Link>
        </button>
      ) : null} {/* Tombol hanya muncul jika ada user yang terautentikasi */}
    </>
  );
};

export default AuthButton;
