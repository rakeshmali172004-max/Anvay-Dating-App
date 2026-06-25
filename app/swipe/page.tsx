"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xyz.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1Ni..."
);

export default function SwipePage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfiles() {
      const { data, error } = await supabase.from("profiles").select("*");
      if (!error && data) setProfiles(data);
      setLoading(false);
    }
    fetchProfiles();
  }, []);

  const handleSwipe = async () => {
    // Like logic add kiya hai
    if (profiles[currentIndex]) {
      const { error } = await supabase.from("likes").insert({
        liked_user_id: profiles[currentIndex].id,
      });

      if (error) {
        console.error("Like save nahi ho paaya:", error);
      } else {
        alert("Match Liked!");
      }
    }
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div style={{ backgroundColor: "#120d0d", minHeight: "100vh", color: "#fff", padding: "20px" }}>
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <h1>Anvay Swipe Feed</h1>
        {loading ? <p>Loading...</p> : currentIndex < profiles.length ? (
          <div style={{ backgroundColor: "#221a1a", padding: "20px", borderRadius: "20px" }}>
            
            {/* Media Slider Section */}
            {profiles[currentIndex].media_urls && profiles[currentIndex].media_urls.length > 0 && (
              <img 
                src={profiles[currentIndex].media_urls[0]} 
                alt="Profile" 
                style={{ width: "100%", height: "250px", borderRadius: "10px", objectFit: "cover", marginBottom: "15px" }} 
              />
            )}

            <h2>{profiles[currentIndex].full_name || "User"}</h2>
            <p>{profiles[currentIndex].bio}</p>
            
            <button 
              onClick={handleSwipe} 
              style={{ width: "100%", padding: "15px", backgroundColor: "#ff2d55", border: "none", borderRadius: "10px", color: "#fff", cursor: "pointer", fontWeight: "bold" }}
            >
              Swipe Right (Like)
            </button>
          </div>
        ) : <p>Khatam Bhai! Sab swipe ho gaya.</p>}
      </div>
    </div>
  );
}
