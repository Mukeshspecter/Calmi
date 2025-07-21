export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isUser: boolean;
  mode?: 'therapist' | 'career';
  audioUrl?: string;
}

export interface SessionNote {
  id: string;
  content: string;
  timestamp: Date;
  sessionId: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  notes: SessionNote[];
  createdAt: Date;
  lastActive: Date;
}

export type AIMode = 'therapist' | 'career' | 'neutral';
export type AIMode = 'therapist' | 'career' | 'narrator' | 'neutral';

export interface ModeConfig {
  name: string;
  description: string;
  gradient: string;
  bgPattern: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  icon: string;
}

export interface ElevenLabsMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ElevenLabsResponse {
  text: string;
  audioUrl?: string;
}