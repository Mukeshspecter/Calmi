import React, { useState } from 'react';
import { Save, FileText, Download, Plus, Trash2, Clock } from 'lucide-react';
import { AIMode } from '../types';
import { getModeStyles } from '../utils/modeConfigs';

interface SessionNotesProps {
  sessionId: string;
  currentMode: AIMode;
  onSaveNote: (note: string) => void;
  className?: string;
}

interface SavedNote {
  id: string;
  content: string;
  timestamp: Date;
  mood?: string;
}

export function SessionNotes({ sessionId, currentMode, onSaveNote, className = '' }: SessionNotesProps) {
  const [note, setNote] = useState('');
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>([]);
  const [selectedMood, setSelectedMood] = useState<string>('');
  
  const styles = getModeStyles(currentMode);

  const moods = currentMode === 'therapist' 
    ? ['😊 Happy', '😔 Sad', '😰 Anxious', '😡 Angry', '😌 Calm', '🤔 Confused', '💪 Motivated']
    : ['🎯 Focused', '💡 Inspired', '📈 Ambitious', '🤝 Networking', '📚 Learning', '🚀 Excited', '⚡ Energized'];

  const handleSaveNote = () => {
    if (note.trim()) {
      const newNote: SavedNote = {
        id: Date.now().toString(),
        content: note.trim(),
        timestamp: new Date(),
        mood: selectedMood
      };
      setSavedNotes(prev => [newNote, ...prev]);
      onSaveNote(note.trim());
      setNote('');
      setSelectedMood('');
    }
  };

  const handleDeleteNote = (noteId: string) => {
    setSavedNotes(prev => prev.filter(n => n.id !== noteId));
  };

  const handleExportNotes = () => {
    const notesText = savedNotes.map(note => 
      `${note.timestamp.toLocaleString()}${note.mood ? ` [${note.mood}]` : ''}\n${note.content}\n\n`
    ).join('');
    
    const blob = new Blob([notesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindease-${currentMode}-notes-${sessionId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`${styles.card} rounded-xl p-6 shadow-lg backdrop-blur-sm ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${styles.buttonSecondary} rounded-full flex items-center justify-center`}>
            <FileText size={20} />
          </div>
          <div>
            <h3 className={`font-semibold ${styles.text}`}>Session Notes</h3>
            <p className="text-xs text-gray-500">Private & secure</p>
          </div>
        </div>
        {savedNotes.length > 0 && (
          <button
            onClick={handleExportNotes}
            className={`inline-flex items-center gap-2 px-3 py-2 ${styles.buttonSecondary} rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105`}
          >
            <Download size={16} />
            Export
          </button>
        )}
      </div>

      {/* Mood Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current mood/focus:
        </label>
        <div className="flex flex-wrap gap-2">
          {moods.map((mood) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(selectedMood === mood ? '' : mood)}
              className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                selectedMood === mood
                  ? `${styles.buttonPrimary} shadow-md`
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {mood}
            </button>
          ))}
        </div>
      </div>

      {/* Note Input */}
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder={currentMode === 'therapist' 
          ? "How are you feeling? What insights did you gain today?"
          : "What career goals are you working on? Any new strategies or connections?"
        }
        className={`w-full h-32 p-4 border-2 border-${styles.primary}-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-${styles.primary}-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm`}
      />

      <div className="flex justify-end mt-4">
        <button
          onClick={handleSaveNote}
          disabled={!note.trim()}
          className={`inline-flex items-center gap-2 px-6 py-3 ${styles.buttonPrimary} rounded-xl font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-${styles.primary}-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
        >
          <Plus size={18} />
          Save Note
        </button>
      </div>

      {/* Saved Notes */}
      {savedNotes.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className={`font-medium ${styles.text} mb-4 flex items-center gap-2`}>
            <Clock size={16} />
            Recent Notes ({savedNotes.length})
          </h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {savedNotes.map((savedNote) => (
              <div key={savedNote.id} className={`text-sm bg-white/60 p-4 rounded-lg border border-${styles.primary}-200/50 backdrop-blur-sm group hover:shadow-md transition-all duration-200`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{savedNote.timestamp.toLocaleString()}</span>
                    {savedNote.mood && (
                      <span className={`px-2 py-1 bg-${styles.primary}-100 text-${styles.primary}-700 rounded-full`}>
                        {savedNote.mood}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteNote(savedNote.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-600 transition-all duration-200"
                    title="Delete note"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <p className="text-gray-700 leading-relaxed">{savedNote.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}