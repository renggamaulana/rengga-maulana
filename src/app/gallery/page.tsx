"use client";
import AuthButton from "@/components/AuthButton";
import { motion } from "framer-motion";
import { Gallery } from "@/types/gallery";
import { deleteGallery, getGalleries } from "@/services/galleryServices";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Page() {

    const [galleries, setGalleries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [triggerFetch, setTriggerFetch] = useState(false); 
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user:any) => {
        setUser(user); // Update status user
        });

        return () => unsubscribe(); // Bersihkan listener saat komponen di-unmount
    }, []);

    const fetchGalleries = async () => {
      try {
          const data:any = await getGalleries();
          setGalleries(data);
          setLoading(false);
      } catch (err) {
          console.error(err);
      } finally {
          setLoading(false);
      }
    }
    
    useEffect(() => {
        fetchGalleries();
    }, [triggerFetch]);

    const handleDelete = async (gallery:Gallery) => {
      const confirmation = confirm("Are you sure want to delete this item from gallery?");
        if(!confirmation) return;
        try {
            await deleteGallery(gallery?.slug);
            setTriggerFetch((prev) => !prev);
            alert("Item deleted successfully.");
        } catch (err) {
            alert(err);
        }

    }

    if(loading) {
        return <Loading />;
      }
      if (error) {
        return <p>{error}</p>;
      }

    return (
        <div className="p-10 lg:p-20 mb-10">
            <header className="flex justify-between items-center">
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        borderBottom: '5px solid #5c5cff',
                        width: 'fit-content',
                    }}>
                        <h1 className="text-center text-3xl lg:text-6xl font-bold">Gallery</h1> 
                </motion.div>
                <AuthButton label="Add Gallery" path="/gallery/create" />
            </header>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
      {galleries.map((gallery:Gallery, index) => {
        // Variasi animasi berdasarkan indeks
        const isFirstColumn = index % 2 === 0; // Kolom pertama dari kiri
        const animationProps = isFirstColumn
          ? {
              initial: { opacity: 0, x: -100 }, // Animasi masuk dari kiri
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.6, ease: 'easeOut' },
            }
          : {
              initial: { opacity: 0, x: 100 }, // Animasi masuk dari kanan
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.6, ease: 'easeOut' },
            };

        return (
          <motion.div
            key={index}
            className="flex flex-col gap-2 relative"
            {...animationProps}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {user && (
              <motion.button onClick={() => handleDelete(gallery)}
                className="absolute -top-4 -right-2 bg-rose-600 rounded-full w-7 h-7 flex justify-center items-center"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                X
              </motion.button>
            )}
            <motion.img
              src={gallery.image_url}
              alt={gallery.title}
              className="w-full h-48 object-cover"
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            <div>
              <h2 className="text-2xl font-semibold">{gallery.title}</h2>
              <p className="text-sm">{gallery.description}</p>
            </div>
          </motion.div>
        );
      })}
    </div>

        </div>
    );
}