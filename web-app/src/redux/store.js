import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import gameReducer from './gameSlice';
import statsReducer from './statsSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  game: gameReducer,
  stats: statsReducer,
});

// Configure persistence settings
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'stats'],  // Only persist auth and stats, not game
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  // Disable serializable checks for redux-persist
    }),
});

// Create the persistor for the store
export const persistor = persistStore(store);
export default store;
