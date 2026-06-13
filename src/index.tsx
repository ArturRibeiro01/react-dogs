import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/App';

const redirectedRoute = new URLSearchParams(window.location.search).get('__route');

if (redirectedRoute) {
  const routeUrl = new URL(redirectedRoute, window.location.origin);
  window.history.replaceState(
    null,
    '',
    `${routeUrl.pathname}${routeUrl.search}${window.location.hash}`,
  );
}

const root = document.getElementById('root');

if (!root) throw new Error('Root element not found.');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
