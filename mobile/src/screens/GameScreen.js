import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { makeMove, resetGame, setGameStatus } from '../redux/slices/gameSlice';
import { incrementWins, incrementLosses, incrementDraws } from '../redux/slices/statsSlice';

const GameScreen = () => {
  const dispatch = useDispatch();
  const { board, status } = useSelector((state) => state.game);
  const { wins, losses, draws } = useSelector((state) => state.stats);

  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameResult, setGameResult] = useState('');

  // Handle Player Move
  const handlePlayerMove = (i, j) => {
    if (board[i][j] === 0 && isPlayerTurn && status === 'ongoing') {
      const updatedBoard = board.map((row) => [...row]);
      updatedBoard[i][j] = -1;

      setIsPlayerTurn(false);

      dispatch(makeMove({ board: updatedBoard, player: 'X' }))
        .then((response) => {
          const { next_move, status, winner, board: updatedBoardAfterMove } = response.payload;
          const newBoard = updatedBoardAfterMove.map((row) => [...row]);

          if (status === 'over') {
            setGameResult(winner === 'X' ? 'You Win!' : winner === 'O' ? 'You Lost!' : 'Draw!');
            setIsPlayerTurn(false);
          } else {
            newBoard[next_move[0]][next_move[1]] = 1;
            setIsPlayerTurn(true);
          }

          dispatch(setGameStatus(status));
        })
        .catch((error) => {
          console.error('Error making move:', error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tic-Tac-Toe with AI</Text>

      <Text style={styles.stats}>Wins: {wins} | Losses: {losses} | Draws: {draws}</Text>

      <View style={styles.board}>
        {board.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((cell, j) => (
              <TouchableOpacity
                key={`${i}-${j}`}
                style={styles.cell}
                onPress={() => handlePlayerMove(i, j)}
              >
                <Text style={styles.cellText}>
                  {cell === -1 ? 'X' : cell === 1 ? 'O' : ''}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      {gameResult && <Text style={styles.resultText}>{gameResult}</Text>}

      <Button title="Restart Game" onPress={() => dispatch(resetGame())} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  stats: {
    fontSize: 18,
    marginBottom: 16,
  },
  board: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 80,
    height: 80,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cellText: {
    fontSize: 36,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
});

export default GameScreen;
