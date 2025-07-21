import React from 'react';
import { Heart, Leaf, Moon, Star, Sparkles } from 'lucide-react';

interface TherapyInterfaceProps {
  children: React.ReactNode;
}

export function TherapyInterface({ children }: TherapyInterfaceProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 relative overflow-hidden">
      {/* 3D Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large 3D Spheres */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-300/40 to-pink-300/40 rounded-full blur-xl animate-pulse transform-gpu perspective-1000 rotate-x-12 rotate-y-12 shadow-2xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-300/50 to-indigo-300/50 rounded-full blur-lg animate-pulse delay-1000 transform-gpu perspective-1000 rotate-x-45 rotate-y-45 shadow-xl"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-indigo-300/30 to-purple-300/30 rounded-full blur-2xl animate-pulse delay-2000 transform-gpu perspective-1000 rotate-x-24 rotate-y-24 shadow-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-purple-400/35 to-pink-400/35 rounded-full blur-xl animate-pulse delay-500 transform-gpu perspective-1000 rotate-x-36 rotate-y-36 shadow-2xl"></div>
        
        {/* 3D Cubes */}
        <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-gradient-to-br from-purple-200/60 to-pink-200/60 transform rotate-45 animate-spin-slow shadow-lg"></div>
        <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-gradient-to-br from-indigo-200/60 to-purple-200/60 transform rotate-45 animate-spin-slow delay-1000 shadow-md"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-purple-400/80 rounded-full animate-float shadow-sm"></div>
        <div className="absolute top-2/3 left-1/3 w-2 h-2 bg-pink-400/80 rounded-full animate-float delay-500 shadow-sm"></div>
        <div className="absolute bottom-1/4 left-1/2 w-4 h-4 bg-indigo-400/80 rounded-full animate-float delay-1000 shadow-sm"></div>
        
        {/* 3D Rings */}
        <div className="absolute top-1/2 left-10 w-20 h-20 border-4 border-purple-300/40 rounded-full animate-spin-slow transform-gpu perspective-1000 rotate-x-45"></div>
        <div className="absolute bottom-1/4 right-10 w-16 h-16 border-3 border-pink-300/40 rounded-full animate-spin-slow delay-2000 transform-gpu perspective-1000 rotate-x-60"></div>
      </div>

      {/* Animated 3D Icons */}
      <div className="absolute top-8 left-8 text-purple-400/70 animate-float">
        <Heart size={36} className="drop-shadow-lg transform-gpu perspective-1000 rotate-x-12 rotate-y-12" />
      </div>
      <div className="absolute top-16 right-12 text-pink-400/70 animate-float delay-1000">
        <Leaf size={32} className="drop-shadow-lg transform-gpu perspective-1000 rotate-x-24 rotate-y-24" />
      </div>
      <div className="absolute bottom-12 left-16 text-indigo-400/70 animate-float delay-2000">
        <Moon size={34} className="drop-shadow-lg transform-gpu perspective-1000 rotate-x-36 rotate-y-36" />
      </div>
      <div className="absolute top-1/3 right-8 text-purple-300/60 animate-float delay-500">
        <Star size={28} className="drop-shadow-md transform-gpu perspective-1000 rotate-x-18 rotate-y-18" />
      </div>
      <div className="absolute bottom-1/3 left-8 text-pink-300/60 animate-float delay-1500">
        <Sparkles size={30} className="drop-shadow-md transform-gpu perspective-1000 rotate-x-30 rotate-y-30" />
      </div>

      {/* 3D Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 transform-gpu perspective-1000 rotate-x-12" style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 animate-gradient-shift"></div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}