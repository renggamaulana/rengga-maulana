"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    // const handleLogin = async (e:any) => {
    //     e.preventDefault();
    //     try {
    //         const res = await axios.post("http://localhost:8000/api/login", {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({username, password})
    //         });
    //         const data = await res.data;
    //         const token = localStorage.setItem("token", data.token);
    //     } catch (error:any) {
    //         if (error.response) {
    //             // Check if error response has data for more info
    //             if (error.response.status === 422) {
    //               alert('Validation Error: ' + error.response.data.message); // or any specific field message
    //             } else {
    //               alert('Error: ' + error.response.data.message || 'An error occurred');
    //             }
    //           } else {
    //             alert('Error: ' + error.message); // Handle other types of errors
    //           }
    //     }
    // }
    const handleLogin = () => {
        alert('OK');
    }

    return (
        <div className="py-10 px-10 md:px-40 lg:px-80 flex justify-center">
            <div className="flex w-full flex-col rounded-xl gap-5 bg-white shadow-lg p-10 items-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <form onSubmit={handleLogin} className="flex w-full flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-lg">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                            className="px-2 py-1 border border-gray-400 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-lg">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="px-2 py-1 border border-gray-400 rounded-md"
                        />
                    </div>
                    <button type="submit" className="bg-cyan-500 text-white px-4 py-2 rounded-lg">Login</button>
                </form>
            </div>
        </div>
    )
}