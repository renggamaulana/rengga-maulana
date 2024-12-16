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

interface Categories {
  id: number;
  name: string;
  color: string
}

const Blogs =  () => {
    const username:string = "Rengga";
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [categories, setCategories] = useState<Categories[]>([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const data:any = await getBlogs();
          setBlogs(data);
          console.log('data: ',data);
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
          <div className="p-10 dark:bg-neutral-900 bg-white border border-neutral-200 shadow dark:border-none rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-50">Topics</h1>
            <div className="flex flex-wrap gap-3 mt-5">
              {/* dangerouslySetInnerHTML={{ __html: blog.excerpt }} */}
              {categories.map((category) => {
                return (
                  <Link
                    href="#"
                    key={category.id}
                    className="flex items-center gap-2 px-3 py-1 border dark:text-white border-orange-600 rounded-full hover:bg-orange-500 opacity-75 font-semibold text-black self-baseline"
                  >
                   <Dot color={category.color} size={8} /> {category.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Main */}
          <div className="grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogs.map((blog) => (
              <div key={blog.id} className="p-5 rounded-lg shadow-lg bg-white dark:bg-neutral-900">
                <div className="w-full h-52 mb-5">
                  <Image src={blog.image_url} alt={blog.title} className="object-cover w-full h-full" width={1000} height={1000} />
                </div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-gray-50">{blog.title}</h1>
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
                <div className="flex items-center gap-2 mt-5">
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="flex items-center gap-2 px-3 py-1 border dark:text-white border-orange-600 rounded-full hover:bg-orange-500 opacity-75 font-semibold text-black self-baseline"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <AuthButton />
        </div>
    )
}

export default Blogs;