import { createSlice } from '@reduxjs/toolkit';
import * as apiService from '../../services/authApiService';  // Import apiService

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    error: null,
    loading: false,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null; // Clear any existing error
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null; // Clear errors
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

// Async action to log in the user using apiService
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(loginStart()); // Set loading to true

    // Call the login API from apiService.js
    const data = await apiService.loginUser({ email, password });

    // Dispatch loginSuccess action with user and token
    dispatch(loginSuccess({ user: data.user, token: data.token }));

  } catch (error) {
    // Dispatch the login failure action
    dispatch(loginFailure(error.message || 'Login failed'));
  }
};

// Action to log out the user
export const logoutUser = () => (dispatch) => {
  dispatch(logout()); // Reset the state
};

export default authSlice.reducer;
