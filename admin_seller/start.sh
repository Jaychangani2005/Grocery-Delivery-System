#!/bin/bash

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd ..
npm install

# Start backend server in the background
echo "Starting backend server..."
cd backend
node server.js &
BACKEND_PID=$!

# Start frontend server
echo "Starting frontend server..."
cd ..
npm run dev

# Kill backend server when frontend is stopped
kill $BACKEND_PID 