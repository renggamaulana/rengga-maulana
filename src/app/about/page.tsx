"use client";
import { motion } from "framer-motion";

export default function About() {
    return (
        <div className="p-10 lg:p-20 h-screen">
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    borderBottom: '5px solid #5c5cff',
                    width: 'fit-content',
                }}>
                    <h1 className="text-center text-6xl font-bold">About</h1> 
                </motion.div>
        </div>
    );
}