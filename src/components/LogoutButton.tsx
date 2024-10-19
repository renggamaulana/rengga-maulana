import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase"; // Pastikan Anda mengimpor auth dari konfigurasi Firebase Anda
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuLogOut } from "react-icons/lu";

const LogoutButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user:any) => {
      setUser(user); // Update status user
    });

    return () => unsubscribe(); // Bersihkan listener saat komponen di-unmount
  }, []);

  const handleLogout = async () => {
    setLoading(true); // Set loading state saat proses logout
    try {
      await signOut(auth); // Logout dari Firebase
      router.push("/login"); // Arahkan pengguna ke halaman login setelah logout
    } catch (error:any) {
      console.error("Error logging out: ", error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
        {user? (
        <button
            onClick={handleLogout} 
            className="bg-red-500 text-white p-2 rounded"
            disabled={loading} // Nonaktifkan tombol saat loading
            >
            {loading ? "Logging out..." : <LuLogOut className="text-sm" />}
        </button>) : null}
    </>

  );
};

export default LogoutButton;
