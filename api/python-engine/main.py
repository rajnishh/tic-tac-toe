import os
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from engine import Environment

# Load value functions for X and O from environment variables (defaulting to local .npy files)
vx_path = os.getenv("VX_PATH", "vx.npy")
vo_path = os.getenv("VO_PATH", "vo.npy")

# Load the numpy arrays for the value functions
vx = np.load(vx_path)
vo = np.load(vo_path)

# Initialize FastAPI app and the game environment
app = FastAPI()
env = Environment()

# Request model for a move, consisting of the current board state and the turn
class MoveRequest(BaseModel):
    board: list
    turn: str  # Either 'X' or 'O'

@app.post("/move")
async def make_move(move: MoveRequest):
    """
    Handles a player's move and triggers the computer's response.
    
    - If the game is over before the player's move, it returns the game status and winner.
    - After the player's move, the computer responds with its own move.
    - Finally, it checks if the game is over after the computer's move.
    
    Returns:
    - Updated board state.
    - Status of the game (ongoing or over).
    - The winner if the game is over.
    """
    board_state = np.array(move.board)
    turn = move.turn

    # Set the current board state in the environment
    env.board = board_state

    # Check if the game is already over
    if env.game_over():
        return {"status": "over", "winner": env.get_winner(), "board": env.board.tolist()}

    # Make the computer's move
    computer_move = make_computer_move()

    # Check if the game ends after the computer's move
    if env.game_over():
        return {"move": computer_move, "status": "over", "winner": env.get_winner(), "board": env.board.tolist()}
    
    return {"move": computer_move, "status": "ongoing", "board": env.board.tolist()}

def make_computer_move():
    """
    Makes the computer's move based on available empty spaces.
    
    The computer plays as 'O', and it finds the next available spot.
    If no valid move is left, an HTTPException is raised.
    
    Returns:
    - The coordinates of the computer's move.
    """
    symbol = env.o  # Computer is 'O'
    value_fn = vo  # Value function for 'O'

    # Find the next available move
    next_move = None
    for i in range(3):
        for j in range(3):
            if env.is_empty(i, j):  # If the spot is empty
                next_move = (i, j)
                break  # Stop once the first valid move is found

    if next_move is None:
        raise HTTPException(status_code=400, detail="No valid moves left")

    # Apply the move to the board
    env.board[next_move[0], next_move[1]] = symbol
    return next_move

@app.get("/status")
async def get_status():
    """
    Returns the current game status.
    
    - If the game is over, the winner is included.
    - Otherwise, the game is ongoing.
    
    Returns:
    - Game status (over or ongoing).
    - Board state.
    - Winner if the game is over.
    """
    if env.game_over():
        return {"status": "over", "winner": env.get_winner(), "board": env.board.tolist()}
    return {"status": "ongoing", "board": env.board.tolist()}

@app.post("/reset")
async def reset_game():
    """
    Resets the game environment to start a new game.
    
    Returns:
    - A message confirming the reset.
    - The newly initialized empty board.
    """
    env.reset()
    return {"message": "Game reset", "board": env.board.tolist()}
