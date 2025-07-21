import React, { useState } from 'react';
import { Mic, MicOff, Send } from 'lucide-react';
import { useVoiceRecording } from '../hooks/useVoiceRecording';
import { AIMode } from '../types';

interface VoiceRecorderProps {
  onSendMessage: (message: string) => void;
  currentMode: AIMode;
  disabled?: boolean;
}

export function VoiceRecorder({ onSendMessage, currentMode, disabled = false }: VoiceRecorderProps) {
  const [textInput, setTextInput] = useState('');
  const {
    isRecording,
    transcript,
    startRecording,
    stopRecording,
    clearTranscript
  } = useVoiceRecording();

  const handleSendTranscript = () => {
    if (transcript.trim()) {
      onSendMessage(transcript.trim());
      clearTranscript();
    }
  };

  const handleSendText = () => {
    if (textInput.trim()) {
      onSendMessage(textInput.trim());
      setTextInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendText();
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const getAIName = () => {
    return currentMode === 'therapist' ? 'Donna' : 
           currentMode === 'career' ? 'Buddy' : 'GoFlow';
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Voice Transcript - Mobile Optimized */}
      {transcript && (
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2 gap-2">
            <span className="text-sm font-medium text-gray-700 flex-shrink-0">Voice Input:</span>
            <button
              onClick={handleSendTranscript}
              className={`px-3 py-1.5 text-sm rounded-md text-white flex-shrink-0 touch-manipulation ${
                currentMode === 'therapist' 
                  ? 'bg-purple-500 hover:bg-purple-600' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              Send to {getAIName()}
            </button>
          </div>
          <p className="text-sm sm:text-base text-gray-800 leading-relaxed">{transcript}</p>
        </div>
      )}

      {/* Input Area - Mobile Optimized */}
      <div className="flex items-end gap-2 sm:gap-3">
        {/* Voice Button - Touch Friendly */}
        <button
          onClick={handleToggleRecording}
          disabled={disabled}
          className={`p-3 sm:p-3 rounded-full transition-colors touch-manipulation flex-shrink-0 ${
            isRecording
              ? 'bg-red-500 text-white animate-pulse'
              : currentMode === 'therapist'
              ? 'bg-purple-100 text-purple-600 hover:bg-purple-200 active:bg-purple-300'
              : currentMode === 'career'
              ? 'bg-blue-100 text-blue-600 hover:bg-blue-200 active:bg-blue-300'
              : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200 active:bg-emerald-300'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          title={isRecording ? 'Stop recording' : `Record message for ${getAIName()}`}
        >
          {isRecording ? <MicOff size={18} className="sm:w-5 sm:h-5" /> : <Mic size={18} className="sm:w-5 sm:h-5" />}
        </button>

        {/* Text Input - Mobile Optimized */}
        <div className="flex-1 flex gap-2">
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              currentMode === 'therapist'
                ? 'Tell Donna what\'s on your mind...'
                : currentMode === 'career'
                ? 'Share your career goals with Buddy...'
                : 'Share a story or moment with GoFlow...'
            }
            disabled={disabled}
            className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors text-sm sm:text-base ${
              currentMode === 'therapist' 
                ? 'focus:ring-purple-500 focus:border-purple-500' 
                : currentMode === 'career'
                ? 'focus:ring-blue-500 focus:border-blue-500'
                : 'focus:ring-emerald-500 focus:border-emerald-500'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            rows={1}
            style={{ minHeight: '44px' }} // iOS touch target minimum
          />
          <button
            onClick={handleSendText}
            disabled={disabled || !textInput.trim()}
            className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation flex-shrink-0 ${
              currentMode === 'therapist'
                ? 'bg-purple-500 hover:bg-purple-600 active:bg-purple-700'
                : currentMode === 'career'
                ? 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
                : 'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700'
            }`}
            title={`Send to ${getAIName()}`}
            style={{ minHeight: '44px' }} // iOS touch target minimum
          >
            <Send size={16} className="sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Status - Mobile Optimized */}
      {isRecording && (
        <div className="text-center">
          <p className="text-sm text-gray-600">
            🎙️ Recording for {getAIName()}... Tap the mic to stop
          </p>
        </div>
      )}
    </div>
  );
}