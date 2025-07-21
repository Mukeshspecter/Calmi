import React, { useRef, useEffect, useState } from 'react';
import { MessageBubble } from './MessageBubble';
import { VoiceRecorder } from './VoiceRecorder';
import { ElevenLabsWidget } from './ElevenLabsWidget';
import { useChat } from '../hooks/useChat';
import { Brain, Briefcase, BookOpen, Phone, PhoneOff, RotateCcw, Menu, X, LogOut, User } from 'lucide-react';
import { AIMode } from '../types';

// Separate ElevenLabs agent IDs for different modes
const ELEVENLABS_AGENTS = {
  therapist: 'agent_01jz75m4ncf1arcc872dz8jj6p', // Donna - therapy agent
  career: 'agent_01jz826fyffckt53pbvmnhm3wm',     // Buddy - career agent
  narrator: 'agent_01jzat9gfhe27t5bx7k1q3ydhd'    // GoFlow - narrator agent
};

interface ChatInterfaceProps {
  userEmail: string;
  userName: string;
}

export function ChatInterface({ userEmail, userName }: ChatInterfaceProps) {
  const { messages, currentMode, isTyping, sendMessage, clearChat, setMode } = useChat();
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleModeSwitch = (mode: AIMode) => {
    setMode(mode);
    setIsVoiceActive(true); // Auto-start voice when switching modes
    setIsMobileMenuOpen(false); // Close mobile menu
  };

  const handleVoiceToggle = () => {
    setIsVoiceActive(!isVoiceActive);
  };

  const handleLogout = () => {
    // Refresh the page to reset the session
    window.location.reload();
  };

  // Get the appropriate agent ID based on current mode
  const getCurrentAgentId = () => {
    return ELEVENLABS_AGENTS[currentMode] || ELEVENLABS_AGENTS.therapist;
  };

  // Get the current AI name
  const getCurrentAIName = () => {
    return currentMode === 'therapist' ? 'Donna' : 
           currentMode === 'career' ? 'Buddy' : 'GoFlow';
  };

  // Get user initials for avatar
  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Mobile-Optimized Header */}
      <div className="bg-white border-b px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-white text-sm sm:text-lg font-bold flex-shrink-0 ${
            currentMode === 'therapist' 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
              : currentMode === 'career'
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
              : 'bg-gradient-to-r from-emerald-500 to-teal-500'
          }`}>
            {getCurrentAIName().charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
              {getCurrentAIName()}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 truncate">
              {currentMode === 'therapist' ? 'Your AI Therapist' : 
               currentMode === 'career' ? 'Your AI Career Mentor' : 'Your AI Narrator & Story Companion'}
              {isVoiceActive && (
                <span className="ml-2 inline-flex items-center gap-1">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="hidden sm:inline">Voice Active</span>
                  <span className="sm:hidden">Live</span>
                </span>
              )}
            </p>
          </div>
        </div>
        
        {/* User Menu and Mobile Menu Button */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-3 ml-4">
          {/* Mode Switcher */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => handleModeSwitch('therapist')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                currentMode === 'therapist'
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Brain size={16} className="inline mr-2" />
              Donna
            </button>
            <button
              onClick={() => handleModeSwitch('career')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                currentMode === 'career'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Briefcase size={16} className="inline mr-2" />
              Buddy
            </button>
            <button
              onClick={() => handleModeSwitch('narrator')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                currentMode === 'narrator'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <BookOpen size={16} className="inline mr-2" />
              GoFlow
            </button>
          </div>

          {/* Voice Toggle */}
          <button
            onClick={handleVoiceToggle}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isVoiceActive
                ? 'bg-green-500 text-white shadow-md hover:bg-green-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            title={isVoiceActive ? 'Turn off voice' : 'Turn on voice'}
          >
            {isVoiceActive ? <PhoneOff size={16} /> : <Phone size={16} />}
          </button>

          {/* Reset */}
          <button
            onClick={clearChat}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            title="Clear conversation"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Click outside to close menus */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => {
            setIsMobileMenuOpen(false);
          }}
        />
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-30" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="bg-white p-4 m-4 rounded-xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Menu</h3>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-gray-100 text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Mobile Mode Switcher */}
            <div className="space-y-3 mb-4">
              <button
                onClick={() => handleModeSwitch('therapist')}
                className={`w-full flex items-center gap-3 p-4 rounded-lg text-left transition-all duration-200 ${
                  currentMode === 'therapist'
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Brain size={20} />
                <div>
                  <div className="font-medium">Donna</div>
                  <div className="text-sm opacity-80">AI Therapist</div>
                </div>
              </button>
              <button
                onClick={() => handleModeSwitch('career')}
                className={`w-full flex items-center gap-3 p-4 rounded-lg text-left transition-all duration-200 ${
                  currentMode === 'career'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Briefcase size={20} />
                <div>
                  <div className="font-medium">Buddy</div>
                  <div className="text-sm opacity-80">AI Career Mentor</div>
                </div>
              </button>
              <button
                onClick={() => handleModeSwitch('narrator')}
                className={`w-full flex items-center gap-3 p-4 rounded-lg text-left transition-all duration-200 ${
                  currentMode === 'narrator'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <BookOpen size={20} />
                <div>
                  <div className="font-medium">GoFlow</div>
                  <div className="text-sm opacity-80">AI Narrator & Story Companion</div>
                </div>
              </button>
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  handleVoiceToggle();
                  setIsMobileMenuOpen(false);
                }}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isVoiceActive
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {isVoiceActive ? <PhoneOff size={18} /> : <Phone size={18} />}
                {isVoiceActive ? 'End Voice' : 'Start Voice'}
              </button>
              <button
                onClick={() => {
                  clearChat();
                  setIsMobileMenuOpen(false);
                }}
                className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                title="Clear conversation"
              >
                <RotateCcw size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Voice Widget - Mobile Optimized */}
      {isVoiceActive && (
        <div className="p-3 sm:p-4 bg-white border-b">
          <ElevenLabsWidget
            agentId={getCurrentAgentId()}
            currentMode={currentMode}
            onClose={() => setIsVoiceActive(false)}
            autoStart={true}
            className="w-full"
            key={`${currentMode}-${getCurrentAgentId()}`} // Force re-render when mode changes
          />
        </div>
      )}

      {/* Messages Area - Mobile Optimized */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-6">
        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8 sm:py-12 px-4">
              <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold ${
                currentMode === 'therapist' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                  : currentMode === 'career'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500'
              }`}>
                {getCurrentAIName().charAt(0)}
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {currentMode === 'therapist' ? 'Donna is Ready' : 
                 currentMode === 'career' ? 'Buddy is Ready' : 'GoFlow is Ready'}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                {currentMode === 'therapist' 
                  ? 'Your compassionate AI therapist is here to listen and support you'
                  : currentMode === 'career'
                  ? 'Your dedicated AI career mentor is ready to help you succeed'
                  : 'Your creative AI narrator is ready to help you tell your story'
                }
              </p>
              
              {/* Welcome message for logged in user */}
              <div className="mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg max-w-sm mx-auto">
                <p className="text-sm text-gray-600">
                  <strong>Welcome to Calmi, {userName || userEmail.split('@')[0]}!</strong>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {currentMode === 'therapist' 
                    ? 'Ready for your therapy session with Donna'
                    : currentMode === 'career'
                    ? 'Ready for career mentoring with Buddy'
                    : 'Ready for storytelling with GoFlow'
                  }
                </p>
              </div>

              {!isVoiceActive && (
                <button
                  onClick={() => setIsVoiceActive(true)}
                  className={`px-4 sm:px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 hover:scale-105 shadow-lg text-sm sm:text-base ${
                    currentMode === 'therapist' 
                      ? 'bg-purple-500 hover:bg-purple-600 shadow-purple-500/30' 
                      : currentMode === 'career'
                      ? 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/30'
                      : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30'
                  }`}
                >
                  <Phone size={16} className="inline mr-2" />
                  Start Voice Session with {getCurrentAIName()}
                </button>
              )}
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  currentMode={currentMode}
                />
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg px-3 sm:px-4 py-2 sm:py-3 shadow-sm border max-w-xs">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-500">{getCurrentAIName()} is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Text Input - Mobile Optimized */}
      {!isVoiceActive && (
        <div className="p-3 sm:p-4 bg-white border-t safe-area-bottom">
          <div className="max-w-4xl mx-auto">
            <VoiceRecorder 
              onSendMessage={sendMessage} 
              currentMode={currentMode} 
              disabled={isTyping} 
            />
          </div>
        </div>
      )}
    </div>
  );
}