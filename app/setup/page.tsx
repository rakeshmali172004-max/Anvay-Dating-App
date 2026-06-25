"use client";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xyz.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function SetupPage() {
  const [username, setUsername] = useState("");
  const [mediaFiles, setMediaFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (filesArray.length + mediaFiles.length > 5) {
        setMessage("Bhai max 5 photos ya videos hi upload kar sakte ho!");
        return;
      }
      setMediaFiles([...mediaFiles, ...filesArray]);
      setMessage("");
    }
  };

  const removeFile = (index: number) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setMessage("Bhai apna username daalna zaroori hai!");
      return;
    }
    if (mediaFiles.length < 1) {
      setMessage("Bhai kam se kam 1 photo ya video upload karo!");
      return;
    }

    setLoading(true);
    setMessage("Uploading files to Supabase...");

    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < mediaFiles.length; i++) {
        const file = mediaFiles[i];
        const fileExt = file.name.split(".").pop();
        const fileName = `${username.trim().toLowerCase()}-${Date.now()}-${i}.${fileExt}`;

        const { data, error: uploadError } = await supabase.storage
          .from("dating-media")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        if (data) {
          const { data: publicData } = supabase.storage
            .from("dating-media")
            .getPublicUrl(fileName);
          uploadedUrls.push(publicData.publicUrl);
        }
      }

      setMessage("Updating your profile in database...");

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          media_urls: uploadedUrls,
        })
        .eq("username", username.trim().toLowerCase());

      if (updateError) throw updateError;

      setMessage("🎉 Badhai Ho! 1 se 5 Photos/Videos perfectly upload ho gaye hain.");
      setMediaFiles([]);
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#120d0d", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: "450px", backgroundColor: "#1a1414", padding: "30px", borderRadius: "20px", boxShadow: "0 10px 25px rgba(0,0,0,0.4)" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "10px", color: "#ff2d55", textAlign: "center" }}>Upload Media</h2>
        <p style={{ color: "#aaa", fontSize: "0.9rem", marginBottom: "25px", textAlign: "center" }}>Minimum 1 aur maximum 5 photos ya videos upload karein.</p>
        
        <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ fontSize: "0.8rem", color: "#aaa", display: "block", marginBottom: "5px", textTransform: "uppercase" }}>Confirm Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "none", backgroundColor: "#221a1a", color: "#fff" }} placeholder="rajesh" />
          </div>

          <div>
            <label style={{ fontSize: "0.8rem", color: "#aaa", display: "block", marginBottom: "5px", textTransform: "uppercase" }}>Select Photos / Videos (1 to 5)</label>
            <input type="file" accept="image/*,video/*" multiple onChange={handleFileChange} style={{ width: "100%", padding: "10px", borderRadius: "8px", backgroundColor: "#221a1a", color: "#fff", cursor: "pointer" }} />
          </div>

          {mediaFiles.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "5px" }}>
              {mediaFiles.map((file, index) => (
                <div key={index} style={{ position: "relative", backgroundColor: "#332222", padding: "8px", borderRadius: "8px", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</span>
                  <button type="button" onClick={() => removeFile(index)} style={{ backgroundColor: "#ff2d55", border: "none", color: "#fff", borderRadius: "50%", cursor: "pointer", width: "18px", height: "18px", fontSize: "0.6rem", display: "flex", alignItems: "center", justifyContent: "center" }}>X</button>
                </div>
              ))}
            </div>
          )}

          {message && <p style={{ color: message.includes("Error") ? "#ff2d37" : "#ff2d7a", fontSize: "0.95rem", textAlign: "center", margin: "5px 0", fontWeight: "bold" }}>{message}</p>}

          <button type="submit" disabled={loading} style={{ backgroundColor: "#ff2d55", color: "#fff", border: "none", padding: "14px", borderRadius: "25px", fontSize: "1.1rem", fontWeight: "bold", cursor: "pointer", backgroundImage: "linear-gradient(to right, #ff2d7a, #ff2d37)" }}>
            {loading ? "Uploading..." : "Save Media Files"}
          </button>
        </form>
      </div>
    </div>
  );
}

