import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // AuthProvider'ı import ediyoruz

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* App bileşenini AuthProvider ile sarıyoruz */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);