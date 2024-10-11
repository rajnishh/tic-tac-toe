# API Documentation

## 1. Python Tic-Tac-Toe Engine API

### Base URL: `/engine`

### Endpoints:

1. **POST /move**
   - Description: Makes a move in the Tic-Tac-Toe game.
   - Request Body:
     ```json
     {
       "board": [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
       "player": "X"
     }
     ```
   - Response Body:
     ```json
     {
       "next_move": [1, 1],
       "status": "ongoing" | "win" | "draw",
       "board": [[0, 0, 0], [0, "X", 0], [0, 0, 0]]
     }
     ```

2. **GET /status**
   - Description: Checks the current game status.
   - Response Body:
     ```json
     {
       "status": "win" | "draw" | "ongoing",
       "winner": "X" | "O" | null
     }
     ```

3. **POST /reset**
   - Description: Resets the game board.
   - Response Body:
     ```json
     {
       "board": [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
     }
     ```

---

## 2. Node.js Backend API

### Base URL: `/api`

### Endpoints:

1. **POST /auth/register**
   - Description: Registers a new user.
   - Request Body:
     ```json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     ```

2. **POST /auth/login**
   - Description: Logs in an existing user and returns a JWT token.
   - Request Body:
     ```json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     ```

3. **POST /game/start**
   - Description: Starts a new game session.
   - Request Body:
     ```json
     {
       "board": [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
       "player": "X"
     }
     ```

4. **POST /game/stats**
   - Description: Updates game statistics for the logged-in user.
   - Request Body:
     ```json
     {
       "result": "win" | "lose" | "draw"
     }
     ```

5. **GET /game/stats**
   - Description: Retrieves the game statistics (wins, losses, draws) for the logged-in user.
