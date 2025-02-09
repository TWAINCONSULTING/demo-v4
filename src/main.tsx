import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LoadingProvider } from './providers/LoadingProvider';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoadingProvider>
      <App />
    </LoadingProvider>
  </StrictMode>
);