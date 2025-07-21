import React from 'react';
import { Brain, Briefcase, MessageCircle } from 'lucide-react';
import { AIMode } from '../types';

interface ModeIndicatorProps {
  mode: AIMode;
  className?: string;
}

export function ModeIndicator({ mode, className = '' }: ModeIndicatorProps) {
  const getModeConfig = () => {
    switch (mode) {
      case 'therapist':
        return {
          icon: Brain,
          label: 'Therapist Mode',
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200'
        };
      case 'career':
        return {
          icon: Briefcase,
          label: 'Career Mentor Mode',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        };
      default:
        return {
          icon: MessageCircle,
          label: 'Ready to Help',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
    }
  };

  const config = getModeConfig();
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${config.bgColor} ${config.borderColor} ${config.color} ${className}`}>
      <Icon size={16} />
      {config.label}
    </div>
  );
}