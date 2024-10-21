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

const SingleBlog = () => {

    const pathname = usePathname();
    const slug = pathname.split("/").pop();
    const [blog, setBlog] = useState<any>();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchSingleBlog = async () => {
            try {
                const data = await getBlogDetail(slug!);
                setBlog(data);
                console.log(data);
                setLoading(false);
            } catch (err) {
                notFound();
            }
        }
        fetchSingleBlog();
    }, []);

    const handleDelete = async () => {
        const confirmation = confirm("Are you sure want to delete this blog?");
        if(!confirmation) return;
        try {
            await deleteBlog(blog?.slug);
            alert("Blog deleted successfully.");
            router.push("/blogs");
            // setTimeout(() => {
            //     notFound(); // Assuming this redirects the user
            // }, 100); // Adding a small delay
        } catch (err) {
            console.log(err);
        }
    }

    if (loading) {
        return <Loading />
    }
  return (
    <div className="p-10 flex flex-col gap-10 justify-center px-7 lg:px-60">
        {/* Container */}
        <EditDeleteButton slug={blog?.slug} />
        <div className="flex divide-y flex-col">
            <h1 className="text-4xl text-gray-800 dark:text-gray-50 font-bold mb-5">{blog?.title}</h1>
            <p className="text-sm dark:text-gray-400 text-gray-700 py-3">Published in <span className="text-gray-800 font-semibold dark:text-gray-100">Self Help </span> · 6 min read · Oct 21, 2024</p>
            <p></p>
        </div>
        {/* Post's body */}
        <div>
            <p className="text-lg lg:tracking-wide text-gray-600 lg:leading-8 dark:text-gray-50" dangerouslySetInnerHTML={{ __html: blog?.content }} />
        </div>
        <div>
            <p className="text-md text-gray-700 dark:text-gray-50">Mau berlangganan newsletter? <a href="" className="underline">klik disini</a></p>
            <Link href="/blogs" className="text-md text-gray-700 dark:text-gray-50 flex gap-2 mt-5 hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Lihat postingan lainnya
            </Link>
        </div>
    </div>
  )
}

export default SingleBlog;