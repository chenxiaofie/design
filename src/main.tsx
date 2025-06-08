import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // 如果你还用传统 css，保留即可
import App from './App';
import './i18n';
import { worker } from './mocks/browser';

// 在开发环境中启动 MSW
if (process.env.NODE_ENV === 'development') {
  worker.start({
    onUnhandledRequest: 'bypass', // 对于未处理的请求，直接放行
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
