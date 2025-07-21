import { useState, useCallback } from 'react';
import { Message, AIMode } from '../types';
import { generateElevenLabsResponse } from '../services/elevenlabsService';

interface UseChatReturn {
  messages: Message[];
  currentMode: AIMode;
  isTyping: boolean;
  error: string | null;
  sendMessage: (content: string) => void;
  clearChat: () => void;
  setMode: (mode: AIMode) => void;
  clearError: () => void;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMode, setCurrentMode] = useState<AIMode>('therapist'); // Start with Donna (therapist) mode
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setError(null);

    try {
      // Convert messages to ElevenLabs format for context
      const conversationHistory = messages.map(msg => ({
        role: msg.isUser ? 'user' as const : 'assistant' as const,
        content: msg.content
      }));

      const aiResponse = await generateElevenLabsResponse(content, currentMode, conversationHistory);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.text,
        timestamp: new Date(),
        isUser: false,
        mode: currentMode === 'neutral' ? undefined : currentMode,
        audioUrl: aiResponse.audioUrl
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('Error generating AI response:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate response';
      setError(errorMessage);
      
      // Provide a contextual fallback message based on the current mode
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: currentMode === 'therapist' 
          ? "I'm here for you, even though I'm experiencing some technical difficulties. Your feelings are valid and important. Please try again in a moment."
          : "I'm experiencing some technical issues, but I'm committed to helping you achieve your career goals. Please try again shortly.",
        timestamp: new Date(),
        isUser: false,
        mode: currentMode === 'neutral' ? undefined : currentMode
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [currentMode, messages]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const setMode = useCallback((mode: AIMode) => {
    setCurrentMode(mode);
    setError(null);
    // Don't clear messages when switching modes - keep the conversation
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    messages,
    currentMode,
    isTyping,
    error,
    sendMessage,
    clearChat,
    setMode,
    clearError
  };
}