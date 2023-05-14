#!/bin/bash

set -e

echo "Building client..."
cd client
npm install > /dev/null 2>&1
npm run build > /dev/null 2>&1

echo "Copying frontend build to server..."
cd ..
cp -r client/frontend-build server

echo "Building and running server..."
cd server
npm install > /dev/null 2>&1
echo "Running on http://localhost:3000"
npm run dev > /dev/null 2>&1

echo "Script execution completed."
