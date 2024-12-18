'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import darkIcon from '../assets/icons/dark.png';
import lightIcon from '../assets/icons/light.png';
import { FiMenu, FiX } from 'react-icons/fi'
import LogoutButton from './LogoutButton';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useTheme } from "@/context/ThemeContext";
export default function Navbar() {

  const { theme, toggleTheme } = useTheme();
  const [darkMode, setDarkMode] = useState(false);

  const [ open, setOpen ] = useState( false )

  useEffect(() => {
    theme === "dark" ? setDarkMode(true) : setDarkMode(false);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // router.push("/login"); // Arahkan pengguna ke halaman login jika belum terautentikasi
      }
    });

    return () => unsubscribe(); // Bersihkan listener saat komponen di-unmount
  }, []);

  const menus:any[] = [
    {
      name: 'Profile',
      url: '/'
    },
    {
      name: 'Blog',
      url: '/blogs'
    },
    {
      name: 'Gallery',
      url: '/gallery'
    },
    {
      name: 'About',
      url: '/about'
    }
  ]
  return (
        <header className={`sticky z-10 top-0 ${theme === 'light'? 'bg-white' : ''} dark:bg-gradient-to-tl from-neutral-900 to-neutral-950`}>
          <nav className="flex justify-between capriola items-center px-5 py-5 lg:w-auto w-full">
            <h1 className="font-bold text-xl text-orange-400">
              <Link href="/">&lt;/&gt;</Link>
            </h1>
            {/* Hamburger Menu Toggle Button */}
            <button onClick={() => setOpen(!open)} className="lg:hidden flex gap-1 flex-col">
                <div className={`bg-neutral-600 dark:bg-white block transition-all duration-500 ease-out h-0.5 w-6 rounded-sm 
                    ${open ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></div>
                <div className={`bg-neutral-600 dark:bg-white block transition-all duration-500 ease-out h-0.5 w-5 rounded-sm
                    ${open ?
                'opacity-0' : 'opacity-100'
                }`}></div>
                <div className={`bg-neutral-600 dark:bg-white block transition-all duration-500 ease-out h-0.5 w-4 rounded-sm
                    ${open ?
                '-rotate-45 -translate-y-2 w-6' : 'translate-y-0.5'
                }`}></div>
            </button>
            <div className="absolute w-auto right-0">
              {/* Overlay */}
              {open && (
                <div
                  onClick={() => setOpen(false)}
                  className="fixed inset-0 z-9"
                ></div>
              )}
              <div className={`absolute lg:static top-8 md:top-10 right-3 ${open? 'opacity-100 duration-500 bg-white dark:bg-gradient-to-tl from-neutral-900 to-neutral-950 shadow dark:shadow-none' : 'opacity-0'} rounded md:rounded-none md:opacity-100 w-[50vw] md:w-auto`}>
                <ul className={`text-base gap-5 text-gray-600 p-5 flex lg:items-center lg:flex lg:flex-row ${open? 'flex flex-col md:w-[32vw] md:py-10' : 'hidden'} md:justify-between`}>
                    {menus.map((menu) => (
                      <li key={menu.name} onClick={() => setTimeout(() => {setOpen(false);}, 200)} className="hover:text-orange-500 dark:hover:text-orange-500 dark:text-gray-50 font-semibold">
                          <Link href={menu.url}>{menu.name}</Link>
                      </li>
                    ))}
                    <li>
                      <a href="https://drive.google.com/file/d/1zVT4NGTqSQ4KHpIHvXmETal6RbGti9d4/view" target='_blank' className="text-gray-50 hover:text-white font-semibold bg-gradient-to-r from-orange-700 to-orange-500 p-2 rounded-md">Resume</a>
                    </li>
                    <li>
                      <button
                          onClick={toggleTheme}
                          className="rounded-lg z-10 p-2 bg-gray-100 bg-opacity-80 backdrop-blur-md text-black dark:bg-gray-800 dark:bg-opacity-80 dark:text-white flex items-center transition-all duration-300 ease-in-out"
                        >
                          {theme === "light"  ? (
                            <Image src={darkIcon} alt="dark" className="w-5 h-5" />
                          ) : (
                            <Image src={lightIcon} alt="light" className="w-5 h-5" />
                          )}
                      </button>
                    </li>
                    <li className="mr-5">
                      <LogoutButton />
                    </li>
                </ul>
              </div>
            </div>
            
         </nav>
        </header>
  );
}
