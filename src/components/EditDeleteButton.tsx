import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase"; // Pastikan Anda mengimpor auth dari konfigurasi Firebase Anda
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi"; // Pastikan Anda mengimpor ikon yang dibutuhkan
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteBlog } from "@/services/blogServices";
import { useRouter } from "next/navigation";

const EditDeleteButton = ({ slug }: { slug: string }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user:any) => {
      setUser(user); // Update status user
    });

    return () => unsubscribe(); // Bersihkan listener saat komponen di-unmount
  }, []);

  const handleDelete = async () => {
    const confirmation = confirm("Are you sure want to delete this blog?");
    if(!confirmation) return;
    try {
      await deleteBlog(slug);
      alert("Blog deleted successfully.");
      router.push("/blogs");
      // setTimeout(() => {
      //     notFound(); // Assuming this redirects the user
      // }, 100); // Adding a small delay
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {user ? ( // Cek hanya apakah ada user yang terautentikasi
        <div className="flex ml-auto gap-3">
          <MdOutlineModeEdit className="text-lg text-gray-500 hover:text-green-500 cursor-pointer" />
          <RiDeleteBin6Line onClick={handleDelete} className="text-lg text-gray-500 hover:text-red-500 cursor-pointer" />
      </div>
      ) : null} {/* Tombol hanya muncul jika ada user yang terautentikasi */}
    </>
  );
};

export default EditDeleteButton;
