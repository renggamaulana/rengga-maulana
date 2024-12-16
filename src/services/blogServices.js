import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc, query, where, Timestamp, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import convertTimestampToDate from "@/utils/convertTimestampToDate";

const blogCollectionRef = collection(db, "blogs");

// Create blog
export const createBlog = async (blogData) => {
  let blogDataWithTimestamp = {
    ...blogData,
    created_at: Timestamp.fromDate(new Date()),
    updated_at: Timestamp.fromDate(new Date())
  }
  try {
    const newBlog = await addDoc(blogCollectionRef, blogDataWithTimestamp);
    return newBlog;
  } catch (error) {
    throw new Error("Error creating blog: " + error.message);
  }
};


// Read blogs
export const getBlogs = async () => {
  try {
    const blogSnapshot = await getDocs(blogCollectionRef);
    const blogList = blogSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        created_at: data.created_at.toDate(),
        updated_at: data.updated_at.toDate(),
      };
    });
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
export const deleteBlog = async (slug) => {
  try {
    const blogsCollection = collection(db, "blogs");
    const q = query(blogsCollection, where("slug", "==", slug)); // Query by slug
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Blog not found");
    }

    querySnapshot.forEach(async (docSnapshot) => {
      await deleteDoc(docSnapshot.ref); // Delete each document that matches
    });
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
