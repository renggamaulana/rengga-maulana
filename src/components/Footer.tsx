"use client"

import Link from "next/link";
import SocialMedia from "./SocialMedia";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        navigation: [
            { name: 'Home', href: '/' },
            { name: 'Blog', href: '/blogs' },
            { name: 'Gallery', href: '/gallery' },
            { name: 'About', href: '/about' },
        ],
        resources: [
            { name: 'Resume', href: 'https://drive.google.com/file/d/190WQcXYJDfb08W8uEm1MecsWbZs1zhpj/view', external: true },
            { name: 'GitHub', href: 'https://github.com', external: true },
            { name: 'LinkedIn', href: 'https://linkedin.com', external: true },
        ]
    };

    return (
        <footer className="relative bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
            {/* Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-5 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-600 rounded-lg blur opacity-50"></div>
                                <div className="relative px-3 py-2 bg-gradient-to-r from-sky-600 to-blue-600 rounded-lg">
                                    <span className="text-white font-bold text-xl">&lt;/&gt;</span>
                                </div>
                            </div>
                            <span className="font-bold text-xl text-neutral-900 dark:text-white">
                                Rengga
                            </span>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                            Building modern web experiences with clean code and creative solutions.
                        </p>
                        {/* Social Media */}
                        <div className="pt-2">
                            <SocialMedia pathname="" />
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">
                            Navigation
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.navigation.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">
                            Resources
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    {link.external ? (
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors text-sm flex items-center gap-1"
                                        >
                                            {link.name}
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className="text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors text-sm"
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm text-center md:text-left">
                            © {currentYear} Rengga Maulana. All rights reserved.
                        </p>
                        
                        {/* Optional: Add additional links like Privacy Policy, Terms */}
                        <div className="flex gap-6 text-sm">
                            <a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="absolute -top-6 right-8 p-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                aria-label="Back to top"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
        </footer>
    );
}