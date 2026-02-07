"use client";
import AuthButton from "@/components/AuthButton";
import { motion, AnimatePresence } from "framer-motion";
import { Gallery } from "@/types/gallery";
import { deleteGallery, getGalleries } from "@/services/galleryServices";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Image from "next/image";

export default function GalleryMasonry() {
    const [galleries, setGalleries] = useState<Gallery[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [triggerFetch, setTriggerFetch] = useState(false);
    const [user, setUser] = useState(null);
    const [selectedImage, setSelectedImage] = useState<Gallery | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: any) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const fetchGalleries = async () => {
        try {
            const data: any = await getGalleries();
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

    const handleDelete = async (gallery: Gallery) => {
        const confirmation = confirm("Are you sure you want to delete this item from gallery?");
        if (!confirmation) return;
        try {
            await deleteGallery(gallery?.slug);
            setTriggerFetch((prev) => !prev);
            alert("Item deleted successfully.");
        } catch (err) {
            alert(err);
        }
    }

    if (loading) {
        return <Loading />;
    }
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-sky-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
            {/* Hero Section */}
            <section className="relative py-20 px-5 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 right-10 w-72 h-72 bg-sky-200 dark:bg-sky-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center md:text-left flex-1"
                        >
                            <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-4">
                                Gallery
                            </h1>
                            <p className="text-lg text-neutral-600 dark:text-neutral-400">
                                {galleries.length} {galleries.length === 1 ? 'item' : 'items'}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <AuthButton label="Add Gallery" path="/gallery/create" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Masonry Gallery Grid */}
            <section className="px-5 pb-20">
                <div className="max-w-7xl mx-auto">
                    {galleries.length === 0 ? (
                        <div className="text-center py-20">
                            <svg className="w-24 h-24 mx-auto text-neutral-300 dark:text-neutral-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-4">No items in gallery yet</p>
                            {user && <AuthButton label="Add Your First Item" path="/gallery/create" />}
                        </div>
                    ) : (
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                            {galleries.map((gallery: Gallery, index) => {
                                // Randomize height for masonry effect
                                const heights = ['h-64', 'h-80', 'h-96'];
                                const randomHeight = heights[index % heights.length];

                                return (
                                    <motion.div
                                        key={gallery.slug || index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                        className="break-inside-avoid group relative bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                                    >
                                        {/* Delete Button */}
                                        {user && (
                                            <motion.button
                                                onClick={() => handleDelete(gallery)}
                                                className="absolute top-3 right-3 z-20 p-2 bg-rose-600 hover:bg-rose-700 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </motion.button>
                                        )}

                                        {/* Image */}
                                        <div
                                            className={`relative ${randomHeight} overflow-hidden bg-neutral-200 dark:bg-neutral-700 cursor-pointer`}
                                            onClick={() => setSelectedImage(gallery)}
                                        >
                                            <Image
                                                src={gallery.image_url}
                                                alt={gallery.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                                    <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">
                                                        {gallery.title}
                                                    </h3>
                                                    <p className="text-white/80 text-sm line-clamp-2">
                                                        {gallery.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Zoom Icon on Hover */}
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    whileHover={{ scale: 1 }}
                                                    className="bg-white/20 backdrop-blur-sm rounded-full p-4"
                                                >
                                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                    </svg>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", damping: 25 }}
                            className="relative max-w-6xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative aspect-video bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src={selectedImage.image_url}
                                    alt={selectedImage.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <div className="mt-6 text-center">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                    {selectedImage.title}
                                </h2>
                                <p className="text-neutral-300 text-lg">
                                    {selectedImage.description}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}