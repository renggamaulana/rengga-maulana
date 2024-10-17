"use client"
import { getCategories, postBlogs } from "@/lib/api/axios";
import { useEffect, useState } from "react";
import Link from "next/link"
import Loading from "@/components/Loading";
export default function Page() {

    const [categories, setCategories] = useState([]);
    // const [error, setError] = useState(null);
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [categoryId, setCategoryId] = useState(0);
    const [loading, setLoading] = useState(true);

     const onSubmit = async () => {
        // Generate excerpt
        const generatedExcerpt = generateExcerpt(content);
        setExcerpt(generatedExcerpt);
        const blogData = {
            title: title,
            slug: slug,
            body: content,
            excerpt: excerpt,
            category_id: categoryId,
        };

        try {
            const res = await postBlogs(blogData);
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    }


    const handleTitleChange = (e:any) => {
        const inputTitle = e.target.value;
        setTitle(inputTitle);

        // Generate slug from title
        const generatedSlug = inputTitle
            .toLowerCase()                        // Convert to lowercase
            .replace(/[^\w\s-]/g, '')             // Remove special characters
            .replace(/\s+/g, '-')                 // Replace spaces with hyphens
            .replace(/-+/g, '-');                 // Remove extra hyphens

        setSlug(generatedSlug);
    };

    const generateExcerpt = (content:string) => {
        const excerpt = content
            .split('\n')                         // Split content into lines
            .slice(0, 3)                         // Select first 3 lines
            .map((line) => line.trim())           // Remove leading/trailing whitespace
            .join(' ');
        return excerpt;                                // Join lines with a space
    }


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        }

        fetchCategories();
    }, []);

    if(loading) {
        return <Loading />;
    }

    return (
        <div className="">
            {/* <Link href="/blogs" className="text-lg font-semibold hover:underline">Kembali</Link> */}
            <div className="p-10 justify-center px-7 lg:px-60">
                <h1 className="text-4xl mb-10 text-gray-800 dark:text-gray-50 font-bold">Create new blog</h1>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-2xl dark:text-gray-50 font-semibold" htmlFor="title">Title</label>
                        <input
                            className="p-2 border border-gray-300 rounded-md"
                            placeholder="input title"
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-2xl dark:text-gray-50 font-semibold" htmlFor="content">Content</label>
                        <textarea
                            placeholder="input content"
                            className="p-2 border border-gray-300 rounded-md"
                            name="content"
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}>
                        </textarea>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-2xl dark:text-gray-50 font-semibold" htmlFor="categories">Categories</label>
                        <select name="categoryId" value={categoryId} onChange={(e) => setCategoryId(parseInt(e.target.value))} className="p-2 border bg-white border-gray-300 rounded-md" id="categories">
                            {categories.map((category:any) => (
                                <option  key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <button onClick={onSubmit} className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded-md font-semibold">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}