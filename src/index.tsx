// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import './ChipComponent.css'; // Add this line
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
