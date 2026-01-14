"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/admin/projects");
    } else {
      setError("Invalid login credentials");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="w-full max-w-md space-y-6">

        <h1 className="text-3xl font-bold text-white">
          Admin Login
        </h1>

        {error && (
          <p className="text-red-500 text-sm font-medium">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="
            w-full p-3
            bg-black
            text-white
            border border-gray-500
            focus:outline-none
            focus:border-white
            placeholder-gray-400
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="
            w-full p-3
            bg-black
            text-white
            border border-gray-500
            focus:outline-none
            focus:border-white
            placeholder-gray-400
          "
        />

        <button
          onClick={login}
          className="
            w-full py-3
            bg-white
            text-black
            font-semibold
            hover:bg-gray-200
            transition
          "
        >
          Login
        </button>

      </div>
    </main>
  );
}
