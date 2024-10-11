import { Box, Button, Grid, Typography, Modal } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ComputerIcon from '@mui/icons-material/Computer';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStats } from '../redux/statsSlice';
import { makeMove, resetGame, setGameStatus } from '../redux/gameSlice';

const GameWithAI = () => {
  const dispatch = useDispatch();
  
  const { board, status } = useSelector((state) => state.game);
  const { wins, losses, draws } = useSelector((state) => state.stats);

  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [startingPlayer, setStartingPlayer] = useState('user');
  const [winningCells, setWinningCells] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [gameResult, setGameResult] = useState('');

  const currentPlayer = 'X';

  // Function to check for a winning combination
  const checkForWinner = (board) => {
    const lines = [
      // Rows
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // Columns
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // Diagonals
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];
    
    for (const line of lines) {
      const [[a, b], [c, d], [e, f]] = line;
      if (board[a][b] !== 0 && board[a][b] === board[c][d] && board[a][b] === board[e][f]) {
        return line; // Return the winning line
      }
    }
    return null;
  };

  const startGame = (firstPlayer) => {
    setStartingPlayer(firstPlayer);
    setIsGameStarted(true);
    setIsPlayerTurn(firstPlayer === 'user');
    setWinningCells([]);

    if (firstPlayer === 'computer') {
      const initialBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
      dispatch(makeMove({ board: initialBoard, player: 'O' }))
        .then((response) => {
          const { next_move, status, board: updatedBoardAfterMove } = response.payload;
          const newBoard = updatedBoardAfterMove.map((row) => [...row]);
          newBoard[next_move[0]][next_move[1]] = 1; // AI move is 'O'
          dispatch(setGameStatus(status));
          setIsPlayerTurn(true);
        })
        .catch((error) => {
          console.error('Error making a move:', error);
        });
    }
  };

  const handlePlayerMove = (i, j) => {
    if (board[i][j] === 0 && isPlayerTurn && status === 'ongoing') {
      const updatedBoard = board.map((row) => [...row]);
      updatedBoard[i][j] = -1; // Player move is 'X'

      setIsPlayerTurn(false); // Temporarily disable the player until AI moves

      dispatch(makeMove({ board: updatedBoard, player: currentPlayer }))
        .then((response) => {
          const { next_move, status, winner, details, board: updatedBoardAfterMove } = response.payload;
          const newBoard = updatedBoardAfterMove.map((row) => [...row]);

          // Check if there's a game over
          if(status === "over") {
            dispatch(getStats()) // Fetch the latest stats after the game ends
            .then(() => {
            })
            .catch((error) => {
              console.error("fetching stats:", error);
            });
            const winningLine = checkForWinner(newBoard);
            if (winningLine) {
                setWinningCells(winningLine);
            }
            // Highlight winning cells
            const message = winner === "X" ? 'You Win!' : winner === "O" ? 'You Lost!' : "Game Draw!";
            setGameResult(message);
            setOpenPopup(true); // Open the popup

              
          }  else if (status === 'ongoing') {
            newBoard[next_move[0]][next_move[1]] = 1; // AI move is 'O'
            setIsPlayerTurn(true); // Return control to the player
          }
          dispatch(setGameStatus(status));
        })
        .catch((error) => {
          console.error('Error making a move:', error);
        });
    }
  };

  const handleResetGame = () => {
    setStartingPlayer("user");
    dispatch(resetGame());
    setIsPlayerTurn(true);
    setIsGameStarted(false);
    setWinningCells([]);
    setOpenPopup(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" align="center" mb={1}>
        Tic-Tac-Toe with AI
      </Typography>

      {/* User and Computer Icons */}
      {/* {!isGameStarted && ( */}
        <Box display="flex" justifyContent="center" mb={2}>
          <PersonIcon
            //onClick={() => startGame('user')}
            fontSize="large"
            sx={{
              cursor: 'pointer',
              color: startingPlayer === 'user' ? '#0066b8' : 'gray',
              marginRight: 2,
            }}
          />
          <ComputerIcon
            onClick={() => startGame('computer')}
            fontSize="large"
            sx={{
              cursor: 'pointer',
              color: startingPlayer === 'computer' ? '#0066b8' : 'gray',
            }}
          />
        </Box>
      {/* )} */}

      {/* Stats and Turn Indicator */}
      <Grid container justifyContent="center" spacing={2} mt={2}>
        <Grid item>
          <Typography variant="h6">Wins: {wins}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">Losses: {losses}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">Draws: {draws}</Typography>
        </Grid>
      </Grid>

      <Typography align="center" variant="h6" mt={2}>
        {isPlayerTurn ? 'Your Turn (X)' : 'Computer Turn (O)'}
      </Typography>

      {/* Game Board */}
      <Grid container justifyContent="center" spacing={2} mt={2}>
        {board.map((row, i) => (
          <Grid key={i} container justifyContent="center">
            {row.map((cell, j) => (
              <Button
                key={`${i}-${j}`}
                variant="outlined"
                onClick={() => handlePlayerMove(i, j)}
                sx={{ 
                  width: 100, 
                  height: 100, 
                  fontSize: '2rem', 
                  color: cell === 1 ? '#00bfa5' : cell === -1 ? '#0066b8' : 'inherit',
                  position: 'relative',
                  ...(winningCells.some(([x, y]) => x === i && y === j) && {
                    backgroundColor: '#ffeb3b',
                    animation: 'crossOut 1s linear',
                  }),
                }}
              >
                {cell === -1 ? 'X' : cell === 1 ? 'O' : ''}
              </Button>
            ))}
          </Grid>
        ))}
      </Grid>

      {/* Modal Popup for Game Result */}
      <Modal
  open={openPopup}
  onClose={handleResetGame} // Call handleResetGame when the modal is closed (clicking outside)
>
  <Box
    p={3}
    sx={{
      backgroundColor: 'white',
      textAlign: 'center',
      width: 200,
      height: 70,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      boxShadow: 24,
      borderRadius: 2,
    }}
  >
    <Typography variant="h6">{gameResult}</Typography>
    <Button
      variant="contained"
      onClick={handleResetGame} // Call handleResetGame when clicking the "Restart Game" button
      sx={{ mt: 2 }}
    >
      Close
    </Button>
  </Box>
</Modal>


      <Button onClick={handleResetGame} fullWidth variant="contained" sx={{ mt: 3 }}>
        Restart Game
      </Button>

      {/* CSS for cross-out animation */}
      <style>
        {`
          @keyframes crossOut {
            from {
              background-color: transparent;
            }
            to {
              background-color: #ffeb3b;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default GameWithAI;
