'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  // Load saved theme from localStorage when the component mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  // Apply or remove the 'dark' class from the <html> element when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toggle between dark and light mode
  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      // Save the theme preference to localStorage
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  return (
    // Ensure that the 'dark' class applies to all children
    <div className={darkMode ? 'dark' : ''}>
      {/* Pass toggleTheme and darkMode to Navbar */}
      <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />
      <main className="dark:bg-gray-900 min-h-screen">{children}</main>
    </div>
  );
}

