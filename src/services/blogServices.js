import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";

const blogCollectionRef = collection(db, "blogs");

// Create blog
export const createBlog = async (blogData) => {
  try {
    const newBlog = await addDoc(blogCollectionRef, blogData);
    return newBlog;
  } catch (error) {
    throw new Error("Error creating blog: " + error.message);
  }
};

// Read blogs
export const getBlogs = async () => {
  try {
    const blogSnapshot = await getDocs(blogCollectionRef);
    const blogList = blogSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return blogList;
  } catch (error) {
    throw new Error("Error fetching blogs: " + error.message);
  }
};

// Update blog
export const updateBlog = async (id, updatedBlogData) => {
  try {
    const blogDoc = doc(db, "blogs", id);
    await updateDoc(blogDoc, updatedBlogData);
  } catch (error) {
    throw new Error("Error updating blog: " + error.message);
  }
};

// Delete blog
export const deleteBlog = async (id) => {
  try {
    const blogDoc = doc(db, "blogs", id);
    await deleteDoc(blogDoc);
  } catch (error) {
    throw new Error("Error deleting blog: " + error.message);
  }
};

// Get single blog by id
export const getBlogDetail = async (slug) => {
  try {
    const q = query(collection(db, "blogs"), where("slug", '==', slug))
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0].data();
      return doc;
    } else {
      console.log("No blog found with that slug");
      return null;
    }
  } catch (error) {
    throw new Error("Error fetching blog: " + error.message);
  }
};
