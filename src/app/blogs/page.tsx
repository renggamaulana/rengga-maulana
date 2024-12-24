"use client";

import Link from "next/link"
import { useEffect, useState } from "react";
import { getBlogs } from "../../services/blogServices"
import { getCategories } from "../../services/categoryServices"
import Loading from "@/components/Loading";
import AuthButton from "@/components/AuthButton";
import { Blog } from "@/types/blog";
import Dot from "@/components/Dot";
import Image from "next/image";
import CategoryList from "@/components/CategoryList";

// interface Categories {
//   id: number;
//   name: string;
//   slug: string;
//   color: string
// }

const Blogs =  () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [categories, setCategories] = useState<Categories[]>([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const data:any = await getBlogs();
          setBlogs(data);
          console.log('blogData: ',data);
          setLoading(false);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }

      const fetchCategories = async () => {
        try {
          const data:any = await getCategories();
          setCategories(data);
        } catch (err) {
          console.error(err);
        }
      }

      fetchBlogs();
      fetchCategories();
    }, []); // empty array means it runs once after the initial render

    if(loading) {
      return <Loading />;
    }
    if (error) {
      return <p>{error}</p>;
    }

    return(
        <div className="px-5 lg:px-20 py-10">
          {/* Categories */}
          <CategoryList categories={categories}/>
          {/* Main */}
          <div className="grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogs.map((blog) => (
              <div key={blog.id} className="p-5 rounded-lg shadow-lg bg-white dark:bg-neutral-900">
                <div className="w-full h-52 mb-5">
                  <Image src={blog.image_url} alt={blog.title} className="object-cover w-full h-full" width={1000} height={1000} />
                </div>
                <div className="flex flex-wrap gap-3 my-5">
                  <Link
                    href="#"
                    className="flex text-sm items-center gap-2 px-3 py-1 border dark:text-white border-sky-600 rounded-full hover:bg-sky-500 opacity-75 font-semibold text-black self-baseline"
                  >
                    {/* {blog.categoryName} */}
                   <Dot color={blog.categoryColor} size={8} /> {blog.categoryName}
                  </Link>
                </div>
                <Link  href={`/blogs/${blog.slug}`}>
                  <h1 className="text-xl font-bold text-gray-800 dark:text-gray-50 hover:underline">{blog.title}</h1>
                </Link>
                <p className="mt-2 text-gray-600 dark:text-gray-50" dangerouslySetInnerHTML={{ __html: blog.excerpt }}></p>
                <div className="flex items-center gap-2 mt-5">  
                  <span className="text-gray-600 dark:text-gray-50 text-sm italic">{blog.created_at
                      ? new Intl.DateTimeFormat("en-US", {
                          month: "short", // Menghasilkan bulan dalam bentuk singkat (e.g., "DEC")
                          day: "numeric", // Tanggal (e.g., "7")
                          year: "numeric", // Tahun (e.g., "2024")
                        }).format(blog.created_at)
                      : ""}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
    )
}

export default Blogs;