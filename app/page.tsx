"use client";
import React, { useState } from "react";
import { supabase } from "./supabase";

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("Male");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle User Registration & Login in one go
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !fullName.trim()) {
      setMessage("Bhai naam aur username toh daal pehle!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Check if user already exists in our profiles table
      const { data: existingUser, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username.trim())
        .single();

      if (existingUser) {
        // User exists, log them in straight to swipe screen
        setMessage("Welcome back, logging in...");
        setTimeout(() => setScreen("swipe"), 1000);
      } else {
        // New user, insert their data into Supabase database
        const { error: insertError } = await supabase.from("profiles").insert([
          {
            username: username.trim().toLowerCase(),
            full_name: fullName.trim(),
            gender: gender,
            bio: bio.trim() || "Exploring new connections",
          },
        ]);

        if (insertError) {
          setMessage(`Database error: ${insertError.message}`);
        } else {
          setMessage("Account created successfully!");
          setTimeout(() => setScreen("swipe"), 1000);
        }
      }
    } catch (err: any) {
      setMessage("Kuch lafda hua, fir se try kar!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1c0d0d] text-white flex flex-col justify-center items-center p-4">
      {/* LANDING SCREEN */}
      {screen === "landing" && (
        <div className="flex flex-col items-center justify-center max-w-xs text-center space-y-6">
          <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-pink-500 to-red-500 flex items-center justify-center shadow-lg animate-pulse">
            <span className="text-white text-3xl">❤️</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
            Anvay App
          </h1>
          <p className="text-gray-300 font-medium text-lg leading-relaxed">
            Meaningful connections start here. Live and real-time.
          </p>
          <button
            onClick={() => setScreen("login")}
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3.5 px-6 rounded-full shadow-lg hover:opacity-90 active:scale-95 transition-all"
          >
            Get Started
          </button>
        </div>
      )}

      {/* REGISTRATION / LOGIN SCREEN */}
      {screen === "login" && (
        <div className="flex flex-col items-center justify-center w-full max-w-xs text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
            Create Profile
          </h2>
          <p className="text-gray-400 text-sm">Enter details to find your premium match.</p>
          
          <form onSubmit={handleAuth} className="w-full space-y-3 text-left">
            <div>
              <label className="text-xs font-bold text-gray-400 block mb-1">USERNAME (Unique)</label>
              <input
                type="text"
                placeholder="e.g., rakesh_12"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#2c1616] border border-red-900/40 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 block mb-1">FULL NAME</label>
              <input
                type="text"
                placeholder="Your Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#2c1616] border border-red-900/40 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 block mb-1">GENDER</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-[#2c1616] border border-red-900/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 block mb-1">BIO</label>
              <input
                type="text"
                placeholder="What do you like?"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-[#2c1616] border border-red-900/40 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
              />
            </div>

            {message && (
              <p className="text-center text-sm font-semibold text-pink-400 mt-2 animate-fade-in">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3.5 rounded-full shadow-lg hover:opacity-90 active:scale-95 transition-all mt-4 disabled:opacity-50"
            >
              {loading ? "Saving to DB..." : "Sign In / Join App"}
            </button>
          </form>
        </div>
      )}

      {/* REAL-TIME SWIPE SCREEN */}
      {screen === "swipe" && (
        <div className="flex flex-col items-center justify-center space-y-6 w-full max-w-sm animate-fade-in">
          <div className="w-full bg-[#2c1616] rounded-3xl overflow-hidden shadow-2xl border border-red-900/30 relative aspect-[3/4] flex flex-col justify-end p-6">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1c0d0d]/40 to-[#1c0d0d] z-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 to-red-900/20 flex items-center justify-center">
              <span className="text-6xl filter drop-shadow-md">✨</span>
            </div>
            
            <div className="relative z-20 space-y-1">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                Aanya, <span className="text-xl font-medium text-gray-300">22</span>
              </h3>
              <p className="text-gray-400 text-sm">Music lover • Exploring new places</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 w-full max-w-xs relative z-30">
            <button
              onClick={() => alert("Left Swiped! Data logic coming next.")}
              className="h-14 w-14 rounded-full bg-[#2c1616] border border-red-900/50 flex items-center justify-center text-gray-400 text-xl shadow-lg hover:text-white active:scale-90 transition-all"
            >
              ✖
            </button>
            <button
              onClick={() => alert("Right Swiped! Checking database matches next.")}
              className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white text-2xl shadow-xl hover:opacity-90 active:scale-90 transition-all"
            >
              ❤️
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
