#!/usr/bin/env bash

set -e

# Clone Shaka Player
if [ ! -d "shaka-player" ]; then
  git clone --depth 1 --branch v4.6.18 https://github.com/shaka-project/shaka-player.git
fi

cd shaka-player

# Build Shaka Player with required features
python build/build.py \
  --mode release \
  --name shaka.player.react \
  +@complete +@hls +@dash +@offline

# Copy to React Native project
mkdir -p ../assets/shaka
cp dist/shaka-player.shaka.player.react.js ../assets/shaka/shaka-player.compiled.js
cp dist/shaka-player.shaka.player.react.externs.js ../assets/shaka/shaka-player.externs.js

cd ..