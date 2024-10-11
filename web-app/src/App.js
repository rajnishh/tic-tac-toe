import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import GameWithAI from './pages/GameWithAi';  // Import GameWithAI
import GameStatistics from './pages/GameStatistics';  // Import GameStatistics
import ProtectedRoute from './components/ProtectedRoute';  // Import ProtectedRoute
import PublicRoute from './components/PublicRoute';  // Import PublicRoute

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } 
      />

      {/* Protected routes */}
      <Route 
        path="/game/ai" 
        element={
          <ProtectedRoute>
            <GameWithAI />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/statistics" 
        element={
          <ProtectedRoute>
            <GameStatistics />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default App;
