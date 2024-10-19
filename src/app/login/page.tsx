"use client"
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { auth } from "../../lib/firebase";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/blogs"); // Redirect after successful login
        } catch (err) {
            setError("Login failed: " + (err as Error).message);
        }
    };

    if (error) {
        return (
            <div className="py-10 px-10 md:px-40 lg:px-80 flex justify-center">
                <div className="flex w-full flex-col rounded-xl gap-5 bg-white shadow-lg p-10 items-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="text-red-500">{error}</p>
                </div>
            </div>
        );
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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