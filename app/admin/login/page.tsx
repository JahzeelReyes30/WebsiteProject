"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Incorrect email or password.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#e6f6f4] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl bg-white p-8 shadow-[0_8px_24px_rgba(11,61,58,0.12)]"
      >
        <h1 className="mb-1 text-xl font-bold text-[#0b3d3a]">Admin Login</h1>
        <p className="mb-5 text-sm text-[#4a5a58]">MajinCleaningSolutions booking dashboard</p>

        <label htmlFor="email" className="mb-1 block text-sm font-semibold">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mb-4 w-full rounded-md border border-[#d8e8e6] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#14a89a]/30 focus:border-[#14a89a]"
        />

        <label htmlFor="password" className="mb-1 block text-sm font-semibold">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mb-5 w-full rounded-md border border-[#d8e8e6] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#14a89a]/30 focus:border-[#14a89a]"
        />

        {error && <p className="mb-4 text-sm text-[#c0392b]">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[#14a89a] px-6 py-2.5 font-semibold text-white hover:bg-[#0f6b63] disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
