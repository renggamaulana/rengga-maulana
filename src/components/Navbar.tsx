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

  const menus:any[] = [
    {
      name: 'Profile',
      url: '/'
    },
    {
      name: 'Blog',
      url: '/blogs'
    }
  ]
  return (
        <header className={`flex py-2 sticky top-0 z-10 justify-between ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} dark:bg-gradient-to-r from-neutral-900 to-neutral-950 dark:text-gray-800 items-center xl:max-w-full xl:mx-auto max-w-full px-5 lg:px-10 flex-wrap`}>
          <h1 className="font-bold text-xl text-orange-400">
            <Link href="/">&lt;/&gt;</Link>
          </h1>
          {/* Hamburger Menu Toggle Button */}
          <button onClick={() => setOpen(!open)} className="lg:hidden flex gap-1 flex-col">
              <div className={`bg-neutral-600 dark:bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm 
                  ${open ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></div>
              <div className={`bg-neutral-600 dark:bg-white block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm
                  ${open ? 
              'opacity-0' : 'opacity-100'
              }`}></div>
              <div className={`bg-neutral-600 dark:bg-white block transition-all duration-300 ease-out h-0.5 w-4 rounded-sm
                  ${open ? 
              '-rotate-45 -translate-y-2 w-6' : 'translate-y-0.5'
              }`}></div>
          </button>

          <nav className={`${open ? "block dark:bg-gradient-to-r from-neutral-900 to-neutral-950 border-none w-screen h-screen" : "hidden"} lg:flex lg:items-center lg:w-auto w-full lg:pt-3`}>
            <ul className="text-base gap-5 text-gray-600 flex flex-col p-5 md:p-0 lg:items-center lg:flex-row lg:justify-between">
                {menus.map((menu) => (
                   <li onClick={() => setTimeout(() => {setOpen(false);}, 200)} className="hover:text-orange-500 dark:hover:text-orange-500 dark:text-gray-50 font-semibold">
                      <Link href={menu.url}>{menu.name}</Link>
                  </li>
                ))}
                <li>
                  <a href="https://drive.google.com/file/d/1s4DmUFtdAhnmRCAIPNiyLAg7_c_kcLBM/view" target='_blank' className="text-gray-50 hover:text-white font-semibold bg-gradient-to-r from-orange-700 to-orange-500 p-2 rounded-md">Resume</a>
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
