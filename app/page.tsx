'use client';

import { useState } from 'react';
import { Loader2, Heart, MessageSquare, User, LogIn, Sparkles, Send } from 'lucide-react';

// --- ALL IN ONE SCREEN COMPONENTS ---

function LoginScreen() {
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[80vh] text-center">
      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white mb-6 animate-pulse">
        <Heart className="w-8 h-8 fill-current" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Welcome to Anvay</h1>
      <p className="text-gray-500 mb-8">Find your perfect connection today</p>
      <button className="w-full bg-blue-500 text-white font-medium py-3 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
        <LogIn className="w-5 h-5" /> Sign In / Sign Up
      </button>
    </div>
  );
}

function ProfileSetupScreen({ isEditing = false }) {
  return (
    <div className="p-6 overflow-y-auto max-h-[80vh]">
      <h1 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Profile' : 'Setup Profile'}</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input type="text" className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50" placeholder="Enter your name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input type="number" className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50" placeholder="Your age" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
          <input type="text" className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50" placeholder="Your work" />
        </div>
        <button className="w-full bg-blue-500 text-white font-medium py-3 rounded-xl mt-4 shadow-md">
          Save Profile
        </button>
      </div>
    </div>
  );
}

function DiscoverScreen({ onNavigate }: { onNavigate: (screen: 'discover' | 'matches' | 'profile') => void }) {
  return (
    <div className="p-4 flex flex-col justify-between min-h-[80vh]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-extrabold text-blue-600 flex items-center gap-1">
          <Sparkles className="w-6 h-6 fill-current" /> Anvay
        </h1>
      </div>
      <div className="relative aspect-[3/4] w-full bg-gradient-to-b from-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-end p-6">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          No more profiles nearby
        </div>
      </div>
      <div className="flex justify-center gap-6 my-4">
        <button className="w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 border border-gray-100">✖</button>
        <button className="w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-white"><Heart className="w-6 h-6 fill-current" /></button>
      </div>
    </div>
  );
}

function ChatScreen({ matchId, onBack, onSelectMatch, isMatchList }: any) {
  return (
    <div className="flex flex-col h-[85vh]">
      <div className="p-4 border-b border-gray-100 flex items-center gap-3">
        <button onClick={onBack} className="text-gray-600 font-bold">←</button>
        <h2 className="font-semibold">{isMatchList ? "Your Matches" : "Chat"}</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col justify-center items-center text-gray-400">
        {isMatchList ? "No matches yet. Keep swiping!" : "Start the conversation!"}
      </div>
      {!isMatchList && (
        <div className="p-3 border-t border-gray-100 bg-white flex gap-2">
          <input type="text" className="flex-1 border border-gray-200 rounded-xl px-4 py-2" placeholder="Type a message..." />
          <button className="bg-blue-500 text-white p-2 rounded-xl"><Send className="w-5 h-5" /></button>
        </div>
      )}
    </div>
  );
}

// --- MAIN HOME COMPONENT ---

export type ScreenType = 'discover' | 'matches' | 'profile';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('discover');
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);

  // Fake static state for testing layout without breaking
  const user = true; 
  const profile = { age: 24 }; 
  const loading = false;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  if (!profile?.age) {
    return <ProfileSetupScreen />;
  }

  if (selectedMatchId) {
    return (
      <ChatScreen
        matchId={selectedMatchId}
        onBack={() => setSelectedMatchId(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background sm:flex sm:items-center sm:justify-center sm:p-4">
      <div className="w-full max-w-md mx-auto bg-white min-h-screen sm:min-h-[90vh] sm:rounded-3xl sm:shadow-2xl overflow-hidden relative">
        
        {currentScreen === 'discover' && (
          <DiscoverScreen onNavigate={setCurrentScreen} />
        )}
        {currentScreen === 'matches' && (
          <ChatScreen
            matchId={null}
            onBack={() => setCurrentScreen('discover')}
            onSelectMatch={setSelectedMatchId}
            isMatchList
          />
        )}
        {currentScreen === 'profile' && (
          <ProfileSetupScreen isEditing />
        )}

        {/* BOTTOM NAVIGATION */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-around items-center">
          <button
            onClick={() => setCurrentScreen('discover')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentScreen === 'discover' ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <Heart className="w-6 h-6" />
            <span className="text-xs font-medium">Discover</span>
          </button>
          <button
            onClick={() => setCurrentScreen('matches')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentScreen === 'matches' ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <MessageSquare className="w-6 h-6" />
            <span className="text-xs font-medium">Messages</span>
          </button>
          <button
            onClick={() => setCurrentScreen('profile')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentScreen === 'profile' ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </nav>
      </div>
    </div>
  );
}             
