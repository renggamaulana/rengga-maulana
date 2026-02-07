"use client"
import { deleteBlog, getBlogDetail } from "@/services/blogServices";
import Link from "next/link"
import { notFound, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import EditDeleteButton from "@/components/EditDeleteButton";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import Image from "next/image";
import Dot from "@/components/Dot";

const SingleBlog = () => {
    const pathname = usePathname();
    const slug = pathname.split("/").pop();
    const [blog, setBlog] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [readingTime, setReadingTime] = useState(0);
    const router = useRouter();
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchSingleBlog = async () => {
            try {
                const data = await getBlogDetail(slug!);
                const formattedData = {
                    ...data,
                    created_at: data?.created_at.toDate(),
                    updated_at: data?.created_at.toDate(),
                }
                console.log('blog:', formattedData);
                setBlog(formattedData);
                setLoading(false);
                if (data?.content) {
                    setContent(data.content);
                    const time = calculateReadingTime(data.content);
                    setReadingTime(time);
                }
            } catch (err) {
                notFound();
            }
        }
        fetchSingleBlog();
        if (content) {
            hljs.highlightAll();
        }
    }, [content, slug]);

    const calculateReadingTime = (content: string) => {
        const wpm = 225; //words per minute
        const words = content.split(" ").length;
        const time = words / wpm;
        return Math.ceil(time);
    }

    const handleDelete = async () => {
        const confirmation = confirm("Are you sure want to delete this blog?");
        if (!confirmation) return;
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
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-sky-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
            {/* Hero Section */}
            <article className="relative">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 right-10 w-72 h-72 bg-sky-200 dark:bg-sky-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                </div>

                {/* Header Section */}
                <header className="relative z-10 max-w-4xl mx-auto px-5 pt-20 pb-12">
                    {/* Back Button */}
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 mb-8 group transition-colors"
                    >
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Blog
                    </Link>

                    {/* Category Badge */}
                    <div className="mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-sm font-semibold">
                            <Dot color={blog?.categoryColor} size={8} />
                            {blog?.categoryName}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
                        {blog?.title}
                    </h1>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-6 text-neutral-600 dark:text-neutral-400 pb-8 border-b border-neutral-200 dark:border-neutral-700">
                        {/* Date */}
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <time className="text-sm">
                                {blog?.created_at
                                    ? new Intl.DateTimeFormat("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    }).format(blog.created_at)
                                    : ""}
                            </time>
                        </div>

                        {/* Reading Time */}
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm">{readingTime} min read</span>
                        </div>

                        {/* Edit/Delete Buttons */}
                        <div className="ml-auto">
                            <EditDeleteButton slug={blog?.slug} />
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="relative max-w-5xl mx-auto px-5 mb-12">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src={blog?.image_url}
                            alt={blog?.title}
                            width={1200}
                            height={600}
                            className="w-full h-auto"
                            priority
                        />
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-3xl mx-auto px-5 pb-20">
                    {/* Article Content */}
                    <div
                        className="prose prose-lg dark:prose-invert max-w-none
                            prose-headings:font-bold prose-headings:text-neutral-900 dark:prose-headings:text-white
                            prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12
                            prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-10
                            prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8
                            prose-p:text-neutral-700 dark:prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:mb-6
                            prose-a:text-sky-600 dark:prose-a:text-sky-400 prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-neutral-900 dark:prose-strong:text-white prose-strong:font-semibold
                            prose-code:text-sky-600 dark:prose-code:text-sky-400 prose-code:bg-neutral-100 dark:prose-code:bg-neutral-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                            prose-pre:bg-neutral-900 prose-pre:shadow-xl prose-pre:rounded-xl
                            prose-ul:my-6 prose-ol:my-6
                            prose-li:text-neutral-700 dark:prose-li:text-neutral-300 prose-li:my-2
                            prose-blockquote:border-l-4 prose-blockquote:border-sky-600 prose-blockquote:bg-sky-50 dark:prose-blockquote:bg-sky-900/20 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic
                            prose-img:rounded-xl prose-img:shadow-lg"
                        dangerouslySetInnerHTML={{ __html: blog?.content }}
                    />

                    {/* Article Footer */}
                    <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-700 space-y-6">
                        {/* Tags Section (if you have tags) */}
                        {/* <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg text-sm">
                                Tag1
                            </span>
                        </div> */}

                        {/* Share Section */}
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="text-neutral-600 dark:text-neutral-400">
                                <p className="text-sm">Found this helpful? Share it with others!</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-sky-100 dark:hover:bg-sky-900 text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                    </svg>
                                </button>
                                <button className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-sky-100 dark:hover:bg-sky-900 text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter CTA */}
                <div className="max-w-4xl mx-auto px-5 pb-20">
                    <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                        <h2 className="text-3xl font-bold mb-4">
                            Subscribe to Newsletter
                        </h2>
                        <p className="text-lg mb-8 opacity-90">
                            Get notified when I publish new articles
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-4 rounded-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            <button
                                type="submit"
                                className="px-8 py-4 bg-white text-sky-600 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Related Posts / Back to Blog */}
                <div className="max-w-4xl mx-auto px-5 pb-20">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-neutral-200 dark:border-neutral-700"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        View All Posts
                    </Link>
                </div>
            </article>
        </div>
    )
}

export default SingleBlog;