# ── Stage: production image ───────────────────────────────────────────────────
# Start from Node 20 on Alpine (small, fast, secure)
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first — Docker caches this layer
# node_modules only reinstall when package.json changes
COPY package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy the rest of the source code
COPY . .

# Document the port the app listens on (Render injects PORT at runtime)
EXPOSE 5000

# Start the server
CMD ["node", "src/index.js"]
