import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';

// Import CSS in order: reset → Intent system → overrides
import './global.css';
import '../.intent/intent.css';
import './intent-overrides.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
