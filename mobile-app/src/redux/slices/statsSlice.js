import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getStatsAPI, saveStatsAPI } from '../../services/gameApiService'; // Import the API calls

// Thunk to fetch user stats
export const getStats = createAsyncThunk(
  'stats/getStats',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token; // Get token from Redux state
    try {
      const response = await getStatsAPI(token); // Call the API with the token
      return response;  // Return the stats data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching stats');
    }
  }
);

// Thunk to save user stats
export const saveStats = createAsyncThunk(
  'stats/saveStats',
  async ({ wins, losses, draws }, { getState, rejectWithValue }) => {
    const token = getState().auth.token; // Get token from Redux state
    try {
      const response = await saveStatsAPI(wins, losses, draws, token); // Pass token to API function
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error saving stats');
    }
  }
);

const statsSlice = createSlice({
  name: 'stats',
  initialState: {
    wins: 0,
    losses: 0,
    draws: 0,
    loading: false,
    error: null,
  },
  reducers: {
    incrementWins(state) {
      state.wins += 1;
    },
    incrementLosses(state) {
      state.losses += 1;
    },
    incrementDraws(state) {
      state.draws += 1;
    },
  },
  extraReducers: (builder) => {
    // Handle getStats
    builder
      .addCase(getStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStats.fulfilled, (state, action) => {
        state.loading = false;
        state.wins = action.payload.wins;
        state.losses = action.payload.losses;
        state.draws = action.payload.draws;
      })
      .addCase(getStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch stats';
      });

    // Handle saveStats
    builder
      .addCase(saveStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveStats.fulfilled, (state, action) => {
        state.loading = false;
        state.wins = action.payload.wins;
        state.losses = action.payload.losses;
        state.draws = action.payload.draws;
      })
      .addCase(saveStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to save stats';
      });
  },
});

export const { incrementWins, incrementLosses, incrementDraws } = statsSlice.actions;
export default statsSlice.reducer;
