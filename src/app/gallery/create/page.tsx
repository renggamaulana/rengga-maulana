"use client"
import { withAuth } from "@/components/WithAuth"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createGallery } from "@/services/galleryServices";
import Image from "next/image";


const CreateGallery = () => {

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleImage = (e:any) => {
        const file = e.target.files[0];
        if(file) {
            setImage(file);
        }
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
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
            await createGallery(data);
            alert("Gallery created successfully");
            router.push("/gallery");
        } catch (error) {
            console.error("Error creating gallery:", error);
        }
    }


    return (
        <div className="p-5 lg:p-20 ">
            <div className="bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-50 shadow-lg rounded-xl p-10">
                <h1>Crete New Gallery</h1>
                <form action="" method="post" className="flex flex-col items-center gap-5">
                    <div className="flex gap-5 flex-col items-center">
                        <label htmlFor="title" className="text-xl font-semibold">Title</label>
                        <input onChange={(e) => setTitle(e.target.value)} type="text" name="title" id="title" className="w-[20rem] px-5 h-10 text-gray-800 rounded-md border-2 border-gray-300" />
                    </div>
                    <div className="flex gap-5 flex-col items-center">
                        <label htmlFor="description" className="text-xl font-semibold">Description</label>
                        <input onChange={(e) => setDescription(e.target.value)} type="text" name="description" id="description" className="w-[20rem] px-5 h-10 text-gray-800 rounded-md border-2 border-gray-300" />
                    </div>
                    <div className="flex gap-5 flex-col items-center">
                        <label htmlFor="image" className="text-xl font-semibold">Image</label>
                        <input type="file" accept="image/*" onChange={handleImage} required />
                        {image && <Image src={URL.createObjectURL(image)} alt="Preview" width={200} height={200} className="mt-3"/>}
                    </div>
                    <button onClick={handleSubmit} className="bg-orange-500 hover:bg-orange-600 p-2 rounded-lg">Create</button>
                </form>
            </div>
        </div>
    )
}

export default withAuth(CreateGallery)