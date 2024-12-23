"use client"
import { withAuth } from "@/components/WithAuth"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createGallery } from "@/services/galleryServices";
import Image from "next/image";

interface Errors {
    [key: string]: string;
}

const CreateGallery = () => {

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Errors>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(isSubmitted) {
            validateForm();
        }
    }, [title, description, image]);

    const validateForm = () => {
        let errors : Errors = {};

        if (!title) {
            errors.title = "Title is required";
        }
        if (!description) {
            errors.description = "Description is required";
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

    const handleTitleChange = (e:any) => {
        const inputTitle = e.target.value;
        console.log(inputTitle)
        setTitle(inputTitle);

        const generatedSlug = inputTitle
            .toLowerCase()                        // Convert to lowercase
            .replace(/[^\w\s-]/g, '')             // Remove special characters
            .replace(/\s+/g, '-')                 // Replace spaces with hyphens
            .replace(/-+/g, '-');                 // Remove extra hyphens
        setSlug(generatedSlug);
    }

    const handleSubmit = async (e:any) => {
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
            formData.append("page", "gallery");

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

        const data = {
            title: title,
            slug: slug,
            description: description,
            image_url: uploadedImageUrl
        }

        try {
            const createGalleryResponse = createGallery(data);
            await createGalleryResponse;
            alert("Gallery created successfully");
            router.push("/gallery");
        } catch (error) {
            console.error("Error creating gallery:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="p-5 lg:py-10 lg:px-32">
            <div className="bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-50 shadow-lg rounded-xl p-5">
                <h1 className="text-2xl font-bold">Crete New Gallery</h1>
                <form action="" method="post" className="flex flex-col gap-5 mt-5">
                    <div className="flex gap-3 flex-col">
                        <label htmlFor="title" className="text-xl font-semibold">Title</label>
                        <input onChange={handleTitleChange} value={title} type="text" name="title" id="title" className="w-full px-5 h-7 text-gray-800 rounded-md border-2 border-gray-300" />
                        {isSubmitted && errors.title && <p className="text-red-500">{errors.title}</p>}
                    </div>
                    <div className="flex gap-3 flex-col">
                        <label htmlFor="description" className="text-xl font-semibold">Description</label>
                        <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" name="description" id="description" className="w-full px-5 h-7 text-gray-800 rounded-md border-2 border-gray-300" />
                        {isSubmitted && errors.description && <p className="text-red-500">{errors.description}</p>}
                    </div>
                    <div className="flex gap-3 flex-col">
                        <label htmlFor="image" className="text-xl font-semibold">Image</label>
                        <input type="file" accept="image/*" onChange={handleImage} required />
                        {isSubmitted && errors.image && <p className="text-red-500">{errors.image}</p>}
                        {image && <Image src={URL.createObjectURL(image)} alt="Preview" width={200} height={200} className="mt-3"/>}
                    </div>
                    {/* <button onClick={handleSubmit} className="bg-orange-500 hover:bg-orange-600 p-2 rounded-lg">Create</button> */}
                    <button
                        onClick={handleSubmit}
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
                </form>
            </div>
        </div>
    )
}

export default withAuth(CreateGallery)