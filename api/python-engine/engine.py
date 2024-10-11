import numpy as np

# Constants
LENGTH = 3  # Tic-Tac-Toe board is 3x3

# Define the Environment class
class Environment:
    def __init__(self):
        self.board = np.zeros((LENGTH, LENGTH), dtype=int)  # Empty 3x3 board with integer values
        self.x = -1  # Symbol for X player
        self.o = 1  # Symbol for O player
        self.winner = None
        self.ended = False

    def is_empty(self, i, j):
        return self.board[i, j] == 0

    def reset(self):
        self.board = np.zeros((LENGTH, LENGTH), dtype=int)  # Empty 3x3 board with integer values
        self.winner = None
        self.ended = False

    def game_over(self):
        # Check rows, columns, diagonals for a winner
        for i in range(LENGTH):
            if np.all(self.board[i, :] == self.x) or np.all(self.board[:, i] == self.x):
                self.winner = 'X'
                self.ended = True
                return True
            if np.all(self.board[i, :] == self.o) or np.all(self.board[:, i] == self.o):
                self.winner = 'O'
                self.ended = True
                return True

        # Check diagonals
        if np.all(np.diag(self.board) == self.x) or np.all(np.diag(np.fliplr(self.board)) == self.x):
            self.winner = 'X'
            self.ended = True
            return True
        if np.all(np.diag(self.board) == self.o) or np.all(np.diag(np.fliplr(self.board)) == self.o):
            self.winner = 'O'
            self.ended = True
            return True

        # Check for a draw
        if not np.any(self.board == 0):
            self.winner = 'Draw'
            self.ended = True
            return True

        return False

    def get_winner(self):
        if self.ended:
            return self.winner
        return None
    
    def get_state(self):
        """
        Returns a unique representation of the board state.
        This can be used to fetch value from the pre-trained model.
        """
        k = 0
        h = 0
        for i in range(LENGTH):
            for j in range(LENGTH):
                if self.board[i, j] == 0:
                    v = 0
                elif self.board[i, j] == self.x:
                    v = 1
                elif self.board[i, j] == self.o:
                    v = 2
                h += (3 ** k) * v
                k += 1
        return h
