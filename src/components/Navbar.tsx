'use client';

import Image from 'next/image';
import Link from 'next/link';
import darkIcon from '../assets/icons/dark.png';
import lightIcon from '../assets/icons/light.png';

export default function Navbar({toggleTheme, darkMode}: {toggleTheme: () => void, darkMode: boolean,}) {
  
  const scrollToSection = (sectionId: string, event: React.MouseEvent) => {
    event.preventDefault();
    const navbarHeight = 60;
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionPosition = section.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: sectionPosition,
        behavior: 'smooth',
      });
    }
  };


  return (
    <nav className="flex sticky top-0 w-full z-10 shadow bg-white dark:bg-gray-900 justify-between items-center px-10 py-3 dark:text-white">
      <h1 className="font-bold text-xl dark:text-gray-50 text-gray-800">
          <Link href="/">DEVELOPBYREN</Link>
      </h1>
      <ul className="flex items-center gap-10">
          {/* <li>
            <a className="text-gray-800 dark:text-gray-50 font-semibold" href="/" onClick={(event) => scrollToSection('profile', event)}>Profile</a>
          </li>
          <li>
            <a className="text-gray-800 dark:text-gray-50 font-semibold" href="/" onClick={(event) => scrollToSection('projects', event)}>Projects</a>
          </li>
          <li>
            <a className="text-gray-800 dark:text-gray-50 font-semibold" href="/" onClick={(event) => scrollToSection('stack', event)}>Stack</a>
          </li>
          <li>
            <a className="text-gray-800 dark:text-gray-50 font-semibold" href="/" onClick={(event) => scrollToSection('about', event)}>About</a>
          </li> */}
          <li>
            <Link className="text-gray-800 dark:text-gray-50 font-semibold hover:underline" href="/">Profile</Link>
          </li>
          <li>
              <Link className="text-gray-800 dark:text-gray-50 font-semibold hover:underline" href="/blogs">Blog</Link>
          </li>
          <li>
          <a href="../app/resume-rengga-maulana.pdf" download className="text-white font-semibold bg-gradient-to-r from-cyan-500 to-teal-500 p-2 rounded-md">Resume</a>
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
      </ul>
    </nav>
  );
}
