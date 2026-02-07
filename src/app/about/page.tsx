"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import profile from '../../assets/images/profile.jpeg'
import SocialMedia from "@/components/SocialMedia";
import { usePathname } from "next/navigation";

export default function About() {
    const pathname = usePathname();

    const stats = [
        { label: 'Years Experience', value: '3+' },
        { label: 'Projects Completed', value: '20+' },
        { label: 'Technologies', value: '15+' },
        { label: 'Happy Clients', value: '10+' }
    ];

    const values = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Quality First',
            description: 'Committed to delivering clean, maintainable code that stands the test of time.'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: 'Fast Delivery',
            description: 'Efficient workflow and modern tools ensure timely project completion.'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            title: 'Continuous Learning',
            description: 'Always staying updated with the latest technologies and best practices.'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: 'Collaboration',
            description: 'Strong communicator who values teamwork and stakeholder input.'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-sky-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
            {/* Hero Section */}
            <section className="relative py-20 px-5 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 right-10 w-72 h-72 bg-sky-200 dark:bg-sky-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Image Side */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="order-2 lg:order-1"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 rounded-3xl blur-2xl opacity-30"></div>
                                <Image 
                                    src={profile} 
                                    alt="Rengga Maulana" 
                                    className="relative rounded-3xl shadow-2xl w-full object-cover"
                                    width={600} 
                                    height={600} 
                                />
                            </div>
                        </motion.div>

                        {/* Content Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="order-1 lg:order-2 space-y-6"
                        >
                            <div>
                                <span className="px-4 py-2 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-full text-sm font-semibold">
                                    About Me
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white leading-tight">
                                Building Digital Solutions with{' '}
                                <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                                    Passion
                                </span>
                            </h1>

                            <div className="space-y-4 text-lg text-neutral-600 dark:text-neutral-300">
                                <p>
                                    I'm a <strong className="text-neutral-900 dark:text-white">Fullstack Developer</strong> with a passion for creating efficient, scalable web applications. My journey in tech has equipped me with expertise in both frontend and backend development.
                                </p>
                                <p>
                                    I specialize in building modern web experiences using <strong className="text-sky-600">React</strong>, <strong className="text-sky-600">Next.js</strong>, and <strong className="text-sky-600">Node.js</strong>, while ensuring every project meets the highest standards of quality and performance.
                                </p>
                                <p>
                                    When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, and sharing knowledge with the developer community.
                                </p>
                            </div>

                            <div className="pt-4">
                                <a 
                                    href="https://drive.google.com/file/d/190WQcXYJDfb08W8uEm1MecsWbZs1zhpj/view" 
                                    target="_blank"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Download Resume
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-5 bg-white dark:bg-neutral-900">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                            Core Values
                        </h2>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                            The principles that guide my work and professional approach
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-sky-100 dark:bg-sky-900 rounded-xl text-sky-600 dark:text-sky-400 flex-shrink-0">
                                        {value.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                                            {value.title}
                                        </h3>
                                        <p className="text-neutral-600 dark:text-neutral-400">
                                            {value.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-5">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Let's Work Together
                        </h2>
                        <p className="text-lg mb-8 opacity-90">
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                        </p>
                        <div className="mb-8">
                            <SocialMedia pathname={pathname} />
                        </div>
                        <a 
                            href="mailto:renggaa21@gmail.com"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sky-600 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Get in Touch
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}