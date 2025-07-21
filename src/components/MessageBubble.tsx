import React, { useState } from 'react';
import { Play, User, Pause } from 'lucide-react';
import { Message, AIMode } from '../types';

interface MessageBubbleProps {
  message: Message;
  currentMode: AIMode;
}

export function MessageBubble({ message, currentMode }: MessageBubbleProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handlePlayAudio = async () => {
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(message.content);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      setIsPlaying(true);
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  };

  const getAIName = () => {
    return currentMode === 'therapist' ? 'Donna' : 
           currentMode === 'career' ? 'Buddy' : 'GoFlow';
  };

  if (message.isUser) {
    return (
      <div className="flex justify-end mb-3 sm:mb-4">
        <div className="flex items-end gap-2 sm:gap-3 max-w-[85%] sm:max-w-xs lg:max-w-md">
          <div className={`rounded-lg px-3 sm:px-4 py-2 sm:py-3 ${
            currentMode === 'therapist' 
              ? 'bg-purple-500 text-white' 
              : 'bg-blue-500 text-white'
          }`}>
            <p className="text-sm sm:text-base leading-relaxed">{message.content}</p>
            <div className="flex items-center justify-end gap-1 mt-2">
              <span className="text-xs opacity-80">{formatTime(message.timestamp)}</span>
            </div>
          </div>
          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            currentMode === 'therapist' 
              ? 'bg-purple-100 text-purple-600' 
              : currentMode === 'career'
              ? 'bg-blue-100 text-blue-600'
              : 'bg-emerald-100 text-emerald-600'
          }`}>
            <User size={14} className="sm:w-4 sm:h-4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-3 sm:mb-4">
      <div className="flex items-end gap-2 sm:gap-3 max-w-[85%] sm:max-w-xs lg:max-w-md">
        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0 ${
          currentMode === 'therapist' 
            ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
            : currentMode === 'career'
            ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
            : 'bg-gradient-to-r from-emerald-500 to-teal-500'
        }`}>
          {getAIName().charAt(0)}
        </div>
        <div className="bg-white rounded-lg px-3 sm:px-4 py-2 sm:py-3 shadow-sm border">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-gray-600">{getAIName()}</span>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span className="text-xs text-gray-500">
              {currentMode === 'therapist' ? 'AI Therapist' : 
               currentMode === 'career' ? 'AI Career Mentor' : 'AI Narrator'}
            </span>
          </div>
          <p className="text-sm sm:text-base text-gray-800 leading-relaxed">{message.content}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
            <button
              onClick={handlePlayAudio}
              className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700 touch-manipulation"
              title={isPlaying ? "Pause audio" : "Play audio"}
            >
              {isPlaying ? <Pause size={12} className="sm:w-3 sm:h-3" /> : <Play size={12} className="sm:w-3 sm:h-3" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}