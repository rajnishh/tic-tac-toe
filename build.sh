#!/bin/bash

# Build script for the Tic-Tac-Toe project

# Exit immediately if a command exits with a non-zero status.
set -e

echo "Building Python engine..."
cd api/python-engine
python3 -m venv venv  # Create virtual environment
source venv/bin/activate  # Activate virtual environment
pip3 install -r requirements.txt

echo "Building Node.js API..."
cd ../node-api
yarn install

echo "Building React web app..."
cd ../../web-app
yarn install

# echo "Building React Native mobile app..."
# cd ../mobile-app
# yarn install

echo "All components have been built successfully."