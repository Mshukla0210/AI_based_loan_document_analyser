"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/analyzer", label: "Analyzer" },
  { href: "/case-study", label: "Case Study" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const supabase = getSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      const supabase = getSupabaseBrowserClient();
      await supabase.auth.signOut();
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <header className="site-header">
      <div className="brand-mark">
        <span className="brand-badge">Ls</span>
        <div>
          <strong>Lenscore</strong>
          <span>Loan intelligence suite</span>
        </div>
      </div>

      <nav className="nav-pill">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <ThemeToggle />
        {!loading && user ? (
          <>
            <Link href="/dashboard" className="button button-secondary button-small">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="button button-primary button-small"
              style={{ cursor: "pointer" }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="button button-secondary button-small">
              Login
            </Link>
            <Link href="/signup" className="button button-primary button-small">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
