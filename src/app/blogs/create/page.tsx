"use client"
// import { getCategories, postBlogs } from "@/lib/api/axios";
import { getCategories } from "../../../services/categoryServices";
import { useEffect, useState } from "react";
import Link from "next/link"
import Loading from "@/components/Loading";
import { useRouter } from 'next/navigation'
import { fetchWithAuth } from "@/utils/auth";
import { createBlog } from "../../../services/blogServices";
export default function Page() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [excerpt, setExcerpt] = useState("");
    // const initialCategoryId = categories.length > 0 ? categories[0].id : 0;
    const [categoryId, setCategoryId] = useState(0);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [categories, setCategories] = useState<any>([]);

     const onSubmit = async () => {
        // Generate excerpt
        const generatedExcerpt = generateExcerpt(content);
        setExcerpt(generatedExcerpt);
        const data = {
            title: title,
            slug: slug,
            content: content,
            excerpt: excerpt,
            category_id: Number(categoryId)
        };

        try {
            await createBlog(data);
            alert("Blog created successfully");
            router.push("/blogs");
        } catch (error) {
            console.error("Error creating blog:", error);
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

    const generateExcerpt = (content: string, maxLength: number = 150) => {
        const excerpt = content
            .replace(/\n+/g, ' ')             // Replace new lines with a space
            .trim()                           // Remove leading/trailing whitespace
            .slice(0, maxLength);             // Limit excerpt to maxLength characters
    
        return excerpt.endsWith(' ') || excerpt.endsWith('.') 
            ? excerpt.trim() 
            : `${excerpt.trim()}...`;         // Add ellipsis if excerpt doesn't end with punctuation
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data:any = await getCategories();
                setCategories(data);
                console.log(data);
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