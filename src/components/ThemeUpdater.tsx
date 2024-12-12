"use client";
import { useLayoutEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

const ThemeUpdater = () => {
  const { theme } = useTheme();

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return null; // Tidak merender apa pun
};

export default ThemeUpdater;
