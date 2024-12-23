"use client"
import { getCategories } from "../../../services/categoryServices";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { useRouter } from 'next/navigation'
import { createBlog } from "../../../services/blogServices";
import { withAuth } from "../../../components/WithAuth";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import hljs from "highlight.js"; // Import highlight.js
import "highlight.js/styles/github.css";
import Image from "next/image";
import "highlight.js/styles/monokai-sublime.css";
import Editor from "@/components/Editor";

hljs.configure({ languages: ["javascript", "python", "java", "html"] }); 
interface Errors {
    [key: string]: string;
}

const ReactQuill = dynamic(
    () => {
        hljs.configure({
            languages: ['javascript', 'CSS', 'HTML']
        })
        // @ts-ignore
        window.hljs = hljs
       return  import ("react-quill")
    }, {
    ssr: false,
    loading: () => <p>Quill loading</p>
})

const CreateBlog = () => {

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [categoryId, setCategoryId] = useState(0);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [categories, setCategories] = useState<any>([]);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Errors>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    
    useEffect(() => {
        if(isSubmitted) {
            validateForm();
        }
    }, [title, content, image]);

    const validateForm = () => {
        let errors : Errors = {};

        if (!title) {
            errors.title = "Title is required";
        }
        if (!content) {
            errors.content = "Content is required";
        }
        if (!image) {
            errors.image = "Image is required";
        }

        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    }


    const handleImage = (e:any) => {
        const file = e.target.files[0];
        if(file) {
            setImage(file);
        }
    }

    const onSubmit = async (e:any) => {
        e.preventDefault();
        setIsSubmitted(true);
        // Validasi sebelum melanjutkan
        validateForm();
        if (!isFormValid) {
            setIsLoading(false);
            return; // Hentikan proses jika form tidak valid
        }
        setIsLoading(true);
        let uploadedImageUrl = ""; 
        // upload image
        if(image) {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("page", "blog");

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            console.log("data:", data)
            if(response.ok) {
                uploadedImageUrl = data.url;
            } else {
                console.error('Error uploading image:', `${data.error}: ${data.error.details}`);
                alert("Image upload failed");
                setIsLoading(false);
                return;
            }
        };

        // Generate excerpt
        const generatedExcerpt = generateExcerpt(content);
        const data = {
            title: title,
            slug: slug,
            content: content,
            excerpt: generatedExcerpt,
            image_url: uploadedImageUrl,
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

        const modules = {
            toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{size: []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'code-block'],
            ['clean']
            ],
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
                        <label className="text-2xl text-gray-700 dark:text-gray-50 font-semibold" htmlFor="title">Title</label>
                        <input
                            className="p-2 border dark:text-neutral-900 border-gray-300 rounded-md"
                            placeholder="input title"
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={handleTitleChange}
                        />
                         {isSubmitted && errors.title && <p className="text-red-500">{errors.title}</p>}
                    </div>
                    {/* Content */} 
                    <ReactQuill value={content} onChange={setContent} modules={modules} className="bg-white dark:text-neutral-900"/>
                    {/* <Editor value={content} onContentChange={setContent} /> */}
                    {isSubmitted && errors.content && <p className="text-red-500">{errors.content}</p>}
                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-2xl text-gray-700 dark:text-gray-50 font-semibold" htmlFor="categories">Categories</label>
                        <select name="categoryId" value={categoryId} onChange={(e) => setCategoryId(parseInt(e.target.value))} className="p-2 border dark:text-neutral-900 bg-white border-gray-300 rounded-md" id="categories">
                            {categories.map((category:any) => (
                                <option  key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Upload Image</label>
                        <input type="file" accept="image/*" onChange={handleImage} required />
                        {isSubmitted && errors.image && <p className="text-red-500">{errors.image}</p>}
                        {image && <Image src={URL.createObjectURL(image)} alt="Preview" width={200} height={200} className="mt-3"/>}
                    </div>
                    <button
                        onClick={onSubmit}
                        disabled={isLoading}
                        className={`flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                        isLoading ? "cursor-not-allowed opacity-50" : ""
                        }`}
                    >
                        {isLoading ? (
                        <>
                            <svg
                            className="mr-2 h-4 w-4 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                            </svg>
                            Loading...
                        </>
                        ) : (
                        "Submit"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default withAuth(CreateBlog);