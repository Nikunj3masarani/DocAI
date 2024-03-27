# Use a Python base image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the Python migration script and requirements file into the container
COPY . /app

# Install any Python dependencies needed for the migration script
RUN pip install -r requirements.txt

# Command to run the migration script when the container starts
CMD ["python", "migrate.py"]
