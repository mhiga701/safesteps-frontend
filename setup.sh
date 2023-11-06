#!/bin/bash
echo "Running 'npm install' to install dependencies. See package.json for details."
npm install
echo "Running npx pod-install for iOS deps (notifications)"
npx pod-install