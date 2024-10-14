# Tic-Tac-Toe Game

## Description

This project is a Tic-Tac-Toe game that allows users to log in, choose who starts the game (user or computer), play against a stateless Tic-Tac-Toe engine, and track their statistics. The game includes a web interface built with React and a mobile interface built with React Native. The backend is implemented using Node.js and interacts with a Python-based Tic-Tac-Toe engine.

## Design Decisions

### Database Choice
We chose MongoDB due to its flexibility in handling dynamic, evolving data structures. It allows us to easily store user statistics and game states without the need for predefined schemas. This is particularly useful when tracking a variety of user metrics.

### API Architecture
The API is designed to be modular, separating concerns between game logic and user management. The Python-based Tic-Tac-Toe engine remains stateless and focuses purely on game logic, while the Node.js server manages user authentication, game sessions, and statistics. This separation ensures that each component is testable and scalable.

## API Documentation

The API is documented using Swagger. You can access the interactive API documentation by navigating to: http://localhost:5000/api-docs/

## Project Structure

```
tic-tac-toe/
├── api/
│   ├── node-api/
│   ├── python-engine/
│── web-app/
│── mobile-app/
├── .gitignore
├── package.json
├── yarn.lock
├── README.md
└── docs/
```

## Prerequisites

Before running the applications, ensure you have the following installed:


- **Python**: v3.8 or later
- **Node.js**: v20.x or later
- **Yarn**: v1.x or later
- **FastAPI**: (specified in `requirements.txt`)
- **MongoDB**: Ensure you have a running instance of MongoDB.

## Environment Variables

### Node API
- **Set up the PORT, MONGO 
URL, API URLs and JWT secret keys in .env file**
```bash
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tictactoe
JWT_SECRET=your_secret_key
PYTHON_API_BASE_URL=http://localhost:5000  # Update this if you're hosting Python engine elsewhere.
```
### web-app
- **Set up the PORT, API URLs and JWT secret keys in .env file**
```bash
API_BASE_URL=http://localhost:5000
```

## Installation
1. **Make the Scripts Executable**:
   Before running the scripts, ensure they are executable:
   ```bash
   chmod +x build.sh startAll.sh
### Build Commands

To install the necessary dependencies for each component, run the build.sh:

- **To build all applications**:
   ```bash
   ./build.sh
   ```

 Or run the following commands to build one by one:

1. **Install Python dependencies for the engine**:
   ```bash
   cd api/python-engine
   python3 -m venv venv
   source venv/bin/activate 
   pip install -r requirements.txt
   ```

2. **Install Node.js API dependencies**:
   ```bash
   cd ../node-api
   yarn install
   ```

3. **Install React web app dependencies**:
   ```bash
   cd ../../web-app
   yarn install
   ```

4. **Install React Native mobile app dependencies**:
   ```bash
   cd ../mobile-app
   yarn install
   ```
   - *Refer the README file under the mobil-app.*

### Running the Applications

You can run the applications using the provided scripts:
>**Note**: Mobile app can be run manually.
- **To start all applications(excluding mobile app)**:
   ```bash
   ./startAll.sh
   ```
or run the application by individual commands:

1. **Start the Python engine**:
   ```bash
   cd api/python-engine
   source venv/bin/activate  # Activate virtual environment
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```

2. **Start the Node.js API**:
   ```bash
   cd ../node-api
   node src/server.js
   ```

3. **Start the React web app**:
   ```bash
   cd ../../web-app
   yarn start
   ```

4. **Start the React Native mobile app**:
   - *Refer the README file under the mobil-app.*

## Features

- **User Authentication**: Login and registration using email and password.
- **Game Play**: Users can choose to play against the computer or another player.
- **Game Statistics**: Track wins, losses, and draws for each user.
- **Responsive Interfaces**: Built using React for the web and React Native for mobile.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Screenshots

- **Web View**
### 1. Registration Screen
![Registration Screen](./screenshots/user_registration.png)

### 2. Login Screen
![Login Screen](./screenshots/user_login.png)

### 3. Game Screen
![Game Screen](./screenshots/game_board.png)

### 4. Move Screen
![Stats Screen](./screenshots/move.png)

### 5. Stats Screen
![Stats Screen](./screenshots/stats.png)

- **Mobile View**
### 1. Login Screen
![Login Screen](./screenshots/login_m.png)

### 3. Game Screen
![Game Screen](./screenshots/move_m.png)

### 5. Stats Screen
![Stats Screen](./screenshots/stats_m.png)
