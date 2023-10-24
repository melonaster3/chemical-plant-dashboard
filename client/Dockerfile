# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the entire client application to the container
COPY . .

# Expose the port that your React app will run on (e.g., 3000)
EXPOSE 3000

# Define the command to start your React application
CMD ["npm", "start"]