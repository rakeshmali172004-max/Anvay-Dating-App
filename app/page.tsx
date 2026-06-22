"use client"

import React, { useState } from "react"

export default function AnvayApp() {
  // Screen state: 'landing', 'login', 'dashboard'
  const [screen, setScreen] = useState<"landing" | "login" | "dashboard">("landing")
  const [profiles, setProfiles] = useState([
    { id: 1, name: "Aanya", age: 22, bio: "Music lover & coffee enthusiast ☕", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80" },
    { id: 2, name: "Rohan", age: 24, bio: "Fitness geek & avid traveler ✈️", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80" },
    { id: 3, name: "Diya", age: 23, bio: "Let's grab some tacos and talk cinema 🎬", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&q=80" }
  ])

  const handleSwipe = () => {
    if (profiles.length > 1) {
      setProfiles(profiles.slice(1))
    } else {
      alert("No more profiles nearby! 🔥 Check back later.")
    }
  }

  // SCREEN 1: LANDING PAGE
  if (screen === "landing") {
    return (
      <div className="min-h-screen bg-[#1c0d0d] text-[#fff5f5] flex flex-col items-center justify-center p-6 text-center">
        <div className="h-16 w-16 rounded-full bg-[#ff4a6b] flex items-center justify-center mb-4 shadow-lg shadow-[#ff4a6b]/20">
          <span className="text-white text-3xl">♥</span>
        </div>
        <h1 className="text-4xl font-black tracking-tight mb-2 bg-gradient-to-r from-white to-[#ff4a6b] bg-clip-text text-transparent">Anvay</h1>
        <p className="text-lg font-medium text-[#baa5a5] max-w-sm mb-8">Meaningful connections, made simple.</p>
        <div className="w-full max-w-xs space-y-4">
          <button onClick={() => setScreen("login")} className="w-full bg-[#ff4a6b] text-white font-bold py-3.5 px-4 rounded-xl active:scale-[0.98] transition-all shadow-lg">
            Get Started
          </button>
        </div>
      </div>
    )
  }

  // SCREEN 2: LOGIN PAGE
  if (screen === "login") {
    return (
      <div className="min-h-screen bg-[#1c0d0d] text-[#fff5f5] flex flex-col justify-between p-6">
        <div className="flex items-center gap-2 pt-4">
          <span className="text-2xl font-extrabold text-[#ff4a6b]">Anvay ♥</span>
        </div>
        <div className="max-w-sm mx-auto w-full space-y-6 text-center">
          <h2 className="text-3xl font-black">Welcome back</h2>
          <p className="text-sm text-[#baa5a5]">Sign in to start matching!</p>
          <button onClick={() => setScreen("dashboard")} className="w-full flex items-center justify-center gap-3 bg-white text-[#1c0d0d] font-bold py-3.5 px-4 rounded-xl shadow-md">
            Continue with Google
          </button>
          <button onClick={() => setScreen("dashboard")} className="w-full bg-[#ff4a6b] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg">
            Use Phone Number
          </button>
          <p onClick={() => setScreen("landing")} className="text-xs text-[#7a6565] cursor-pointer underline">Go Back</p>
        </div>
        <div className="text-center text-xs text-[#7a6565] pb-4">By continuing, you agree to our Terms.</div>
      </div>
    )
  }

  // SCREEN 3: PROFILE SWIPING DASHBOARD
  return (
    <div className="min-h-screen bg-[#1c0d0d] text-[#fff5f5] flex flex-col justify-between p-4">
      {/* Top Bar */}
      <div className="flex justify-between items-center py-2 border-b border-[#3a2525]">
        <span className="text-xl font-black text-[#ff4a6b]">Anvay ♥</span>
        <button onClick={() => setScreen("landing")} className="text-xs bg-[#2a1717] px-3 py-1.5 rounded-lg border border-[#3a2525] text-[#baa5a5]">
          Logout
        </button>
      </div>

      {/* Swipe Deck */}
      <div className="flex-1 flex items-center justify-center p-4">
        {profiles.length > 0 ? (
          <div className="bg-[#2a1717] w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-[#3a2525] relative">
            <img src={profiles[0].img} alt={profiles[0].name} className="w-full h-80 object-cover" />
            <div className="p-5 space-y-2 bg-gradient-to-t from-[#1c0d0d] to-transparent">
              <h3 className="text-2xl font-bold">{profiles[0].name}, <span className="text-xl font-normal text-[#baa5a5]">{profiles[0].age}</span></h3>
              <p className="text-sm text-[#baa5a5]">{profiles[0].bio}</p>
            </div>
            {/* Action Buttons */}
            <div className="flex justify-center gap-6 pb-6 pt-2">
              <button onClick={handleSwipe} className="w-14 h-14 rounded-full bg-[#1c0d0d] border border-[#3a2525] flex items-center justify-center text-xl text-gray-400 active:scale-95 transition-all">❌</button>
              <button onClick={() => { alert("It's a Match! 🎉"); handleSwipe(); }} className="w-14 h-14 rounded-full bg-[#ff4a6b] flex items-center justify-center text-xl text-white active:scale-95 transition-all shadow-lg shadow-[#ff4a6b]/20">❤️</button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-2">
            <p className="text-xl font-bold text-[#baa5a5]">No more profiles nearby 🌐</p>
            <p className="text-xs text-[#7a6565]">Try changing your filters later.</p>
          </div>
        )}
      </div>
    </div>
  )
} 
