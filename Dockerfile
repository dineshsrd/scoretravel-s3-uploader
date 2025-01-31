# Use a lightweight Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy the source code
COPY . .

RUN npm run build

# Expose the service port
EXPOSE 3000

# Start the service
CMD ["npm", "start"]
