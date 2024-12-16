"use client"
import { deleteBlog, getBlogDetail } from "@/services/blogServices";
import Link from "next/link"
import { notFound, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import EditDeleteButton from "@/components/EditDeleteButton";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import Image from "next/image";

const SingleBlog = () => {

    const pathname = usePathname();
    const slug = pathname.split("/").pop();
    const [blog, setBlog] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [readingTime, setReadingTime] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const fetchSingleBlog = async () => {
            try {
                const data = await getBlogDetail(slug!);
                const formattedData = {
                    ...data,
                    created_at: data?.created_at.toDate(),
                    updated_at: data?.created_at.toDate(),
                }
                setBlog(formattedData);
                setLoading(false);
                if (data?.content) {
                    const time = calculateReadingTime(data.content);
                    setReadingTime(time);
                }
            } catch (err) {
                notFound();
            }
        }
        fetchSingleBlog();
        hljs.highlightAll();
    }, []);

    const calculateReadingTime =  (content:string) => {
        const wpm = 225; //words per minute
        const words = content.split(" ").length;
        const time = words / wpm;
        return Math.ceil(time);
    }

    const handleDelete = async () => {
        const confirmation = confirm("Are you sure want to delete this blog?");
        if(!confirmation) return;
        try {
            await deleteBlog(blog?.slug);
            alert("Blog deleted successfully.");
            router.push("/blogs");
        } catch (err) {
            console.log(err);
        }
    }

    if (loading) {
        return <Loading />
    }
  return (
    <div className="p-5 flex flex-col gap-10 justify-center lg:px-32">
        {/* Container */}
        <div className="dark:bg-neutral-900 p-5 lg:p-20">

            <EditDeleteButton slug={blog?.slug} />
            <div className="flex divide-y flex-col">
                <h1 className="text-3xl lg:text-5xl whitespace-pre-wrap text-gray-800 dark:text-gray-50 font-bold mb-5">{blog?.title}</h1>
                <p className="text-sm dark:text-gray-400 text-gray-700 py-3">
                    Published in 
                    <span className="text-gray-800 font-semibold dark:text-gray-100"> Self Help </span> · 
                    <span>{readingTime}</span> min read · 
                    <span className="text-gray-600 dark:text-gray-50 text-sm italic">{blog.created_at
                        ? new Intl.DateTimeFormat("en-US", {
                            month: "short", // Menghasilkan bulan dalam bentuk singkat (e.g., "DEC")
                            day: "numeric", // Tanggal (e.g., "7")
                            year: "numeric", // Tahun (e.g., "2024")
                            }).format(blog.created_at)
                        : ""}
                    </span>
                </p>
                <p></p>
            </div>
            <div className="w-full my-5 flex justify-center">
                <Image src={blog.image_url} alt={blog.title}  width={1000} height={1000} />
            </div>
            {/* Post's body */}
            <div
                className="text-md overflow-clip whitespace-pre-wrap tracking-wide lg:tracking-wide text-gray-600 leading-7 lg:leading-10 dark:text-gray-50"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            <div>
                <p className="text-md text-gray-700 dark:text-gray-50">Mau berlangganan newsletter? <a href="" className="underline">klik disini</a></p>
                <Link href="/blogs" className="text-md text-gray-700 dark:text-gray-50 flex gap-2 mt-5 hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Lihat postingan lainnya
                </Link>
            </div>
        </div>
    </div>
  )
}

export default SingleBlog;