import { AIMode } from '../types';

const therapistKeywords = [
  'feel', 'feeling', 'emotions', 'sad', 'happy', 'angry', 'frustrated', 'anxious', 
  'stressed', 'overwhelmed', 'depressed', 'lonely', 'confused', 'hurt', 'pain',
  'relationship', 'family', 'friends', 'love', 'heartbreak', 'loss', 'grief',
  'therapy', 'therapist', 'mental health', 'emotional', 'burnout', 'exhausted',
  'worried', 'fear', 'scared', 'panic', 'trauma', 'healing', 'support'
];

const careerKeywords = [
  'career', 'job', 'work', 'professional', 'manager', 'promotion', 'salary',
  'interview', 'resume', 'linkedin', 'networking', 'skills', 'experience',
  'industry', 'company', 'startup', 'business', 'entrepreneur', 'leadership',
  'growth', 'development', 'learning', 'certification', 'degree', 'education',
  'goal', 'goals', 'ambition', 'future', 'path', 'direction', 'change career',
  'switch jobs', 'product manager', 'engineer', 'developer', 'designer',
  'marketing', 'sales', 'finance', 'consulting', 'management'
];

const narratorKeywords = [
  'story', 'tell', 'narrative', 'write', 'writing', 'character', 'plot',
  'dialogue', 'scene', 'chapter', 'book', 'novel', 'creative', 'fiction',
  'happened', 'experience', 'moment', 'memory', 'dream', 'imagine',
  'what if', 'continue', 'ending', 'beginning', 'middle', 'twist',
  'adventure', 'journey', 'tale', 'saga', 'chronicle', 'express',
  'voice', 'perspective', 'point of view', 'narrator', 'storytelling',
  'once upon', 'the end', 'meanwhile', 'suddenly', 'then', 'next'
];

export function detectMode(message: string): AIMode {
  const lowerMessage = message.toLowerCase();
  
  const therapistScore = therapistKeywords.reduce((score, keyword) => {
    return lowerMessage.includes(keyword) ? score + 1 : score;
  }, 0);
  
  const careerScore = careerKeywords.reduce((score, keyword) => {
    return lowerMessage.includes(keyword) ? score + 1 : score;
  }, 0);
  
  const narratorScore = narratorKeywords.reduce((score, keyword) => {
    return lowerMessage.includes(keyword) ? score + 1 : score;
  }, 0);
  
  if (therapistScore > careerScore && therapistScore > narratorScore && therapistScore > 0) {
    return 'therapist';
  } else if (careerScore > therapistScore && careerScore > narratorScore && careerScore > 0) {
    return 'career';
  } else if (narratorScore > therapistScore && narratorScore > careerScore && narratorScore > 0) {
    return 'narrator';
  }
  
  return 'neutral';
}