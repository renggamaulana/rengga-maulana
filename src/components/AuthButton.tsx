import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase"; // Pastikan Anda mengimpor auth dari konfigurasi Firebase Anda
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi"; // Pastikan Anda mengimpor ikon yang dibutuhkan

interface AuthButtonProps {
  label: string;
  path:string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ label, path }) => {
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
        <button className="bg-orange-500 hover:bg-orange-600 p-2 rounded-lg">
          <Link href={path}>
            <span className="text-md font-semibold text-gray-800 hover:text-orange-500 dark:text-gray-50 dark:hover:text-gray-100">{label}</span>
          </Link>
        </button>
      ) : null} {/* Tombol hanya muncul jika ada user yang terautentikasi */}
    </>
  );
};

export default AuthButton;
