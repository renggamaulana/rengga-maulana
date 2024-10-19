import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase";
import Loading from "./Loading";

const withAuth = (WrappedComponent:any) => {
  return (props:any) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user:any) => {
        if (user) {
          setUser(user);
        } else {
          router.push("/"); // Redirect ke halaman login jika tidak ada user
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }, [router]);

    if (loading) {
      return <Loading />; // Tampilkan loading saat memeriksa status autentikasi
    }

    return <WrappedComponent user={user} {...props} />;
  };
};

export {withAuth};
