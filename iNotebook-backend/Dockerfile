# Step 1: Use the official Node.js image
FROM node:18

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Step 4: Copy the rest of the application code
COPY . .

# Step 5: Expose the backend API on port 5000
EXPOSE 5000

# Step 6: Start the backend API
CMD ["node", "index.js"]
