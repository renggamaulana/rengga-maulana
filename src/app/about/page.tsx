"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import profile from '../../assets/images/profile1.jpeg'
import SocialMedia from "@/components/SocialMedia";
import { usePathname } from "next/navigation";
export default function About() {
    const pathname = usePathname();
    return (
        <div className="p-10 lg:p-20">
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    borderBottom: '5px solid #5c5cff',
                    width: 'fit-content',
                }}>
                    <h1 className="text-center text-3xl lg:text-6xl font-bold">About Me</h1> 
            </motion.div>
            <div className="flex items-center flex-wrap md:flex-nowrap lg:flex-nowrap gap-10">
                <div className="mt-10 w-full lg:w-1/2">
                    <Image src={profile} alt="about" className="object-cover rounded-md" width={500} height={500} />
                </div>
                <div className="w-full lg:w-1/2">
                    <div>
                        <h1 className="text-3xl lg:text-6xl font-bold dark:text-neutral-200 text-neutral-600">Hello there! Wondering what this is all about?</h1>
                        <p className="dark:text-neutral-300 text-neutral-600 mt-5">This is a personal blog website that I created to share my thoughts and experiences about various topics. I hope you find it interesting and informative.</p>
                    </div>
                    <div className="mt-20">
                        <h3 className="mb-10 dark:text-neutral-300 text-neutral-600">Want to work with me? Feel free to contact me on:</h3>
                        <SocialMedia pathname={pathname} />
                    </div>
                </div>
            </div>
        </div>
    );
}