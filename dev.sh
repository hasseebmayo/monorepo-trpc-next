#!/bin/bash

# Start both API and web servers
echo "🚀 Starting development servers..."

# Kill any existing processes on these ports
echo "🧹 Cleaning up existing processes..."
pkill -f "tsx watch src/index.ts" 2>/dev/null || true
pkill -f "next dev" 2>/dev/null || true

# Wait a moment for cleanup
sleep 2

echo "📡 Starting API server on port 3001..."
cd apps/api && pnpm dev &
API_PID=$!

echo "🌐 Starting web server on port 3000..."
cd ../web && pnpm dev &
WEB_PID=$!

echo "✅ Servers started!"
echo "📡 API: http://localhost:3001"
echo "🌐 Web: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to clean up background processes
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $API_PID 2>/dev/null || true
    kill $WEB_PID 2>/dev/null || true
    pkill -f "tsx watch src/index.ts" 2>/dev/null || true
    pkill -f "next dev" 2>/dev/null || true
    exit 0
}

# Set up trap to clean up on exit
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait
