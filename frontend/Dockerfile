# Use an official Node.js runtime as a parent image
FROM node:18-alpine as build

ARG ENVIRONMENT

# Set the working directory
WORKDIR /app

# Copy .yarn/releases folder to use latest yarn version
COPY .yarn ./.yarn
COPY .yarnrc.yml ./.yarnrc.yml

# Copy package.json and yarn.lock (or package-lock.json) to the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn

COPY . ./

RUN yarn build:${ENVIRONMENT}

# Stage 2: Serve the built React app
FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/port8091

RUN rm -rf ./*

# Copy the build output from the previous stage to the Nginx web root directory
COPY --from=build /app/dist .

# add your nginx configurations
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 8091

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

## To Run this file Fire below command
## sudo docker build -t [YOUR_CONTAINER_NAME] --build-args ENVIRONMENT=[YOUR_ENVIRONMENT_NAME]
## Example -
## sudo docker build -t your --build-arg ENVIRONMENT=development . 
## sudo docker build -t swd --build-arg ENVIRONMENT=int . 
## sudo docker build -t swd --build-arg ENVIRONMENT=production . 

## To run run container
## sudo docker run -d -it --rm -p 8080:8091 [YOUR_CONTAINER_NAME]
## Example -
## sudo docker run -d -it --rm -p 8080:8091 swd