FROM node:slim

WORKDIR /app

# Install dependencies first (for better caching)
COPY package*.json ./
RUN npm install

# Install TypeScript (ensures it's available for compilation)
RUN npm install -D typescript

# Copy all project files
COPY . .

# Build TypeScript
RUN npx tsc

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "./dist/index.js"]