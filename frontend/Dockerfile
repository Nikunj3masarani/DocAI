# Use a lightweight Node.js image
FROM node:18-alpine
ARG ENVIRONMENT

ARG VITE_BASE_API
ARG VITE_STREAM_APP_URL

ENV VITE_BASE_API=${VITE_BASE_API}
ENV VITE_STREAM_APP_URL=${VITE_STREAM_APP_URL}

# Set working directory
WORKDIR /app

COPY .yarn ./.yarn
COPY .yarnrc.yml ./.yarnrc.yml

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

RUN yarn add -D sass
# Copy the rest of the project files (excluding node_modules)
COPY . ./

RUN yarn build:${ENVIRONMENT}

# Expose the port where the app is running (default React port)
EXPOSE 3000

# Start the development server (replace with your actual start command)
CMD [ "yarn", "run", "preview", "--host" ]

# ## If you wish to use default base Url and stream app url
# ## sudo docker build -t [YOUR_CONTAINER_NAME] --build-arg ENVIRONMENT=[YOUR_ENVIRONMENT_NAME]
# ## If you wish to use new base url
# ## sudo docker build -t [YOUR_CONTAINER_NAME] --build-arg ENVIRONMENT=[YOUR_ENVIRONMENT_NAME] --build-arg  VITE_BASE_API=[YOUR_BASE_URL] --build-arg VITE_STREAM_APP_URL=[YOUR_STREAM_APP_URL]
# ## Example -
# ## sudo docker build -t docai --build-arg ENVIRONMENT=development . 
# ## sudo docker build -t swd --build-arg ENVIRONMENT=int . 
# ## sudo docker build -t swd --build-arg ENVIRONMENT=production . 

# ## To run run container
# ## sudo docker run -p 8080:3000 [YOUR_CONTAINER_NAME]
# ## Example -
# ## sudo docker run -p 8080:3000 docai

# ## To get Docker information of running docker containers
# ## sudo docker ps

# ## To Stop Container
# ## sudo docker kill [YOUR_CONTAINER_ID]
# ## sudo docker kill 12fe53441
