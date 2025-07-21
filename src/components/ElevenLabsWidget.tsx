import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { AIMode } from '../types';

interface ElevenLabsWidgetProps {
  agentId: string;
  currentMode: AIMode;
  onClose?: () => void;
  onMessageReceived?: (message: string) => void;
  autoStart?: boolean;
  className?: string;
}

export function ElevenLabsWidget({ 
  agentId, 
  currentMode, 
  onClose, 
  onMessageReceived, 
  autoStart = false,
  className = '' 
}: ElevenLabsWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');

  useEffect(() => {
    // Reset states when agent changes
    setIsLoaded(false);
    setConnectionStatus('connecting');

    const initializeWidget = () => {
      if (widgetRef.current) {
        try {
          // Clear previous widget
          widgetRef.current.innerHTML = '';
          
          // Create new widget with the specific agent ID
          const widgetElement = document.createElement('elevenlabs-convai');
          widgetElement.setAttribute('agent-id', agentId);
          widgetElement.setAttribute('auto-start', autoStart ? 'true' : 'false');
          widgetElement.setAttribute('show-ui', 'true');
          widgetElement.setAttribute('theme', 'light');
          
          // Event listeners
          widgetElement.addEventListener('load', () => {
            console.log(`ElevenLabs widget loaded for agent: ${agentId}`);
            setIsLoaded(true);
            setConnectionStatus('connected');
          });
          
          widgetElement.addEventListener('error', (event: any) => {
            console.error('ElevenLabs widget error:', event);
            setConnectionStatus('error');
            setIsLoaded(true);
          });
          
          widgetElement.addEventListener('agent-response', (event: any) => {
            console.log('Agent response from:', agentId, event.detail);
            if (onMessageReceived && event.detail?.text) {
              onMessageReceived(event.detail.text);
            }
          });
          
          widgetRef.current.appendChild(widgetElement);
          
          // Fallback timeout
          setTimeout(() => {
            if (!isLoaded) {
              console.log('Widget load timeout, marking as connected');
              setIsLoaded(true);
              setConnectionStatus('connected');
            }
          }, 5000);
          
        } catch (error) {
          console.error('Failed to initialize ElevenLabs widget:', error);
          setConnectionStatus('error');
          setIsLoaded(true);
        }
      }
    };

    const waitForScript = () => {
      if (customElements.get('elevenlabs-convai')) {
        initializeWidget();
      } else {
        setTimeout(waitForScript, 500);
      }
    };

    waitForScript();

    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = '';
      }
    };
  }, [agentId, autoStart]);

  const getAgentName = () => {
    return currentMode === 'therapist' ? 'Donna' : 
           currentMode === 'career' ? 'Buddy' : 'GoFlow';
  };

  const getAgentDescription = () => {
    return currentMode === 'therapist' 
      ? 'Your compassionate AI therapist'
      : currentMode === 'career'
      ? 'Your dedicated AI career mentor'
      : 'Your creative AI narrator & story companion';
  };

  const getAgentRole = () => {
    return currentMode === 'therapist' 
      ? 'Specialized in emotional support and mental wellness'
      : currentMode === 'career'
      ? 'Specialized in career guidance and professional development'
      : 'Specialized in storytelling, narrative creation, and emotional expression';
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border overflow-hidden ${className}`}>
      {/* Mobile-Optimized Header */}
      <div className={`p-3 sm:p-4 border-b ${
        currentMode === 'therapist' ? 'bg-purple-50' : 
        currentMode === 'career' ? 'bg-blue-50' : 'bg-emerald-50'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-white text-sm sm:text-lg font-bold flex-shrink-0 ${
              currentMode === 'therapist' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                : currentMode === 'career'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500'
            }`}>
              {getAgentName().charAt(0)}
            </div>
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${
                connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' : 
                connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
              }`}></div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                  {getAgentName()}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  {connectionStatus === 'connecting' && `Connecting to ${getAgentName()}...`}
                  {connectionStatus === 'connected' && `${getAgentDescription()} is ready`}
                  {connectionStatus === 'error' && 'Connection failed'}
                </p>
              </div>
            </div>
          </div>
          
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors touch-manipulation flex-shrink-0"
              title={`Close ${getAgentName()}`}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Loading State - Mobile Optimized */}
      {!isLoaded && connectionStatus === 'connecting' && (
        <div className="p-6 sm:p-8 text-center">
          <div className={`w-6 h-6 sm:w-8 sm:h-8 border-2 border-gray-300 rounded-full animate-spin mx-auto mb-4 ${
            currentMode === 'therapist' ? 'border-t-purple-500' : 
            currentMode === 'career' ? 'border-t-blue-500' : 'border-t-emerald-500'
          }`}></div>
          <p className="text-sm sm:text-base text-gray-600 mb-2">Loading {getAgentName()}...</p>
          <p className="text-xs sm:text-sm text-gray-500">{getAgentRole()}</p>
          <div className="mt-3 text-xs text-gray-400">
            <p>Agent ID: {agentId}</p>
          </div>
        </div>
      )}

      {/* Error State - Mobile Optimized */}
      {connectionStatus === 'error' && (
        <div className="p-6 sm:p-8 text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X size={20} className="sm:w-6 sm:h-6 text-red-600" />
          </div>
          <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">Connection Error</h4>
          <p className="text-sm sm:text-base text-gray-600 mb-2">Unable to connect to {getAgentName()}</p>
          <p className="text-xs sm:text-sm text-gray-500 mb-4">Agent: {agentId}</p>
          <button
            onClick={() => window.location.reload()}
            className={`px-4 py-2 text-white rounded-md transition-colors touch-manipulation text-sm sm:text-base ${
              currentMode === 'therapist' 
                ? 'bg-purple-500 hover:bg-purple-600' 
               : currentMode === 'career'
               ? 'bg-blue-500 hover:bg-blue-600'
               : 'bg-emerald-500 hover:bg-emerald-600'
            }`}
          >
            Refresh Page
          </button>
        </div>
      )}

      {/* Widget Container - Mobile Optimized */}
      <div 
        ref={widgetRef}
        className="w-full bg-gray-50"
        style={{ 
          minHeight: window.innerWidth < 640 ? '240px' : '320px',
          height: window.innerWidth < 640 ? '240px' : '320px'
        }}
      />

      {/* Mobile-Optimized Status */}
      <div className="p-3 bg-gray-50 border-t text-center">
        <p className="text-xs sm:text-sm text-gray-600">
          {connectionStatus === 'connected'
            ? `${getAgentName()} is ready - use the controls above to start talking`
            : `Setting up ${getAgentName()}...`
          }
        </p>
        {connectionStatus === 'connected' && (
          <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-500">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>Ready</span>
            <span>•</span>
            <span className="truncate">{getAgentName()} - {
              currentMode === 'therapist' ? 'Therapy Mode' : 
              currentMode === 'career' ? 'Career Mode' : 'Narrator Mode'
            }</span>
          </div>
        )}
      </div>
    </div>
  );
}