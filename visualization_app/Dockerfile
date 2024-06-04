FROM python:3.10-slim
# Set the working directory in the container

WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install any dependencies needed for your Streamlit app
RUN pip install -r requirements.txt


# Copy the rest of the application code into the container
COPY . .

# Expose the port where Streamlit will run
EXPOSE 8053

# Command to run the Streamlit app when the container starts

CMD ["uvicorn", "web.app:get_app", "--workers=1", "--host=0.0.0.0", "--port=8053", "--timeout-keep-alive=120"]
