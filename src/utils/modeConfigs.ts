import { ModeConfig, AIMode } from '../types';

export const modeConfigs: Record<AIMode, ModeConfig> = {
  therapist: {
    name: 'Therapy Session',
    description: 'A safe space for emotional support and healing',
    gradient: 'from-purple-500 via-pink-500 to-indigo-500',
    bgPattern: 'bg-gradient-to-br from-purple-50/30 via-pink-50/20 to-indigo-50/30',
    primaryColor: 'purple',
    secondaryColor: 'pink',
    accentColor: 'indigo',
    textColor: 'text-purple-800',
    icon: '🧠'
  },
  career: {
    name: 'Career Mentoring',
    description: 'Professional guidance for your career journey',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    bgPattern: 'bg-gradient-to-br from-blue-50/30 via-cyan-50/20 to-teal-50/30',
    primaryColor: 'blue',
    secondaryColor: 'cyan',
    accentColor: 'teal',
    textColor: 'text-blue-800',
    icon: '💼'
  },
  narrator: {
    name: 'Story Narration',
    description: 'Creative storytelling and emotional expression',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    bgPattern: 'bg-gradient-to-br from-emerald-50/30 via-teal-50/20 to-cyan-50/30',
    primaryColor: 'emerald',
    secondaryColor: 'teal',
    accentColor: 'cyan',
    textColor: 'text-emerald-800',
    icon: '📖'
  },
  neutral: {
    name: 'Calmi',
    description: 'Choose your path to wellness and growth',
    gradient: 'from-gray-100 via-slate-50 to-gray-100',
    bgPattern: 'bg-gradient-to-br from-gray-50/30 via-slate-50/20 to-gray-50/30',
    primaryColor: 'gray',
    secondaryColor: 'slate',
    accentColor: 'gray',
    textColor: 'text-gray-800',
    icon: '✨'
  }
};

export function getModeStyles(mode: AIMode) {
  const config = modeConfigs[mode];
  
  return {
    background: `bg-gradient-to-br ${config.gradient}`,
    pattern: config.bgPattern,
    primary: config.primaryColor,
    secondary: config.secondaryColor,
    accent: config.accentColor,
    text: config.textColor,
    buttonPrimary: `bg-${config.primaryColor}-600 hover:bg-${config.primaryColor}-700 text-white`,
    buttonSecondary: `bg-${config.primaryColor}-100 hover:bg-${config.primaryColor}-200 text-${config.primaryColor}-700`,
    card: `bg-white/80 backdrop-blur-sm border border-${config.primaryColor}-200/50`,
    messageBubble: {
      user: `bg-${config.primaryColor}-600 text-white`,
      ai: `bg-white/90 border border-${config.primaryColor}-200/50 text-gray-800`
    }
  };
}