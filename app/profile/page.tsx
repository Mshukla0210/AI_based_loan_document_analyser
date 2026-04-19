"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GlowPanel } from "@/components/GlowPanel";
import { SectionHeading } from "@/components/SectionHeading";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { updateProfile } from "@/lib/supabase/auth";

export default function ProfilePage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const supabase = getSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setUserId(user.id);

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single() as { data: any; error: any };

      if (error) {
        setMessage("Failed to load profile");
        return;
      }

      if (profile) {
        setFirstName(profile.first_name || "");
        setLastName(profile.last_name || "");
        setPhoneNumber(profile.phone_number || "");
        setEmail(profile.email || "");
      }
    } catch (error) {
      setMessage("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const result = await updateProfile(userId, {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber || null,
    });

    setSaving(false);

    if (result.error) {
      setMessage(`Error: ${result.error}`);
    } else {
      setMessage("Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    }
  }

  if (loading) {
    return <div className="page-stack inner-page">Loading...</div>;
  }

  return (
    <div className="page-stack inner-page">
      <SectionHeading
        eyebrow="Account"
        title="Edit Your Profile"
        description="Update your personal information here."
      />

      <GlowPanel className="auth-panel">
        <form onSubmit={handleSubmit} className="auth-form">
          <label className="field">
            <span>Email (read-only)</span>
            <input type="email" value={email} disabled />
          </label>

          <label className="field">
            <span>First Name</span>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              required
              disabled={saving}
            />
          </label>

          <label className="field">
            <span>Last Name</span>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
              required
              disabled={saving}
            />
          </label>

          <label className="field">
            <span>Phone Number (optional)</span>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1 (555) 000-0000"
              disabled={saving}
            />
          </label>

          <button
            className="button button-primary auth-submit"
            type="submit"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          {message && <p className="auth-message">{message}</p>}
        </form>
      </GlowPanel>
    </div>
  );
}
