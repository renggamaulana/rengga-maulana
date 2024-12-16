"use client";

import { useState } from "react";
import {storage} from "../lib/firebase";
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const ImageUpload = () => { 
    const [image, setImage] = useState<File | null>(null);
    const [uploadPrograss, setUploadProgress] = useState(0);
    const [downloadUrl, setDownloadUrl] = useState("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if(!image) return;
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on("state_changed", (snapshot) => {
            // update progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
        }, (error) => {
            console.log(error);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setDownloadUrl(downloadURL);
                console.log("File available at", downloadURL);
            });
        });
    }

    return (
        <div>
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleUpload} >Upload</button>
            {uploadPrograss && <p>Upload Progress: {uploadPrograss}%</p>}
            {downloadUrl && (
                <p>File uploaded successfully!
                     <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                        {downloadUrl}
                     </a>
                </p>
            )}
        </div>
    )
}


export default ImageUpload;