import { AIMode } from '../types';

interface AIResponse {
  content: string;
  mode: AIMode;
}

const therapistResponses = {
  greeting: [
    "Welcome to our safe space. I'm here to listen with compassion and understanding. How are you feeling in this moment?",
    "Thank you for being here. This is your time to be heard and supported. What's been on your heart lately?",
    "I'm honored you've chosen to share this space with me. Take a deep breath, and when you're ready, tell me what's weighing on you."
  ],
  supportive: [
    "I can hear the pain in your words, and I want you to know that what you're feeling is completely valid. You're not alone in this. Can you tell me more about what's been the most difficult part?",
    "Your courage in sharing this with me is remarkable. These feelings you're experiencing - they matter, and so do you. What would feel most supportive right now?",
    "I'm sitting with you in this difficult moment. There's no judgment here, only understanding. How long have you been carrying this weight?"
  ],
  reflective: [
    "It sounds like you're navigating something really challenging. Sometimes just being heard can be healing. What emotions are coming up for you as you share this?",
    "I can sense the depth of what you're experiencing. Your feelings are a compass - what do you think they're trying to tell you?",
    "Thank you for trusting me with something so personal. In moments like these, what has brought you comfort or strength before?"
  ],
  empowering: [
    "I see such strength in you, even in this vulnerable moment. You've survived difficult times before - what inner resources helped you through?",
    "Your awareness of these feelings shows incredible emotional intelligence. That's a powerful foundation for healing. What feels like the next gentle step forward?",
    "You're showing such bravery by facing these emotions head-on. Healing isn't linear, and you're exactly where you need to be right now."
  ]
};

const careerResponses = {
  greeting: [
    "Fantastic! I'm excited to be your career mentor today. Every great professional journey starts with clarity and action. What ambitious goal is calling to you?",
    "Welcome to your career acceleration session! I'm here to help you unlock opportunities and build the future you envision. What's your biggest professional aspiration right now?",
    "Ready to level up your career? I love working with driven individuals who are serious about growth. Tell me, what's the next mountain you want to climb professionally?"
  ],
  motivational: [
    "Now THAT'S the kind of ambitious thinking that separates high achievers from the rest! You're already thinking like a leader. What specific skills do you want to master to get there?",
    "I can feel your passion and drive - that's exactly what successful professionals have. The market rewards people who think strategically like you. What's your current experience foundation?",
    "Excellent goal! The best time to start building toward that vision was yesterday, the second best time is right now. What's your biggest strength that you can leverage immediately?"
  ],
  strategic: [
    "Let's build a winning strategy. First, we need to map out the key competencies for that role, then create a learning roadmap. What industry connections do you currently have?",
    "Smart approach! Here's how top performers tackle this: they start with market research, identify skill gaps, then build a portfolio of proof. What resources are available to you right now?",
    "Perfect timing for this goal! The market has incredible opportunities for someone with your mindset. Let's break this down into 90-day sprints. What's your strongest differentiator?"
  ],
  networking: [
    "Networking is your secret weapon! The best opportunities come through relationships, not job boards. Who in your network is already in your target industry?",
    "Here's an insider tip: informational interviews are gold mines for career advancement. They build relationships AND give you market intelligence. Who could you reach out to this week?",
    "Your network is your net worth in career terms. Start with warm connections, then expand strategically. What professional communities or events could you join?"
  ]
};

const narratorResponses = {
  greeting: [
    "Welcome to our creative space! I'm GoFlow, your storytelling companion. Every moment has the potential to become a beautiful narrative. What story is stirring in your heart today?",
    "Hello, fellow storyteller! I'm here to help you weave your experiences into meaningful tales. Whether it's a moment from your day or a feeling you want to explore, let's create something beautiful together.",
    "Greetings! I'm GoFlow, and I believe every person has incredible stories within them. What moment, feeling, or experience would you like to explore through narrative today?"
  ],
  creative: [
    "What a fascinating beginning! I can already see the story unfolding. Let me add some narrative depth to this moment... What if we explored what your character was really thinking in that instant?",
    "This is such rich material for storytelling! I love how this moment captures something deeper about the human experience. Shall we dive into the emotions beneath the surface?",
    "Beautiful! This reminds me of those pivotal moments that change everything. Let's expand this scene - what details would make this moment come alive for a reader?"
  ],
  emotional: [
    "I can feel the emotion in this story. Sometimes our most powerful narratives come from our most vulnerable moments. How did this experience change your character's perspective?",
    "This touches something universal about the human experience. Let's explore this feeling through story - what would your character learn from this moment?",
    "There's such depth here. Stories have this amazing power to help us process our emotions. What if we gave your character a voice to express what they couldn't say in the moment?"
  ],
  collaborative: [
    "I love where this story is going! Let me offer some narrative possibilities... What if we introduced an unexpected element that reveals something new about your character?",
    "This is wonderful collaborative storytelling! I'm thinking we could explore this from a different angle - perhaps through dialogue or internal monologue. What feels right to you?",
    "You're such a natural storyteller! Let's build on this together. I'm sensing there's more to discover about this moment - what hidden layers shall we uncover?"
  ]
};

