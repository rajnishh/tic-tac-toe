import React from 'react';
import ReactDOM from 'react-dom/client';  // Use 'react-dom/client' for React 18+
import './index.css';
import App from './App';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import the Provider for Redux
import { PersistGate } from 'redux-persist/integration/react';  // Import PersistGate for redux-persist
import store, { persistor } from './redux/store'; // Import store and persistor
import AppHeader from './components/AppBar';

// Use createRoot for React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>  {/* Wrap App in PersistGate */}
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <AppHeader />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
