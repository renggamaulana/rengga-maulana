import { collection, addDoc, getDocs, doc, query, where, Timestamp, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const galleryCollectionRef = collection(db, "galleries");

// create gallery
export const createGallery = async (galleryData) => {
    let galleryDataWithTimestamp = {
        ...galleryData,
        created_at: Timestamp.fromDate(new Date()),
        updated_at: Timestamp.fromDate(new Date())
    }
    try {
        const newGallery = await addDoc(galleryCollectionRef, galleryDataWithTimestamp);
        return newGallery;
    } catch (error) {
        throw new Error("Error creating gallery: " + error.message);
    }
};

// Read galleries
export const getGalleries = async () => {
    try {
        const gallerySnapshot = await getDocs(galleryCollectionRef);
        const galleryList = gallerySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return galleryList;
    } catch (error) {
        throw new Error("Error fetching galleries: " + error.message);
    }
};

// Get single gallery by id
export const getGalleryById = async (id) => {
    try {
        const galleryDoc = doc(db, "galleries", id);
        const gallery = await getDoc(galleryDoc);
        return gallery.exists() ? gallery.data() : null;
    } catch (error) {
        throw new Error("Error fetching gallery: " + error.message);
    }
};

// Update gallery
export const updateGallery = async (id, updatedGalleryData) => {
    try {
        const galleryDoc = doc(db, "galleries", id);
        await updateDoc(galleryDoc, updatedGalleryData);
    } catch (error) {
        throw new Error("Error updating gallery: " + error.message);
    }
};

// Delete gallery
export const deleteGallery = async (slug) => {
    try {
        const galleriesCollection = collection(db, "galleries");
        const q = query(galleriesCollection, where("slug", "==", slug)); // Query by slug
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error("Gallery not found");
        }

        querySnapshot.forEach(async (docSnapshot) => {
            await deleteDoc(docSnapshot.ref); // Delete each document that matches
        });
    } catch (error) {
        throw new Error("Error deleting gallery: " + error.message);
    }
};

