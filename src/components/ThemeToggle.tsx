"use client";

import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="w-9 h-9 flex items-center justify-center rounded-xl bg-parchment-200 hover:bg-parchment-300 dark:bg-night-card dark:hover:bg-night-border transition-colors duration-200 text-lg"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
};
