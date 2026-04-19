"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { getSupabaseBrowserClient, hasSupabaseEnv } from "@/lib/supabase/client";

type AuthMode = "login" | "signup";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const isSignup = mode === "signup";
  const isConfigured = hasSupabaseEnv();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!isConfigured) {
      setMessage("Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local first.");
      return;
    }

    startTransition(async () => {
      try {
        const supabase = getSupabaseBrowserClient();

        if (isSignup) {
          // Sign up user with auth
          const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
              },
            },
          });

          if (authError) {
            throw authError;
          }

          if (!authData.user) {
            throw new Error("Failed to create user");
          }

          // Create profile record
          const { error: profileError } = await (
            supabase
              .from("profiles")
              .insert({
                id: authData.user.id,
                email,
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber || null,
              } as any)
          );

          if (profileError) {
            throw profileError;
          }

          setMessage("Account created successfully! Redirecting...");
          // Let middleware handle redirect by refreshing the page
          window.location.href = "/dashboard";
          return;
        }

        // Login
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        setMessage("Login successful! Redirecting...");
        // Let middleware handle redirect by refreshing the page
        window.location.href = "/dashboard";
      } catch (error) {
        const fallback = isSignup ? "Unable to create account." : "Unable to log in.";
        setMessage(error instanceof Error ? error.message : fallback);
      }
    });
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-header">
        <span className="eyebrow">{isSignup ? "Create account" : "Welcome back"}</span>
        <h1>{isSignup ? "Start your workspace" : "Sign in to Lenscore"}</h1>
        <p>
          {isSignup
            ? "User records are created in Supabase Auth with profile metadata for your frontend workflow."
            : "Access your uploaded applications, analysis history, and team-ready review dashboard."}
        </p>
      </div>

      {isSignup ? (
        <>
          <label className="field">
            <span>First Name</span>
            <input
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="Aarav"
              required
              disabled={!isConfigured || isPending}
            />
          </label>

          <label className="field">
            <span>Last Name</span>
            <input
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              placeholder="Sharma"
              required
              disabled={!isConfigured || isPending}
            />
          </label>

          <label className="field">
            <span>Phone Number (optional)</span>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              placeholder="+1 (555) 000-0000"
              disabled={!isConfigured || isPending}
            />
          </label>
        </>
      ) : null}

      <label className="field">
        <span>Email</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@company.com"
          required
          disabled={!isConfigured || isPending}
        />
      </label>

      <label className="field">
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Minimum 6 characters"
          minLength={6}
          required
          disabled={!isConfigured || isPending}
        />
      </label>

      <button className="button button-primary auth-submit" type="submit" disabled={!isConfigured || isPending}>
        {!isConfigured ? "Add Supabase Keys" : isPending ? "Please wait..." : isSignup ? "Create Account" : "Login"}
      </button>

      <p className="auth-message">
        {message ||
          (!isConfigured
            ? "Supabase is not configured yet. Add your project URL and anon key in .env.local."
            : " ")}
      </p>

      <p className="auth-switch">
        {isSignup ? "Already have an account?" : "New here?"}{" "}
        <Link href={isSignup ? "/login" : "/signup"}>{isSignup ? "Login" : "Create one"}</Link>
      </p>
    </form>
  );
}

