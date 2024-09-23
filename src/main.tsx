import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CacheProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import { store } from './state/store';
import createEmotionCache from './styles/createEmotionCache.ts';

window.addEventListener(
  'message',
  function (event) {
    if (typeof event.data === 'string') {
      window.sessionStorage.setItem('site', event.data);
    }
  },
  false,
);

const cache = createEmotionCache();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CacheProvider value={cache}>
      <Provider store={store}>
        <App />
      </Provider>
    </CacheProvider>
  </React.StrictMode>,
);
