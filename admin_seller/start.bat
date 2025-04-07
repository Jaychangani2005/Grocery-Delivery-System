@echo off

REM Install backend dependencies
echo Installing backend dependencies...
cd backend
call npm install

REM Install frontend dependencies
echo Installing frontend dependencies...
cd ..
call npm install

REM Start backend server in a new window
echo Starting backend server...
start cmd /k "cd backend && node server.js"

REM Start frontend server
echo Starting frontend server...
npm run dev 