function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}

export function generateAIResponse(userMessage: string, currentMode: AIMode): AIResponse {
  const lowerMessage = userMessage.toLowerCase();
  
  // Handle greetings
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.length < 20) {
    if (currentMode === 'therapist') {
      return {
        content: getRandomResponse(therapistResponses.greeting),
        mode: 'therapist'
      };
    } else if (currentMode === 'career') {
      return {
        content: getRandomResponse(careerResponses.greeting),
        mode: 'career'
      };
    } else if (currentMode === 'narrator') {
      return {
        content: getRandomResponse(narratorResponses.greeting),
        mode: 'narrator'
      };
    }
  }
  
  // Therapist mode responses
  if (currentMode === 'therapist') {
    if (lowerMessage.includes('feel') || lowerMessage.includes('emotion') || lowerMessage.includes('sad') || lowerMessage.includes('stressed') || lowerMessage.includes('anxious') || lowerMessage.includes('overwhelmed')) {
      return {
        content: getRandomResponse(therapistResponses.supportive),
        mode: 'therapist'
      };
    }
    if (lowerMessage.includes('better') || lowerMessage.includes('improve') || lowerMessage.includes('help') || lowerMessage.includes('change')) {
      return {
        content: getRandomResponse(therapistResponses.empowering),
        mode: 'therapist'
      };
    }
    return {
      content: getRandomResponse(therapistResponses.reflective),
      mode: 'therapist'
    };
  }
  
  // Career mode responses
  if (currentMode === 'career') {
    if (lowerMessage.includes('want to') || lowerMessage.includes('goal') || lowerMessage.includes('become') || lowerMessage.includes('achieve')) {
      return {
        content: getRandomResponse(careerResponses.motivational),
        mode: 'career'
      };
    }
    if (lowerMessage.includes('network') || lowerMessage.includes('connect') || lowerMessage.includes('people') || lowerMessage.includes('relationship')) {
      return {
        content: getRandomResponse(careerResponses.networking),
        mode: 'career'
      };
    }
    if (lowerMessage.includes('how') || lowerMessage.includes('strategy') || lowerMessage.includes('plan') || lowerMessage.includes('step')) {
      return {
        content: getRandomResponse(careerResponses.strategic),
        mode: 'career'
      };
    }
    return {
      content: getRandomResponse(careerResponses.motivational),
      mode: 'career'
    };
  }
  
  // Narrator mode responses
  if (currentMode === 'narrator') {
    if (lowerMessage.includes('story') || lowerMessage.includes('tell') || lowerMessage.includes('narrative') || lowerMessage.includes('write')) {
      return {
        content: getRandomResponse(narratorResponses.creative),
        mode: 'narrator'
      };
    }
    if (lowerMessage.includes('feel') || lowerMessage.includes('emotion') || lowerMessage.includes('experience') || lowerMessage.includes('moment')) {
      return {
        content: getRandomResponse(narratorResponses.emotional),
        mode: 'narrator'
      };
    }
    if (lowerMessage.includes('what if') || lowerMessage.includes('continue') || lowerMessage.includes('happen') || lowerMessage.includes('next')) {
      return {
        content: getRandomResponse(narratorResponses.collaborative),
        mode: 'narrator'
      };
    }
    return {
      content: getRandomResponse(narratorResponses.creative),
      mode: 'narrator'
    };
  }

  // Neutral responses
  return {
    content: "I'm here to help you thrive! Please select Therapy mode for emotional support, Career mode for professional guidance, or Narrator mode for creative storytelling using the buttons above.",
    mode: 'neutral'
  };
}