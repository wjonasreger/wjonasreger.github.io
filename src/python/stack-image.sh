#!/bin/bash

# Check if the image path argument is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <image_path>"
    exit 1
fi

# Get the image path
image_path="$1"

# Check if the image path is empty
if [ -z "$image_path" ]; then
    echo "Error: Empty image path. Please provide a valid image path."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Python 3 is not installed. Please install it before running this script."
    exit 1
fi

# Define the name of the virtual environment
venv_name="stack-image-env"

# Check if the virtual environment already exists
if [ -d "$venv_name" ]; then
    echo "Removing old environment..."
    rm -rf "$venv_name"
fi

# Create a Python virtual environment
echo "Creating virtual environment for stack-image..."
python3 -m venv "$venv_name"

# Activate the virtual environment
echo "Activating virtual environment for stack-image..."
source "$venv_name/bin/activate"

# Install pip (if not already installed)
if ! command -v pip &> /dev/null; then
    echo "Installing pip..."
    python -m ensurepip --default-pip
fi

# Install packages using pip
echo "Installing dependencies..."
echo "Installing pillow..."
pip install pillow==9.0.1  # Added Pillow for image processing
echo "Installing numpy..."
pip install numpy  # Added numpy for numeric processing

# Activate the virtual environment again to make sure packages are available
source "$venv_name/bin/activate"

# Run the Python script with the provided image path
python3 stack-image.py "$image_path"

# Deactivate the virtual environment when done
deactivate

# Remove the virtual environment
echo "Removing virtual environment..."
rm -rf "$venv_name"

echo "Script completed."
