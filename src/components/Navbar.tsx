'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import darkIcon from '../assets/icons/dark.png';
import lightIcon from '../assets/icons/light.png';
import LogoutButton from './LogoutButton';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useTheme } from "@/context/ThemeContext";
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    theme === "dark" ? setDarkMode(true) : setDarkMode(false);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // router.push("/login");
      }
    });

    // Handle scroll for navbar background
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [theme]);

  const menus = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blogs' },
    { name: 'Gallery', url: '/gallery' },
    { name: 'About', url: '/about' }
  ];

  return (
    <header 
      className={`fixed w-full z-50 top-0 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            href="/" 
            className="group flex items-center gap-2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative px-3 py-2 bg-gradient-to-r from-sky-600 to-blue-600 rounded-lg">
                <span className="text-white font-bold text-xl">&lt;/&gt;</span>
              </div>
            </div>
            <span className="hidden md:block font-bold text-neutral-900 dark:text-white">
              Rengga
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menus.map((menu) => (
              <Link
                key={menu.name}
                href={menu.url}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  pathname === menu.url
                    ? 'bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400'
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {menu.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Resume Button - Desktop */}
            <a
              href="https://drive.google.com/file/d/190WQcXYJDfb08W8uEm1MecsWbZs1zhpj/view"
              target="_blank"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Image src={darkIcon} alt="dark" className="w-5 h-5" />
              ) : (
                <Image src={lightIcon} alt="light" className="w-5 h-5" />
              )}
            </button>

            {/* Logout Button - Desktop */}
            <div className="hidden lg:block">
              <LogoutButton />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`bg-neutral-600 dark:bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                    open ? 'rotate-45 translate-y-2' : ''
                  }`}
                ></span>
                <span
                  className={`bg-neutral-600 dark:bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                    open ? 'opacity-0' : 'opacity-100'
                  }`}
                ></span>
                <span
                  className={`bg-neutral-600 dark:bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                    open ? '-rotate-45 -translate-y-2' : ''
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            open ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-4 space-y-2">
            {menus.map((menu) => (
              <Link
                key={menu.name}
                href={menu.url}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  pathname === menu.url
                    ? 'bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400'
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                }`}
              >
                {menu.name}
              </Link>
            ))}

            <a
              href="https://drive.google.com/file/d/1ugbzGsI6qEdMuAYpzr3_bcm1Tlyq30_P/view"
              target="_blank"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-lg font-semibold shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </a>

            <div className="pt-2">
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}