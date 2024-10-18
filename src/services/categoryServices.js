import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

const categoryCollectionRef = collection(db, "categories");

// Create category
export const createCategory = async (categoryData) => {
    try {
        const newCategory = await addDoc(categoryCollectionRef, categoryData);
        return newCategory;
    } catch (error) {
        throw new Error("Error creating category: " + error.message);
    }
};


// Read categories
export const getCategories = async () => {
    try {
        const categorySnapshot = await getDocs(categoryCollectionRef);
        const categoryList = categorySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return categoryList;
    } catch (error) {
        throw new Error("Error fetching categories: " + error.message);
    }
};


// Get single category by id
export const getCategoryById = async (id) => {
    try {
        const categoryDoc = doc(db, "categories", id);
        const category = await getDoc(categoryDoc);
        return category.exists() ? category.data() : null;
    } catch (error) {
        throw new Error("Error fetching category: " + error.message);
    }
};

// Update category
export const updateCategory = async (id, updatedCategoryData) => {
    try {
        const categoryDoc = doc(db, "categories", id);
        await updateDoc(categoryDoc, updatedCategoryData);
    } catch (error) {
        throw new Error("Error updating category: " + error.message);
    }
};

// Delete category
export const deleteCategory = async (id) => {
    try {
        const categoryDoc = doc(db, "categories", id);
        await deleteDoc(categoryDoc);
    } catch (error) {
        throw new Error("Error deleting category: " + error.message);
    }
};