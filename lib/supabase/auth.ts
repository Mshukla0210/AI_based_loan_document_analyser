"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseBrowserClient } from "./client";
import { SignUpData, LoginData } from "./types";

/**
 * Sign up a new user with email/password and store profile
 */
export async function signUp(data: SignUpData) {
  try {
    const supabase = getSupabaseBrowserClient();

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
          phone_number: data.phone_number || null,
        },
      },
    });

    if (authError) {
      return { error: authError.message };
    }

    if (!authData.user) {
      return { error: "Failed to create user" };
    }

    // Create user profile
    const { error: profileError } = await (
      supabase
        .from("profiles")
        .insert({
          id: authData.user.id,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          phone_number: data.phone_number || null,
        } as any)
    );

    if (profileError) {
      return { error: profileError.message };
    }

    revalidatePath("/");
    return {
      success: true,
      message: "Account created successfully. Please check your email to confirm.",
    };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "An error occurred" };
  }
}

/**
 * Login user with email/password
 */
export async function login(data: LoginData) {
  try {
    const supabase = getSupabaseBrowserClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Login failed" };
  }
}

/**
 * Sign out user
 */
export async function logout() {
  try {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Logout failed" };
  }
}

/**
 * Reset password via email
 */
export async function resetPassword(email: string) {
  try {
    const supabase = getSupabaseBrowserClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/reset-password`,
    });

    if (error) {
      return { error: error.message };
    }

    return { success: true, message: "Password reset link sent to your email" };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Failed to send reset link" };
  }
}

/**
 * Update user profile
 */
export async function updateProfile(
  userId: string,
  updates: {
    first_name?: string;
    last_name?: string;
    phone_number?: string | null;
  }
) {
  try {
    const supabase = getSupabaseBrowserClient();

    const { error } = await supabase
      .from("profiles")
      // @ts-ignore - Supabase types not fully supported
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Update failed" };
  }
}

/**
 * Get user profile
 */
export async function getProfile(userId: string) {
  try {
    const supabase = getSupabaseBrowserClient();

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      return { error: error.message };
    }

    return { data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Failed to fetch profile" };
  }
}
