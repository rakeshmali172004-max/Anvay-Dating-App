'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginScreen from '@/components/screens/LoginScreen';
import ProfileSetupScreen from '@/components/screens/ProfileSetupScreen';
import DiscoverScreen from '@/components/screens/DiscoverScreen';
import ChatScreen from '@/components/screens/ChatScreen';
import { Loader2 } from 'lucide-react';

export type ScreenType = 'discover' | 'matches' | 'profile';

export default function Home() {
  const { user, profile, loading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('discover');
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);

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

        <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-around items-center">
          <button
            onClick={() => setCurrentScreen('discover')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentScreen === 'discover' ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <svg className="w-6 h-6" fill={currentScreen === 'discover' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-xs font-medium">Discover</span>
          </button>
          <button
            onClick={() => setCurrentScreen('matches')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentScreen === 'matches' ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <svg className="w-6 h-6" fill={currentScreen === 'matches' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.04 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-xs font-medium">Messages</span>
          </button>
          <button
            onClick={() => setCurrentScreen('profile')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              currentScreen === 'profile' ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <svg className="w-6 h-6" fill={currentScreen === 'profile' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs font-medium">Profile</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

