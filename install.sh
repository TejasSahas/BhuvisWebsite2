#!/bin/bash

echo "========================================"
echo "Indian Real Estate Analytics Platform"
echo "========================================"
echo ""
echo "Installing dependencies and setting up the project..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed. Please install Node.js first."
    echo "Download from: https://nodejs.org/"
    exit 1
fi

echo "Node.js is installed. Proceeding with installation..."
echo ""

# Install root dependencies
echo "Installing root dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install root dependencies."
    exit 1
fi

# Install server dependencies
echo "Installing server dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install server dependencies."
    exit 1
fi
cd ..

# Install client dependencies
echo "Installing client dependencies..."
cd client
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install client dependencies."
    exit 1
fi
cd ..

echo ""
echo "========================================"
echo "Installation completed successfully!"
echo "========================================"
echo ""
echo "To start the application:"
echo "1. Run: npm run dev"
echo "2. Open: http://localhost:3000"
echo "3. API will be available at: http://localhost:4000"
echo "" 