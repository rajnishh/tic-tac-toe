#!/bin/bash

# Start script for the Tic-Tac-Toe project

# Exit immediately if a command exits with a non-zero status.
set -e

# Function to kill all background processes
cleanup() {
  echo "An error occurred. Stopping all services..."
  pkill -P $$  # Kill all background processes started by this script
  exit 1
}

# Trap any error and run the cleanup function
trap cleanup ERR

# Start the Python engine
echo "Starting Python engine..."
cd api/python-engine
source venv/bin/activate  # Activate virtual environment
uvicorn main:app --host 0.0.0.0 --port 8000 &
PYTHON_PID=$!

# Start the Node.js API
echo "Starting Node.js API..."
cd ../node-api
node src/server.js &
NODE_PID=$!

# Start the React web app
echo "Starting React web app..."
cd ../../web-app
yarn start &
REACT_WEB_PID=$!

# Start the React Native mobile app (optional, uncomment if needed)
# echo "Starting React Native mobile app..."
# cd ../mobile-app
# yarn start &
# REACT_NATIVE_PID=$!

echo "All components are running in the background."

# Wait for all processes to complete
wait $PYTHON_PID
wait $NODE_PID
wait $REACT_WEB_PID
# wait $REACT_NATIVE_PID  # Uncomment if React Native app is being started
