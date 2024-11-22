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

export default function Navbar({toggleTheme, darkMode}: {toggleTheme: () => void, darkMode: boolean,}) {

  let name;
    const [ open, setOpen ] = useState( false )

    // const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // router.push("/login"); // Arahkan pengguna ke halaman login jika belum terautentikasi
      }
    });

    return () => unsubscribe(); // Bersihkan listener saat komponen di-unmount
  }, []);

  return (
        <header className="flex py-2 sticky top-0 z-10 justify-between bg-gray-50 shadow dark:bg-black  items-center xl:max-w-full xl:mx-auto max-w-full px-5 lg:px-10 flex-wrap">
          <h1 className="font-bold text-xl dark:text-gray-50 text-gray-800">
            <Link href="/">RENGGAMAULANA</Link>
          </h1>
          {/* Hamburger Menu Toggle Button */}
          <button className="lg:hidden block text-gray-800 dark:text-white focus:outline-none"  onClick={() => setOpen(!open)}>
            {open ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>

          {/* <FiMenu className="lg:hidden dark:text-white block h-6 w-6 cursor-pointer" onClick={() => setOpen(!open)} /> */}
          <nav className={`${open ? "block" : "hidden"} lg:flex lg:items-center lg:w-auto w-full lg:pt-0 pt-3`}>
            <ul className="text-base gap-5 text-gray-600 flex flex-col lg:items-center lg:flex-row lg:justify-between">
                <li className="hover:text-cyan-500 dark:hover:text-cyan-500 dark:text-gray-50 font-semibold">
                    <Link href="/">Profile</Link>

                </li>
                <li className="hover:text-cyan-500 dark:hover:text-cyan-500 dark:text-gray-50 font-semibold">
                    <Link href="/blogs">Blog</Link>
                </li>
                <li>
                  <a href="https://drive.google.com/file/d/1z6sRK6FINBrgFweDCcYLMN-pLB7jnR79/view" target='_blank' className="text-gray-50 hover:text-white font-semibold bg-gradient-to-r from-cyan-500 to-teal-500 p-2 rounded-md">Resume</a>
                </li>
                <li>
                  <button
                      onClick={toggleTheme}
                      className="rounded-lg z-10 p-2 bg-gray-100 bg-opacity-80 backdrop-blur-md text-black dark:bg-gray-800 dark:bg-opacity-80 dark:text-white flex items-center transition-all duration-300 ease-in-out"
                    >
                      {darkMode ? (
                        <Image src={lightIcon} alt="Light Mode" className="w-5 h-5" />
                      ) : (
                        <Image src={darkIcon} alt="Dark Mode" className="w-5 h-5" />
                      )}
                  </button>
                </li>
                <li>
                  <LogoutButton />
                </li>
            </ul>
         </nav>
        </header>
  );
}
