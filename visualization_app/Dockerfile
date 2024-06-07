# Use Python 3.10 slim image as base
FROM python:3.10-slim

# Install necessary packages for Node.js
RUN apt-get update \
    && apt-get install -y curl gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

# Install Node.js
RUN apt-get install -y nodejs

# Confirm installations
RUN node -v && npm -v && python3 --version

ARG ENVIRONMENT

ARG GATSBY_API_URL

ENV GATSBY_API_URL=${GATSBY_API_URL}

# Set your working directory
WORKDIR /app

# Copy your application files
COPY . .

RUN pip install -r requirements.txt
# Continue with other Dockerfile instructions as needed

RUN npm install
RUN npm run build

EXPOSE 8053

CMD ["uvicorn", "app:get_app", "--workers=1", "--host==0.0.0.0", "--port=8053",  "--timeout-keep-alive=120"]
