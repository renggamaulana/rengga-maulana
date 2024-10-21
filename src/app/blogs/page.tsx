"use client";

import Link from "next/link"
import { useEffect, useState } from "react";
import { getBlogs } from "../../services/blogServices"
import { getCategories } from "../../services/categoryServices"
import { HiPencilAlt } from "react-icons/hi";
import Loading from "@/components/Loading";
import AuthButton from "@/components/AuthButton";

interface Categories {
  id: number;
  name: string;
}

interface Blogs {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category_id: string;
}

const Blogs =  () => {
    const username:string = "Rengga";
    const [blogs, setBlogs] = useState<Blogs[]>([]);
    const [categories, setCategories] = useState<Categories[]>([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

      const fetchBlogs = async () => {
        try {
          const data:any = await getBlogs();

          setBlogs(data);
          console.log(data);
          setLoading(false);
        } catch (err) {
          console.error(err);
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
        <div className="min-h-screen px-5 lg:px-20 py-10 flex lg:flex-nowrap flex-wrap gap-10">
            <div className="w-full lg:w-2/3">
                <h1 className="text-2xl text-gray-800 dark:text-gray-50 font-bold">What's New?</h1>
                {/* blog list */}
                {blogs.length < 1 ? (
                    <p>No Data Available</p>
                ) : (
                    <div className="flex flex-col gap-10 mt-10">
                    {blogs.map((blog:any) => {
                        return(
                            <div key={blog.id}>
                                <h1 className="text-xl text-gray-800 dark:text-gray-50 font-semibold">{blog.title}</h1>
                                <p className="text-sm font text-gray-600 dark:text-gray-50">{blog.created_at}</p>
                                <p className="mt-2 text-md tracking-wide text-gray-800 dark:text-gray-50" dangerouslySetInnerHTML={{ __html: blog.excerpt }} />
                                <Link href={`blogs/${blog.slug}`}>
                                    <p className="pt-3 underline text-md text-gray-800 dark:text-gray-50">Read more...</p>
                                </Link>
                            </div>                        )
                    })}
                </div>
                )}
            </div>
            <div className="w-full md:w-1/3 lg:w-1/3 flex flex-col self-baseline gap-5">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-50">Topics</h1>
                <div className="flex flex-wrap gap-3">
                    {categories.map((category) => {
                        return(
                                <Link href="#" key={category.id} className="rounded-lg px-3 py-1 bg-black dark:bg-white hover:underline opacity-75 font-semibold text-white dark:text-gray-800 self-baseline">#{category.name}</Link>
                            )
                        })}
                </div>
            </div>
            <AuthButton />
        </div>
    )
}

export default Blogs;