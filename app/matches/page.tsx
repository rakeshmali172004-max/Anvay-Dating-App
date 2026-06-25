"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function MatchesPage() {
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    async function fetchMatches() {
      // Yahan hum simply saare likes fetch kar rahe hain
      const { data, error } = await supabase.from("likes").select("*");
      if (data) setMatches(data);
    }
    fetchMatches();
  }, []);

  return (
    <div style={{ padding: "20px", color: "#fff", backgroundColor: "#120d0d", minHeight: "100vh" }}>
      <h1>Mere Matches</h1>
      {matches.length === 0 ? <p>Abhi koi match nahi hai.</p> : (
        <ul>
          {matches.map((m: any) => (
            <li key={m.id} style={{ marginBottom: "10px" }}>
              Liked User ID: {m.liked_user_id}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

