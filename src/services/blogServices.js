import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc, query, where, Timestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { getCategoryBySlug } from "./categoryServices";

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
    const blogList = await Promise.all(
      blogSnapshot.docs.map(async (docSnap) => {
        const blogData = docSnap.data();
        const categoryRef = doc(db, "categories", blogData.categoryId); // Pastikan `doc` diimpor dengan benar
        const categoryDoc = await getDoc(categoryRef);

        return {
          id: docSnap.id,
          ...blogData,
          categoryName: categoryDoc.exists() ? categoryDoc.data().name : "Unknown Category",
          // categorySlug: categoryDoc.exists() ? categoryDoc.data().slug : "",
          categoryColor: categoryDoc.exists() ? categoryDoc.data().color : "",
          created_at: blogData.created_at.toDate(),
          updated_at: blogData.updated_at.toDate(),
        };
      })
    );
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
    const blogSnapshot = await getDocs(q);
    if (!blogSnapshot.empty) {
      const blog = blogSnapshot.docs[0].data();
      const categoryId = blog.categoryId || null;
      let categoryData = { name: "Unknown Category", color: "gray" };
      if (categoryId) {
        const categoryDocRef = doc(db, "categories", categoryId);
        const categoryDoc = await getDoc(categoryDocRef);
  
        if (categoryDoc.exists()) {
          categoryData = categoryDoc.data();
        }
      }
  
      blog.categoryName = categoryData.name;
      blog.categoryColor = categoryData.color;
      return blog;
    } else {
      console.log("No blog found with that slug");
      return null;
    }
  } catch (error) {
    throw new Error("Error fetching blog: " + error.message);
  }
};

export const getBlogsbyCategory = async (slug) => {
  try {
    const category = await getCategoryBySlug(slug);
    const categoryId = category.id;

    // ambil semua blog berdasarkan category id
    const blogCollectionRef = collection(db, 'blogs');
    const q = query(blogCollectionRef, where('categoryId', "==", categoryId));
    const blogSnapshot = await getDocs(q);

    if (blogSnapshot.empty) {
      return [];
    }

    const blogs = blogSnapshot.docs.map((doc) => {
      const blogData = doc.data();
      return {
        id: doc.id,
        title: blogData.title,
        slug: blogData.slug,
        excerpt: blogData.excerpt,
        image_url: blogData.image_url,
        categoryId: blogData.categoryId,
        content: blogData.content,
        categoryName: category.name,
        categorySlug: category.slug,
        categoryColor: category.color,
        created_at: blogData.created_at?.toDate(),
        updated_at: blogData.updated_at?.toDate(),
      };
    });

    return blogs;
  } catch(error) {
    throw new Error("Error fetching blogs by category slug: " + error.message);
  }
}
