import { useState, useRef, useCallback } from 'react';

interface UseVoiceRecordingReturn {
  isRecording: boolean;
  isListening: boolean;
  transcript: string;
  speechError: string | null;
  startRecording: () => void;
  stopRecording: () => void;
  clearTranscript: () => void;
  clearSpeechError: () => void;
}

export function useVoiceRecording(): UseVoiceRecordingReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [speechError, setSpeechError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startRecording = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSpeechError('Speech recognition not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    // Clear any previous errors
    setSpeechError(null);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsRecording(true);
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      
      if (finalTranscript) {
        setTranscript(finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      // Only log errors that are not intentional user actions
      if (event.error !== 'aborted') {
        console.error('Speech recognition error:', event.error);
      }
      
      setIsRecording(false);
      setIsListening(false);
      
      // Provide user-friendly error messages based on error type
      const errorType = event.error || 'unknown';
      
      switch (errorType) {
        case 'network':
          setSpeechError('Network connection issue. Please check your internet connection and try again. Speech recognition requires an active internet connection.');
          break;
        case 'not-allowed':
          setSpeechError('Microphone access denied. Please allow microphone permissions in your browser settings and refresh the page.');
          break;
        case 'no-speech':
          setSpeechError('No speech detected. Please speak clearly into your microphone and try again.');
          break;
        case 'audio-capture':
          setSpeechError('Microphone not accessible. Please check that your microphone is connected and not being used by another application.');
          break;
        case 'service-not-allowed':
          setSpeechError('Speech recognition service unavailable. Please ensure you\'re using a supported browser (Chrome or Edge) and try again.');
          break;
        case 'aborted':
          // Don't show error for user-initiated stops
          setSpeechError(null);
          break;
        case 'language-not-supported':
          setSpeechError('Language not supported. Please ensure your browser supports English speech recognition.');
          break;
        default:
          setSpeechError(`Speech recognition encountered an issue (${errorType}). Please try again or refresh the page.`);
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
      setIsListening(false);
    };

    // Add additional error handling for connection issues
    recognition.onnomatch = () => {
      console.warn('Speech recognition: no match found');
      // Don't set error for no match, just continue listening
    };

    recognitionRef.current = recognition;
    
    try {
      recognition.start();
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      setIsRecording(false);
      setIsListening(false);
      
      // Check if it's a network-related startup error
      if (error instanceof Error && error.message.includes('network')) {
        setSpeechError('Unable to connect to speech recognition service. Please check your internet connection and try again.');
      } else {
        setSpeechError('Failed to start speech recognition. Please refresh the page and try again.');
      }
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
        // Reset states even if stop fails
        setIsRecording(false);
        setIsListening(false);
      }
    }
  }, []);

  const clearTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  const clearSpeechError = useCallback(() => {
    setSpeechError(null);
  }, []);

  return {
    isRecording,
    isListening,
    transcript,
    speechError,
    startRecording,
    stopRecording,
    clearTranscript,
    clearSpeechError
  };
}

// Extend the Window interface to include speech recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}