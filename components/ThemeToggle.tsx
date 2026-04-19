"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("lenscore-theme") as Theme | null;
    const nextTheme = savedTheme ?? "dark";
    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);
    setMounted(true);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("lenscore-theme", nextTheme);
  }

  return (
    <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      <span>{mounted && theme === "dark" ? "Dark" : "Light"}</span>
      <strong>{mounted && theme === "dark" ? "Green Noir" : "Blue White"}</strong>
    </button>
  );
}
