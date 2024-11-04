FROM node:18

# Install pnpm
RUN npm install -g pnpm

# Set up workspace in /app
WORKDIR /app

# Copy workspace config and all package.json files first
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY frontend/package.json ./frontend/
COPY webserver/package.json ./webserver/

# Install all dependencies using pnpm workspace
RUN pnpm install

# Copy source files maintaining your original structure
COPY ./webserver/src ./webserver/src
COPY ./webserver/cert ./webserver/cert
COPY ./frontend/ ./frontend/

# Build the frontend
WORKDIR /app/frontend
RUN pnpm build

# Return to app directory for starting the server
WORKDIR /app

EXPOSE 3000

CMD ["node", "./webserver/src/server.js"]
