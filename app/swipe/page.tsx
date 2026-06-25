"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xyz.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function SwipePage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) throw error;
      if (data) {
        setProfiles(data);
      }
    } catch (err) {
      console.error("Error fetching profiles:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = (direction: string) => {
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div style={{ backgroundColor: "#120d0d", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: "400px", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.8rem", marginBottom: "20px", color: "#ff2d55" }}>Anvay Swipe Feed</h1>
        
        {loading ? (
          <p style={{ color: "#aaa" }}>Database se real profiles load ho rahi hain...</p>
        ) : currentIndex < profiles.length ? (
          <div style={{ backgroundColor: "#221a1a", borderRadius: "20px", overflow: "hidden", boxShadow: "0 10px 20px rgba(0,0,0,0.3)", position: "relative", minHeight: "400px", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "20px", textAlign: "left", backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 100%)" }}>
            <div style={{ position: "absolute", top: "20px", left: "20px", backgroundColor: "#ff2d55", padding: "5px 12px", borderRadius: "15px", fontSize: "0.8rem", fontWeight: "bold" }}>
              {profiles[currentIndex].gender || "User"}
            </div>
            <h2 style={{ fontSize: "2rem", marginBottom: "5px" }}>{profiles[currentIndex].full_name || profiles[currentIndex].username}</h2>
            <p style={{ color: "#ccc", fontSize: "1rem", marginBottom: "20px" }}>{profiles[currentIndex].bio || "No bio added."}</p>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <button onClick={() => handleSwipe("left")} style={{ backgroundColor: "#332222", border: "none", width: "60px", height: "60px", borderRadius: "50%", color: "#ff2d55", fontSize: "1.5rem", fontWeight: "bold", cursor: "pointer" }}>❌</button>
              <button onClick={() => handleSwipe("right")} style={{ backgroundColor: "#ff2d55", border: "none", width: "60px", height: "60px", borderRadius: "50%", color: "#fff", fontSize: "1.5rem", fontWeight: "bold", cursor: "pointer" }}>❤️</button>
            </div>
          </div>
        ) : (
          <div style={{ padding: "40px 20px" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>Khatam Bhai! 🎉</h2>
            <p style={{ color: "#aaa" }}>Database ke saare log swipe ho chuke hain.</p>
            <button onClick={() => { setCurrentIndex(0); fetchProfiles(); }} style={{ backgroundColor: "#221a1a", color: "#fff", border: "1px solid #ff2d55", padding: "10px 20px", borderRadius: "20px", marginTop: "20px", cursor: "pointer" }}>🔄 Refresh Feed</button>
          </div>
        )}
      </div>
    </div>
  );
}

