import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppWrapper from './AppWrapper';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './compoents/context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <AppWrapper /> 
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();