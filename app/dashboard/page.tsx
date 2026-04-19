"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GlowPanel } from "@/components/GlowPanel";
import { SectionHeading } from "@/components/SectionHeading";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="page-stack inner-page">Loading...</div>;
  }

  if (!profile) {
    return <div className="page-stack inner-page">No profile found</div>;
  }

  return (
    <div className="page-stack inner-page">
      <SectionHeading
        eyebrow="Welcome"
        title={`Hello, ${profile.first_name}!`}
        description="This is your protected dashboard. Only authenticated users can access this page."
      />

      <div className="dashboard-grid">
        <GlowPanel className="dashboard-card">
          <h3>Profile Information</h3>
          <div className="profile-info">
            <div className="info-row">
              <span>Full Name</span>
              <strong>
                {profile.first_name} {profile.last_name}
              </strong>
            </div>
            <div className="info-row">
              <span>Email</span>
              <strong>{profile.email}</strong>
            </div>
            {profile.phone_number && (
              <div className="info-row">
                <span>Phone</span>
                <strong>{profile.phone_number}</strong>
              </div>
            )}
            <div className="info-row">
              <span>Member Since</span>
              <strong>{new Date(profile.created_at).toLocaleDateString()}</strong>
            </div>
          </div>

          <Link href="/profile" className="button button-primary" style={{ marginTop: "20px" }}>
            Edit Profile
          </Link>
        </GlowPanel>

        <GlowPanel className="dashboard-card">
          <h3>Quick Actions</h3>
          <div className="actions-list">
            <Link href="/analyzer" className="action-item">
              <span>📊 Go to Analyzer</span>
            </Link>
            <Link href="/how-it-works" className="action-item">
              <span>🔍 View Workflow</span>
            </Link>
            <Link href="/" className="action-item">
              <span>🏠 Back to Home</span>
            </Link>
          </div>
        </GlowPanel>
      </div>
    </div>
  );
}
