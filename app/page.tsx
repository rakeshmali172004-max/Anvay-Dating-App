"use client";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xyz.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [screen, setScreen] = useState("landing");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("Male");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !fullName.trim()) {
      setMessage("Bhai naam aur username dono daalna zaroori hai!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { data: existingUser } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username.trim().toLowerCase())
        .maybeSingle();

      if (existingUser) {
        setMessage("Welcome back! Logging in...");
        setTimeout(() => setScreen("swipe"), 1200);
      } else {
        const { error: insertError } = await supabase.from("profiles").insert([
          {
            username: username.trim().toLowerCase(),
            full_name: fullName.trim(),
            gender: gender,
            bio: bio.trim() || "Exploring connections",
          },
        ]);

        if (insertError) {
          setMessage(`DB Error: ${insertError.message}`);
        } else {
          setMessage("Account created successfully!");
          setTimeout(() => setScreen("swipe"), 1200);
        }
      }
    } catch (err) {
      setMessage("Redirecting to app...");
      setTimeout(() => setScreen("swipe"), 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#1c0d0d",
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      fontFamily: "sans-serif"
    }}>
      
      {screen === "landing" && (
        <div style={{ textAlign: "center", maxWidth: "300px" }}>
          <div style={{
            height: "70px", width: "70px", borderRadius: "50%",
            background: "linear-gradient(to top right, #ec4899, #ef4444)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px auto", fontSize: "30px", boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
          }}>❤️</div>
          <h1 style={{ fontSize: "36px", margin: "0 0 10px 0", fontWeight: "900" }}>Anvay App</h1>
          <p style={{ color: "#d1d5db", fontSize: "16px", marginBottom: "30px" }}>Meaningful connections, real conversations.</p>
          <button
            onClick={() => setScreen("login")}
            style={{
              width: "100%", background: "linear-gradient(to right, #ec4899, #ef4444)",
              color: "white", fontWeight: "bold", border: "none", padding: "14px",
              borderRadius: "50px", fontSize: "16px", cursor: "pointer", boxShadow: "0 4px 10px rgba(236,72,153,0.4)"
            }}
          >
            Get Started
          </button>
        </div>
      )}

      {screen === "login" && (
        <div style={{ width: "100%", maxWidth: "300px", textAlign: "center" }}>
          <h2 style={{ fontSize: "28px", margin: "0 0 5px 0", fontWeight: "800" }}>Create Profile</h2>
          <p style={{ color: "#9ca3af", fontSize: "14px", marginBottom: "25px" }}>Enter details to find your premium match.</p>
          
          <form onSubmit={handleAuth} style={{ textAlign: "left" }}>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "12px", fontWeight: "bold", color: "#9ca3af", display: "block", marginBottom: "5px" }}>USERNAME</label>
              <input
                type="text"
                placeholder="e.g., rakesh_12"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: "100%", backgroundColor: "#2c1616", border: "1px solid rgba(153,27,27,0.4)", borderRadius: "12px", padding: "12px", color: "white", boxSizing: "border-box" }}
                required
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "12px", fontWeight: "bold", color: "#9ca3af", display: "block", marginBottom: "5px" }}>FULL NAME</label>
              <input
                type="text"
                placeholder="Your Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ width: "100%", backgroundColor: "#2c1616", border: "1px solid rgba(153,27,27,0.4)", borderRadius: "12px", padding: "12px", color: "white", boxSizing: "border-box" }}
                required
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "12px", fontWeight: "bold", color: "#9ca3af", display: "block", marginBottom: "5px" }}>GENDER</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                style={{ width: "100%", backgroundColor: "#2c1616", border: "1px solid rgba(153,27,27,0.4)", borderRadius: "12px", padding: "12px", color: "white", boxSizing: "border-box" }}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "12px", fontWeight: "bold", color: "#9ca3af", display: "block", marginBottom: "5px" }}>BIO</label>
              <input
                type="text"
                placeholder="What do you like?"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                style={{ width: "100%", backgroundColor: "#2c1616", border: "1px solid rgba(153,27,27,0.4)", borderRadius: "12px", padding: "12px", color: "white", boxSizing: "border-box" }}
              />
            </div>

            {message && <p style={{ color: "#f472b6", fontSize: "14px", fontWeight: "600", textAlign: "center", margin: "10px 0" }}>{message}</p>}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", background: "linear-gradient(to right, #ec4899, #ef4444)",
                color: "white", fontWeight: "bold", border: "none", padding: "14px",
                borderRadius: "50px", fontSize: "16px", cursor: "pointer", marginTop: "15px",
                opacity: loading ? 0.6 : 1
              }}
            >
              {loading ? "Saving to Database..." : "Join App"}
            </button>
          </form>
        </div>
      )}

      {screen === "swipe" && (
        <div style={{ width: "100%", maxWidth: "350px", textAlign: "center" }}>
          <div style={{
            backgroundColor: "#2c1616", borderRadius: "24px", padding: "20px",
            height: "400px", display: "flex", flexDirection: "column",
            justifyContent: "flex-end", textAlign: "left", boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
            border: "1px solid rgba(153,27,27,0.2)", position: "relative"
          }}>
            <div style={{ fontSize: "60px", position: "absolute", top: "40%", left: "40%" }}>✨</div>
            <h3 style={{ fontSize: "24px", margin: "0 0 5px 0" }}>Aanya, <span style={{ fontWeight: "normal", color: "#d1d5db" }}>22</span></h3>
            <p style={{ color: "#9ca3af", margin: "0", fontSize: "14px" }}>Music lover • Exploring places</p>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
            <button onClick={() => alert("Left Swiped!")} style={{ height: "55px", width: "55px", borderRadius: "50%", backgroundColor: "#2c1616", border: "1px solid rgba(153,27,27,0.4)", color: "#9ca3af", fontSize: "20px", cursor: "pointer" }}>✖</button>
            <button onClick={() => alert("Right Swiped!")} style={{ height: "60px", width: "60px", borderRadius: "50%", background: "linear-gradient(to right, #ec4899, #ef4444)", border: "none", color: "white", fontSize: "24px", cursor: "pointer", boxShadow: "0 4px 15px rgba(236,72,153,0.4)" }}>❤️</button>
          </div>
        </div>
      )}
    </div>
  );
}

