import React, { useState } from 'react';
import { ChatInterface } from './components/ChatInterface';

function App() {
  return (
    <div className="App">
      <ChatInterface 
        userEmail="guest@mindease.ai" 
        userName="Guest User"
      />
    </div>
  );
}

export default App;