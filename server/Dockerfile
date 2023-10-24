# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the entire server application to the container
COPY . .

# Expose the port that your Express.js server will run on 
EXPOSE 3001

# Define the command to start your Express.js server
CMD ["node", "server.js"]