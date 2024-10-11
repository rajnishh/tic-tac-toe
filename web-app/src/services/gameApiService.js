import axios from 'axios';

// Dynamically determine the base API URL
const API_URL = process.env.NODE_ENV === 'development' ? '' : process.env.API_BASE_URL;


// Helper function to set the Authorization header with the JWT token
const getAuthHeader = (token) => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Make a move API call (Protected, requires token)
export const makeMoveAPI = async (board, player, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/game/move`,
      { board, player },
      getAuthHeader(token) // Pass the token in the header
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

// Save stats API call (Protected, requires token)
export const saveStatsAPI = async (userId, wins, losses, draws, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/game/stats`,
      {
        userId,
        wins,
        losses,
        draws,
      },
      getAuthHeader(token) // Pass the token in the header
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

// Get stats API call (Protected, requires token)
export const getStatsAPI = async (token) => {
  try {
    const response = await axios.get(
      `${API_URL}/game/stats`,
      getAuthHeader(token) // Pass the token in the header
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};
