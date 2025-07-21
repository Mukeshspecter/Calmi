import React from 'react';
import { Brain, Briefcase, BookOpen, Sparkles, Heart, TrendingUp, Zap, Users, Phone, Feather, Pen } from 'lucide-react';
import { AIMode } from '../types';
import { modeConfigs } from '../utils/modeConfigs';

interface ModeSelectorProps {
  currentMode: AIMode;
  onModeChange: (mode: AIMode) => void;
  className?: string;
}

export function ModeSelector({ currentMode, onModeChange, className = '' }: ModeSelectorProps) {
  const modes = [
    {
      key: 'therapist' as AIMode,
      icon: Brain,
      label: 'Therapy Session',
      description: 'Emotional support & healing',
      features: ['Safe space to share', 'Empathetic listening', 'Coping strategies', 'Mental wellness'],
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      decorativeIcons: [Heart, Users],
      callToAction: 'Start Therapy Session',
      aiName: 'Donna'
    },
    {
      key: 'career' as AIMode,
      icon: Briefcase,
      label: 'Career Mentoring',
      description: 'Professional growth & success',
      features: ['Strategic guidance', 'Skill development', 'Network building', 'Goal achievement'],
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      decorativeIcons: [TrendingUp, Zap],
      callToAction: 'Start Career Session',
      aiName: 'Buddy'
    },
    {
      key: 'narrator' as AIMode,
      icon: BookOpen,
      label: 'Story Narration',
      description: 'Creative storytelling & emotional expression',
      features: ['Story co-creation', 'Emotional narratives', 'Creative dialogue', 'Narrative expansion'],
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50',
      decorativeIcons: [Feather, Pen],
      callToAction: 'Start Story Session',
      aiName: 'GoFlow'
    }
  ];

  return (
    <div className={`grid md:grid-cols-2 gap-8 ${className}`}>
      {modes.map(({ key, icon: Icon, label, description, features, color, gradient, bgGradient, decorativeIcons, callToAction, aiName }) => {
        const isActive = currentMode === key;
        const [DecorIcon1, DecorIcon2] = decorativeIcons;
        
        return (
          <button
            key={key}
            onClick={() => onModeChange(key)}
            className={`
              relative group p-8 rounded-3xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-3 card-3d
              ${isActive 
                ? `bg-gradient-to-br ${bgGradient} shadow-3xl border-2 border-${color}-300 ring-4 ring-${color}-200/50 scale-105 glow-${color}` 
                : 'bg-white/90 hover:bg-white/95 border-2 border-gray-200 hover:border-gray-300 shadow-xl hover:shadow-3xl glass'
              }
              backdrop-blur-sm overflow-hidden transform-gpu perspective-1000
            `}
          >
            {/* Enhanced 3D animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-6 right-6 animate-float">
                <DecorIcon1 size={28} className={`text-${color}-400 transform rotate-12 drop-shadow-3d`} />
              </div>
              <div className="absolute bottom-6 left-6 animate-float delay-1000">
                <DecorIcon2 size={24} className={`text-${color}-400 transform -rotate-12 drop-shadow-3d`} />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 animate-rotate-3d">
                <Icon size={120} className={`text-${color}-400`} />
              </div>
              
              {/* 3D Geometric Shapes */}
              <div className={`absolute top-4 left-4 w-8 h-8 bg-${color}-300/30 rounded-full animate-bounce-3d`}></div>
              <div className={`absolute bottom-4 right-4 w-6 h-6 bg-${color}-400/30 transform rotate-45 animate-morph`}></div>
            </div>

            {/* Enhanced floating orbs for active state */}
            {isActive && (
              <>
                <div className={`absolute top-3 right-3 w-4 h-4 bg-${color}-400 rounded-full animate-bounce-3d glow-${color}`}></div>
                <div className={`absolute bottom-3 left-3 w-3 h-3 bg-${color}-500 rounded-full animate-bounce-3d delay-500 glow-${color}`}></div>
                <div className={`absolute top-1/2 right-3 w-2 h-2 bg-${color}-600 rounded-full animate-bounce-3d delay-1000 glow-${color}`}></div>
                
                {/* Floating particles */}
                <div className={`absolute top-1/4 left-1/4 w-1 h-1 bg-${color}-300 rounded-full animate-float`}></div>
                <div className={`absolute bottom-1/4 right-1/4 w-1 h-1 bg-${color}-400 rounded-full animate-float delay-700`}></div>
              </>
            )}

            <div className="relative z-10">
              {/* Enhanced 3D icon with gradient background */}
              <div className={`
                w-24 h-24 rounded-3xl flex items-center justify-center mb-6 mx-auto transition-all duration-500 relative transform-gpu perspective-500
                ${isActive 
                  ? `bg-gradient-to-br ${gradient} shadow-3xl glow-${color} animate-pulse-3d scale-110` 
                  : `bg-gray-100 group-hover:bg-gradient-to-br group-hover:${gradient} group-hover:shadow-3xl group-hover:scale-110 group-hover:glow-${color}`
                }
              `}>
                <Icon size={40} className={`${isActive ? 'text-white' : `text-gray-600 group-hover:text-white`} drop-shadow-3d`} />
                
                {/* Enhanced pulsing rings for active state */}
                {isActive && (
                  <>
                    <div className="absolute inset-0 rounded-3xl border-2 border-white/40 animate-ping"></div>
                    <div className="absolute inset-0 rounded-3xl border border-white/60 animate-pulse"></div>
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent animate-gradient-shift"></div>
                  </>
                )}
              </div>

              {/* AI Name Badge */}
              <div className={`text-center mb-2 transition-all duration-300 ${
                isActive ? 'opacity-100 transform scale-100' : 'opacity-70 group-hover:opacity-100 group-hover:scale-100'
              }`}>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
                  isActive 
                    ? `bg-${color}-600 text-white shadow-lg glow-${color}` 
                    : `bg-gray-200 text-gray-600 group-hover:bg-${color}-600 group-hover:text-white`
                }`}>
                  <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white animate-pulse' : 'bg-gray-400'}`}></div>
                  {aiName}
                </div>
              </div>

              {/* Enhanced title and description */}
              <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300 ${
                isActive ? `text-${color}-800` : 'text-gray-800 group-hover:text-gray-900'
              }`}>
                {label}
              </h3>
              
              <p className={`text-base mb-6 transition-colors duration-300 ${
                isActive ? `text-${color}-600` : 'text-gray-600 group-hover:text-gray-700'
              }`}>
                {description}
              </p>

              {/* Enhanced feature list with 3D effects */}
              <div className="space-y-3 mb-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 group/feature">
                    <div className={`w-3 h-3 rounded-full transition-all duration-300 transform-gpu ${
                      isActive 
                        ? `bg-${color}-500 shadow-lg glow-${color} animate-pulse-3d` 
                        : 'bg-gray-400 group-hover:bg-gray-600 group/feature-hover:scale-110'
                    }`}></div>
                    <span className={`text-sm transition-colors duration-300 ${
                      isActive ? `text-${color}-700 font-medium` : 'text-gray-600 group-hover:text-gray-700'
                    }`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Enhanced 3D action indicator */}
              <div className={`text-center transition-all duration-500 transform-gpu ${
                isActive ? 'opacity-100 transform scale-100' : 'opacity-0 group-hover:opacity-100 group-hover:scale-100 transform scale-95'
              }`}>
                <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform-gpu ${
                  isActive 
                    ? `bg-${color}-600 text-white shadow-3xl glow-${color} animate-pulse-3d` 
                    : `bg-gradient-to-r ${gradient} text-white shadow-lg hover:shadow-3xl transform hover:scale-105 hover:glow-${color}`
                }`}>
                  {isActive ? (
                    <>
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span>Active Session</span>
                    </>
                  ) : (
                    <>
                      <Phone size={16} className="animate-float" />
                      <span>{callToAction}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Enhanced live session indicator */}
              {isActive && (
                <div className="mt-4 text-center animate-fade-in">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-xs font-medium shadow-lg glow-green transform-gpu`}>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-3d"></div>
                    Ready for voice interaction with {aiName}
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced 3D hover glow effect */}
            <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition-all duration-500 bg-gradient-to-br ${gradient} animate-gradient-shift ${
              isActive ? 'opacity-20' : ''
            }`}></div>
            
            {/* Enhanced shimmer effect for active state */}
            {isActive && (
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent animate-gradient-shift"></div>
            )}

            {/* 3D depth shadow */}
            <div className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
              isActive ? `shadow-3xl` : 'group-hover:shadow-3xl'
            }`} style={{ 
              transform: 'translateZ(-10px)',
              background: `linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.05))`
            }}></div>
          </button>
        );
      })}
    </div>
  );
}