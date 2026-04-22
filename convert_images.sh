#!/bin/bash

echo "🎭 Starting conversion of backgrounds..."

# Source and destination paths
SOURCE_DIR="$HOME/.gemini/antigravity/brain/108c01d4-36e9-4e3d-84c7-2fefd6f01af9"
DEST_DIR="$PWD/public/images"

# Make sure destination exists
mkdir -p "$DEST_DIR"

# Ensure we have the webp conversion tool
if ! command -v cwebp &> /dev/null; then
    echo "⚠️ cwebp is not installed. Installing webp tools via Homebrew..."
    brew install webp
fi

# Convert all PNGs in the brain folder
count=0
for img in "$SOURCE_DIR"/*.png; do
  if [ -f "$img" ]; then
    # Grab the original name before the timestamp
    # example: home_bg_1_12345.png -> home_bg_1.webp
    base_name=$(basename "$img")
    new_name=$(echo "$base_name" | sed -E 's/_[0-9]+\.png/.webp/')
    dest_path="$DEST_DIR/$new_name"
    
    # Check if we already converted it to save time
    if [ ! -f "$dest_path" ]; then
        echo "Converting $new_name..."
        cwebp -q 80 "$img" -o "$dest_path" > /dev/null 2>&1
        ((count++))
    fi
  fi
done

if [ $count -eq 0 ]; then
  echo "✅ All images are already up to date!"
else
  echo "✅ All done! $count new backgrounds are now in public/images/ ready to be used."
fi
