# Use Node.js 22
FROM node:22

# Set working dir
WORKDIR /usr/src/path

# Copy package.json & package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of code
COPY . .

# Expose port 
EXPOSE 3001

# Start app
CMD ["node", "server.ts"]