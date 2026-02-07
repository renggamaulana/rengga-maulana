"use client";

import Link from "next/link"
import { useEffect, useState } from "react";
import { getBlogs } from "../../services/blogServices"
import { getCategories } from "../../services/categoryServices"
import Loading from "@/components/Loading";
import { Blog } from "@/types/blog";
import Dot from "@/components/Dot";
import Image from "next/image";
import CategoryList from "@/components/CategoryList";

const Blogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [categories, setCategories] = useState<Categories[]>([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data: any = await getBlogs();
                setBlogs(data);
                console.log('blogData: ', data);
                setLoading(false);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        const fetchCategories = async () => {
            try {
                const data: any = await getCategories();
                setCategories(data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchBlogs();
        fetchCategories();
    }, []);

    const filteredBlogs = selectedCategory
        ? blogs.filter(blog => blog.categoryName === selectedCategory)
        : blogs;

    if (loading) {
        return <Loading />;
    }
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-sky-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
            {/* Hero Section */}
            <section className="relative py-20 px-5 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 right-10 w-72 h-72 bg-sky-200 dark:bg-sky-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-12">
                        <div className="inline-block mb-4">
                            <span className="px-4 py-2 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-sm font-semibold">
                                Blog
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-4">
                            Thoughts & Ideas
                        </h1>
                        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                            Sharing insights on web development, technology, and software engineering
                        </p>
                    </div>

                    {/* Categories Filter */}
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex flex-wrap gap-2 bg-white dark:bg-neutral-800 p-2 rounded-2xl shadow-lg">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                                    selectedCategory === null
                                        ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md'
                                        : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                                }`}
                            >
                                All Posts
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.name)}
                                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                                        selectedCategory === category.name
                                            ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md'
                                            : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                                    }`}
                                >
                                    <Dot color={category.color} size={8} />
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="px-5 pb-20">
                <div className="max-w-7xl mx-auto">
                    {filteredBlogs.length === 0 ? (
                        <div className="text-center py-20">
                            <svg className="w-24 h-24 mx-auto text-neutral-300 dark:text-neutral-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-xl text-neutral-600 dark:text-neutral-400">No posts found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredBlogs.map((blog, index) => (
                                <article
                                    key={blog.id}
                                    className="group bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                                    style={{
                                        animationDelay: `${index * 100}ms`
                                    }}
                                >
                                    {/* Blog Image */}
                                    <Link href={`/blogs/${blog.slug}`}>
                                        <div className="relative h-56 overflow-hidden bg-neutral-200 dark:bg-neutral-700">
                                            <Image
                                                src={blog.image_url}
                                                alt={blog.title}
                                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                                width={1000}
                                                height={1000}
                                            />
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                    </Link>

                                    {/* Blog Content */}
                                    <div className="p-6">
                                        {/* Category Badge */}
                                        <div className="mb-4">
                                            <Link
                                                href="#"
                                                className="inline-flex items-center gap-2 px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-sm font-semibold hover:bg-sky-200 dark:hover:bg-sky-800 transition-colors"
                                            >
                                                <Dot color={blog.categoryColor} size={8} />
                                                {blog.categoryName}
                                            </Link>
                                        </div>

                                        {/* Title */}
                                        <Link href={`/blogs/${blog.slug}`}>
                                            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 line-clamp-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                                                {blog.title}
                                            </h2>
                                        </Link>

                                        {/* Excerpt */}
                                        <div
                                            className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3 text-sm"
                                            dangerouslySetInnerHTML={{ __html: blog.excerpt }}
                                        />

                                        {/* Meta Info */}
                                        <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
                                            <time className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {blog.created_at
                                                    ? new Intl.DateTimeFormat("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    }).format(blog.created_at)
                                                    : ""}
                                            </time>

                                            <Link
                                                href={`/blogs/${blog.slug}`}
                                                className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-semibold text-sm flex items-center gap-1 group/link"
                                            >
                                                Read More
                                                <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="px-5 pb-20">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Stay Updated
                        </h2>
                        <p className="text-lg mb-8 opacity-90">
                            Subscribe to my newsletter for the latest posts and insights
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
            </section>
        </div>
    )
}

export default Blogs;