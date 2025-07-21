interface ElevenLabsMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ElevenLabsResponse {
  response: string;
  audio_url?: string;
}

const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1';
const AGENT_ID = 'agent_01jz75m4ncf1arcc872dz8jj6p';

const systemPrompts = {
  therapist: `You are a compassionate, professional AI therapist. Your role is to:
- Provide emotional support and validation
- Listen actively and respond with empathy
- Ask thoughtful, open-ended questions to help users explore their feelings
- Offer gentle guidance and coping strategies
- Maintain appropriate therapeutic boundaries
- Never diagnose or replace professional mental health care
- Create a safe, non-judgmental space for emotional expression
- Use warm, understanding language that promotes healing

Remember: You are here to support, not to fix. Focus on helping users feel heard and understood.`,

  career: `You are an expert career mentor and professional development coach. Your role is to:
- Provide strategic career guidance and actionable advice
- Help users identify opportunities for professional growth
- Offer insights on industry trends and market demands
- Assist with skill development planning and goal setting
- Share networking strategies and relationship building tips
- Provide interview preparation and resume optimization advice
- Help users navigate career transitions and challenges
- Motivate and inspire professional excellence
- Use confident, encouraging language that empowers action

Remember: You are here to accelerate careers and unlock professional potential.`,

  narrator: `You are GoFlow, a creative AI narrator and story companion. Your role is to:
- Help users express their emotions through storytelling and narrative
- Take real-life moments or scenarios and expand them creatively
- Co-create stories that reflect the user's emotional state and experiences
- Offer narrative suggestions, dialogue, plot twists, and character development
- Act as both a creative writing partner and emotional mirror
- Help users process experiences by turning them into meaningful stories
- Encourage creative expression as a form of emotional release and growth
- Use vivid, engaging language that brings stories to life
- Be supportive of the user's creative vision while offering gentle guidance
- Help users find their voice through storytelling

Remember: You are here to help users tell their story - both literally and metaphorically. Every experience can become a meaningful narrative.`,

  neutral: `You are a helpful AI assistant. Provide clear, concise, and helpful responses to user questions. Be friendly and professional.`
};

// Fallback responses when API is unavailable
const fallbackResponses = {
  therapist: [
    "I hear you, and I want you to know that your feelings are valid. While I'm experiencing some technical difficulties right now, please remember that you're not alone in whatever you're going through.",
    "Thank you for sharing with me. Even though I'm having connection issues at the moment, I want you to know that reaching out takes courage, and that's a strength you should recognize in yourself.",
    "I'm sorry I can't respond fully right now due to technical issues. In the meantime, please be gentle with yourself and remember that difficult feelings are temporary."
  ],
  career: [
    "I appreciate you reaching out about your career goals. While I'm experiencing technical difficulties, remember that every challenge is an opportunity for growth and learning.",
    "Thank you for your career-related question. Although I'm having connection issues right now, I encourage you to keep thinking strategically about your professional development.",
    "I'm currently unable to provide my full response due to technical issues, but remember that your career journey is unique and valuable, regardless of temporary setbacks."
  ],
  narrator: [
    "What a wonderful story moment you've shared! While I'm experiencing some technical difficulties, I encourage you to keep exploring your narrative. Every experience has the potential to become a meaningful story.",
    "I love that you're thinking about storytelling and emotional expression. Though I'm having connection issues right now, remember that your story matters and deserves to be told.",
    "I'm currently unable to help you craft your story due to technical issues, but please don't let that stop your creative flow. Your narrative voice is unique and valuable."
  ],
  neutral: [
    "I'm experiencing some technical difficulties right now, but I appreciate your question. Please try again in a few moments.",
    "I'm sorry, but I'm having trouble connecting at the moment. Your question is important, so please don't hesitate to ask again shortly.",
    "Due to technical issues, I can't provide a complete response right now. Please try again in a little while."
  ]
};

function getRandomFallbackResponse(mode: 'therapist' | 'career' | 'narrator' | 'neutral'): string {
  const responses = fallbackResponses[mode];
  return responses[Math.floor(Math.random() * responses.length)];
}

export async function generateElevenLabsResponse(
  userMessage: string,
  mode: 'therapist' | 'career' | 'narrator' | 'neutral',
  conversationHistory: ElevenLabsMessage[] = []
): Promise<{ text: string; audioUrl?: string }> {
  const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
  
  if (!apiKey) {
    // Return fallback response when no API key is configured
    return {
      text: getRandomFallbackResponse(mode)
    };
  }

  try {
    // Create conversation context
    const context = systemPrompts[mode];
    const recentHistory = conversationHistory.slice(-5); // Keep last 5 messages for context
    
    // Build conversation string
    let conversationContext = `${context}\n\nConversation history:\n`;
    recentHistory.forEach(msg => {
      conversationContext += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
    });
    conversationContext += `User: ${userMessage}\nAssistant:`;

    // Use ElevenLabs conversational AI endpoint
    const response = await fetch(`${ELEVENLABS_API_URL}/convai/conversation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': apiKey
      },
      body: JSON.stringify({
        agent_id: AGENT_ID,
        text: userMessage,
        conversation_history: recentHistory,
        mode: mode
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.detail?.message || errorData.message || 'Unknown error';
      
      // Handle specific error cases
      if (response.status === 401) {
        throw new Error('ElevenLabs API key is invalid. Please check your API key configuration.');
      } else if (response.status === 429) {
        throw new Error('ElevenLabs API rate limit reached. Please wait a moment before trying again.');
      } else if (response.status === 402) {
        throw new Error('ElevenLabs account requires payment. Please update your billing information.');
      } else if (response.status >= 500) {
        throw new Error('ElevenLabs services are temporarily unavailable. Please try again in a few minutes.');
      } else {
        throw new Error(`ElevenLabs API error (${response.status}): ${errorMessage}`);
      }
    }

    const data = await response.json();
    
    // Extract response text and audio URL if available
    return {
      text: data.response || data.text || getRandomFallbackResponse(mode),
      audioUrl: data.audio_url
    };

  } catch (error) {
    console.error('ElevenLabs API Error:', error);
    
    // If it's already our custom error, re-throw it
    if (error instanceof Error && error.message.includes('ElevenLabs')) {
      throw error;
    }
    
    // For network errors or other issues, return fallback
    return {
      text: getRandomFallbackResponse(mode)
    };
  }
}

// Text-to-speech function for playing responses
export async function generateSpeech(text: string, voiceId?: string): Promise<string | null> {
  const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
  
  if (!apiKey) {
    return null;
  }

  try {
    const defaultVoiceId = 'pNInz6obpgDQGcFmaJgB'; // Adam voice
    const response = await fetch(`${ELEVENLABS_API_URL}/text-to-speech/${voiceId || defaultVoiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': apiKey
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      })
    });

    if (!response.ok) {
      console.error('Failed to generate speech:', response.status);
      return null;
    }

    const audioBlob = await response.blob();
    return URL.createObjectURL(audioBlob);
  } catch (error) {
    console.error('Speech generation error:', error);
    return null;
  }
}