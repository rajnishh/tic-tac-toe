import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { makeMoveAPI } from '../../services/gameApiService';
// Async thunk to handle making a move
export const makeMove = createAsyncThunk(
    'game/makeMove',
    async ({ board, player }, { getState, rejectWithValue }) => {
      const token = getState().auth.token; // Get token from Redux state
      try {
        const response = await makeMoveAPI(board, player, token); // Pass token to API function
        return response;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Error making a move');
      }
    }
  );


const gameSlice = createSlice({
  name: 'game',
  initialState: {
    board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    currentPlayer: 'X',
    status: 'ongoing',
    error: null,
  },
  reducers: {
    updateBoard: (state, action) => {
        console.log("state",state);
        console.log("action",action.payload);
      const { row, col, player } = action.payload;
      // Ensure immutability by creating a new board array using deep copy
      state.board = state.board.map((rowArr, rowIndex) =>
        rowArr.map((cell, colIndex) => (rowIndex === row && colIndex === col ? player : cell))
      );
    },
    setGameStatus: (state, action) => {
      state.status = action.payload;
    },
    resetGame: (state) => {
      state.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];  // Reset the board to the initial state
      state.status = 'ongoing';  // Reset the status to ongoing
      state.error = null;  // Clear any existing errors
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeMove.fulfilled, (state, action) => {
        state.board = action.payload.board;  // Update the board with API response
        state.error = null;
      })
      .addCase(makeMove.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { updateBoard, setGameStatus, resetGame } = gameSlice.actions;

export default gameSlice.reducer;
