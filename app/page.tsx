"use client";
import React, { useState } from "react";

export default function App() {
  const [screen, setScreen] = useState("landing");

  return (
    <div className="min-h-screen bg-[#1c0d0d] text-white flex flex-col justify-center items-center font-sans p-4 select-none">
      {screen === "landing" && (
        <div className="flex flex-col items-center justify-center max-w-xs text-center space-y-6 animate-fadeIn">
          <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-pink-500 to-red-500 flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl">❤️</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500">Anvay</h1>
          <p className="text-gray-300 font-medium text-lg leading-relaxed">Meaningful connections, real conversations.</p>
          <button 
            onClick={() => setScreen("login")}
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:opacity-90 active:scale-95 transition-all transform duration-150"
          >
            Get Started
          </button>
        </div>
      )}

      {screen === "login" && (
        <div className="flex flex-col items-center justify-center max-w-xs text-center space-y-6 animate-fadeIn w-full">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Enter details to find your premium match.</p>
          <div className="w-full space-y-3 text-left">
            <input type="text" placeholder="Username / Email" className="w-full bg-[#2c1616] border border-pink-900/40 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500" />
            <input type="password" placeholder="Password" className="w-full bg-[#2c1616] border border-pink-900/40 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500" />
          </div>
          <button 
            onClick={() => setScreen("swipe")}
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 rounded-full shadow-md hover:opacity-90 active:scale-95 transition"
          >
            Sign In
          </button>
        </div>
      )}

      {screen === "swipe" && (
        <div className="flex flex-col items-center justify-center max-w-xs space-y-6 w-full animate-fadeIn">
          <div className="w-full bg-[#2c1616] rounded-3xl overflow-hidden shadow-2xl border border-pink-900/30 relative aspect-[3/4] flex flex-col justify-end p-4">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1c0d0d]/40 to-[#1c0d0d] z-10" />
            <div className="h-full w-full bg-gradient-to-br from-pink-900/20 to-red-900/20 absolute inset-0 flex items-center justify-center">
              <span className="text-6xl text-pink-600/30">✨</span>
            </div>
            <div className="relative z-20 text-left">
              <h3 className="text-2xl font-bold">Aanya, <span className="font-normal text-xl text-gray-300">22</span></h3>
              <p className="text-gray-400 text-sm mt-1">Music lover • Exploring new places</p>
            </div>
          </div>
          <div className="flex space-x-6 z-20">
            <button onClick={() => alert("Skipped!")} className="h-14 w-14 bg-[#2c1616] border border-gray-800 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition text-gray-400 text-xl">✖</button>
            <button onClick={() => alert("It's a Match! 🎉")} className="h-14 w-14 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition text-white text-xl">❤️</button>
          </div>
        </div>
      )}
    </div>
  );
}
