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
            setTimeout(() => {
                setError('');
              }, 1500);
        }
    };

    return (
        <div className="py-10 px-10 md:px-40 lg:px-80 flex justify-center">
            {error &&
            <div className="absolute top-20 right-6 rounded-xl shadow-xl bg-white p-5">
                <p className="text-red-500">{error}</p>
            </div>
             }
            <div className="flex w-full flex-col rounded-xl gap-5 bg-white dark:bg-gradient-to-tr from-neutral-900 to-neutral-950 shadow-lg p-10 items-center">
                <h1 className="text-3xl text-gray-800 dark:text-gray-50 font-bold">Login</h1>
                
                <form onSubmit={handleLogin} className="flex w-full flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-lg text-gray-800 dark:text-gray-50">Email</label>
                        <input
                            type="email"
                            name="username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Username"
                            required
                            className="px-2 py-1 text-neutral-950 dark:text-white dark:bg-transparent border border-gray-400 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col gap-2 text-gray-800 dark:text-gray-50">
                        <label className="text-lg">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="px-2 py-1 text-neutral-950 dark:text-white dark:bg-transparent border border-gray-400 rounded-md"
                        />
                    </div>
                    <button type="submit" className="bg-gradient-to-br from-orange-400 to-orange-600 text-white px-4 py-2 rounded-lg">Login</button>
                </form>
            </div>
        </div>
    )
}