import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // 如果你还用传统 css，保留即可
import App from './App';
import './i18n';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
