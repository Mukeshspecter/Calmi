import React from 'react';
import { Sparkles, Star, Circle } from 'lucide-react';

interface NeutralInterfaceProps {
  children: React.ReactNode;
}

export function NeutralInterface({ children }: NeutralInterfaceProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-slate-50 to-gray-100 relative overflow-hidden">
      {/* Subtle floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-20 w-32 h-32 bg-gray-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-48 right-28 w-24 h-24 bg-slate-200/30 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-36 left-1/4 w-40 h-40 bg-gray-300/15 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      {/* Neutral decorative elements */}
      <div className="absolute top-16 left-16 text-gray-300/50">
        <Sparkles size={28} className="animate-pulse" />
      </div>
      <div className="absolute top-24 right-20 text-slate-300/50">
        <Star size={24} className="animate-pulse delay-1000" />
      </div>
      <div className="absolute bottom-20 left-24 text-gray-400/50">
        <Circle size={26} className="animate-pulse delay-2000" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}