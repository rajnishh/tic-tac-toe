# Architecture Overview

## 1. Frontend
- **Web**: Built with React.js using Redux for state management and Axios for API communication.
- **Mobile**: Built with React Native, mirroring the web app functionality.

>**TODO**:
- **Shared Components**: Both web and mobile apps use the same logic for login, game sessions, and statistics.

## 2. Backend
- **Node.js**: Manages user authentication (JWT-based), game session logic, and interacts with the Python engine.
- **MongoDB**: Stores user statistics, login details, and session information.

## 3. Python Tic-Tac-Toe Engine
- Stateless engine exposed via a Flask API.
- Receives the board state and current player and returns the next move or game status.

## 4. State Management
- **Redux**: Handles state for user authentication, game logic, and statistics across both web and mobile.
