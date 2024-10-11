// src/App.js

import React from 'react';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';  // Import Redux store and persistor
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate to persist state
import MainNavigator from './navigation/MainNavigator';  // Your app's navigation
import { SafeAreaView, StatusBar } from 'react-native'; // For mobile layout

const App = () => {
  return (
    <Provider store={store}>  {/* Redux Provider to manage global state */}
      <PersistGate loading={null} persistor={persistor}>  {/* PersistGate for redux-persist */}
        <SafeAreaView style={{ flex: 1 }}>  {/* SafeAreaView to handle notch */}
          <StatusBar barStyle="dark-content" />
          <MainNavigator />  {/* App navigation logic */}
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
