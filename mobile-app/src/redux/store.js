import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import gameReducer from './slices/gameSlice';
import statsReducer from './slices/statsSlice';

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  game: gameReducer,
  stats: statsReducer,
});

// Configure persistence settings
const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // Use AsyncStorage for React Native
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable checks for redux-persist
    }),
});

// Create the persistor for the store
export const persistor = persistStore(store);
export default store;
