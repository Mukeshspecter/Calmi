import React from 'react';
import { TrendingUp, Target, Zap, Award, Briefcase, BarChart3 } from 'lucide-react';

interface CareerInterfaceProps {
  children: React.ReactNode;
}

export function CareerInterface({ children }: CareerInterfaceProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-100 relative overflow-hidden">
      {/* 3D Professional Grid Pattern */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute inset-0 transform-gpu perspective-1000 rotate-x-15" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* 3D Floating Professional Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large 3D Geometric Shapes */}
        <div className="absolute top-24 left-16 w-36 h-36 bg-gradient-to-br from-blue-300/40 to-cyan-300/40 rounded-full blur-xl animate-pulse transform-gpu perspective-1000 rotate-x-20 rotate-y-20 shadow-2xl"></div>
        <div className="absolute top-32 right-24 w-28 h-28 bg-gradient-to-br from-cyan-300/50 to-teal-300/50 rounded-full blur-lg animate-pulse delay-1000 transform-gpu perspective-1000 rotate-x-30 rotate-y-30 shadow-xl"></div>
        <div className="absolute bottom-40 left-1/3 w-44 h-44 bg-gradient-to-br from-teal-300/30 to-blue-300/30 rounded-full blur-2xl animate-pulse delay-2000 transform-gpu perspective-1000 rotate-x-25 rotate-y-25 shadow-3xl"></div>
        <div className="absolute bottom-24 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-400/35 to-cyan-400/35 rounded-full blur-xl animate-pulse delay-500 transform-gpu perspective-1000 rotate-x-40 rotate-y-40 shadow-2xl"></div>
        
        {/* 3D Professional Shapes */}
        <div className="absolute top-1/4 left-1/5 w-20 h-20 bg-gradient-to-br from-blue-200/60 to-cyan-200/60 transform rotate-45 animate-spin-slow shadow-lg"></div>
        <div className="absolute bottom-1/4 right-1/5 w-16 h-16 bg-gradient-to-br from-teal-200/60 to-blue-200/60 transform rotate-45 animate-spin-slow delay-1500 shadow-md"></div>
        
        {/* Hexagonal Shapes for Professional Feel */}
        <div className="absolute top-1/2 left-1/6 w-14 h-14 bg-gradient-to-br from-cyan-300/50 to-teal-300/50 transform rotate-30 animate-spin-slow delay-1000 shadow-md" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
        <div className="absolute bottom-1/3 right-1/6 w-12 h-12 bg-gradient-to-br from-blue-300/50 to-cyan-300/50 transform rotate-30 animate-spin-slow delay-2000 shadow-sm" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
        
        {/* Floating Success Particles */}
        <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-blue-400/80 rounded-full animate-float shadow-sm"></div>
        <div className="absolute top-2/3 left-1/4 w-3 h-3 bg-cyan-400/80 rounded-full animate-float delay-700 shadow-sm"></div>
        <div className="absolute bottom-1/5 left-1/2 w-5 h-5 bg-teal-400/80 rounded-full animate-float delay-1200 shadow-sm"></div>
        
        {/* 3D Professional Rings */}
        <div className="absolute top-1/3 left-12 w-24 h-24 border-4 border-blue-300/40 rounded-full animate-spin-slow transform-gpu perspective-1000 rotate-x-50"></div>
        <div className="absolute bottom-1/5 right-12 w-18 h-18 border-3 border-cyan-300/40 rounded-full animate-spin-slow delay-1800 transform-gpu perspective-1000 rotate-x-65"></div>
      </div>

      {/* Animated 3D Career Icons */}
      <div className="absolute top-12 left-12 text-blue-400/70 animate-float">
        <TrendingUp size={40} className="drop-shadow-lg transform-gpu perspective-1000 rotate-x-15 rotate-y-15" />
      </div>
      <div className="absolute top-20 right-16 text-cyan-400/70 animate-float delay-1000">
        <Target size={36} className="drop-shadow-lg transform-gpu perspective-1000 rotate-x-25 rotate-y-25" />
      </div>
      <div className="absolute bottom-16 left-20 text-teal-400/70 animate-float delay-2000">
        <Zap size={38} className="drop-shadow-lg transform-gpu perspective-1000 rotate-x-35 rotate-y-35" />
      </div>
      <div className="absolute top-1/4 right-10 text-blue-300/60 animate-float delay-500">
        <Award size={32} className="drop-shadow-md transform-gpu perspective-1000 rotate-x-20 rotate-y-20" />
      </div>
      <div className="absolute bottom-1/4 left-10 text-cyan-300/60 animate-float delay-1500">
        <Briefcase size={34} className="drop-shadow-md transform-gpu perspective-1000 rotate-x-30 rotate-y-30" />
      </div>
      <div className="absolute top-2/3 right-1/3 text-teal-300/60 animate-float delay-800">
        <BarChart3 size={30} className="drop-shadow-md transform-gpu perspective-1000 rotate-x-40 rotate-y-40" />
      </div>

      {/* Animated Professional Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 animate-gradient-shift"></div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}