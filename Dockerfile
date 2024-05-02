# Base image - choose Node version accordingly
FROM node:18-alpine AS builder

# Working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Build the Next.js project
COPY . .
RUN npm run build

# Stage for the production image
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Copy production build from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public 

# Set non-root user 
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Expose the default Next port
EXPOSE 3000

# Set user to non-root
USER nextjs

# Start the Next.js production server
CMD ["npm", "start"]
