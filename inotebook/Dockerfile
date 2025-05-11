# Step 1: Use Node.js to build the React app
FROM node:18 AS build

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Step 4: Copy the rest of the application code
COPY . .

# Step 5: Build the React app
RUN npm run build

# Step 6: Use Nginx to serve the static files from the build folder
FROM nginx:alpine

# Step 7: Copy our custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Step 8: Copy build output from the previous stage to Nginx's default folder
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose port 80 to serve the app
EXPOSE 80

# Step 10: Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]