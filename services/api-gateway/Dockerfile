# Stage 1: Build
FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm@10.28.2

WORKDIR /app

# Copy root workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./

# Copy API Gateway package
COPY services/api-gateway/package.json ./services/api-gateway/

# Install dependencies
RUN pnpm install --filter api-gateway...

# Copy API Gateway source
COPY services/api-gateway ./services/api-gateway

# Build API Gateway
RUN pnpm --filter api-gateway build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Install pnpm for production pruned install
RUN npm install -g pnpm@10.28.2

# Copy built artifacts and production files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY services/api-gateway/package.json ./services/api-gateway/
COPY --from=builder /app/services/api-gateway/dist ./services/api-gateway/dist

# Install production dependencies only
RUN pnpm install --prod --filter api-gateway...

WORKDIR /app/services/api-gateway

EXPOSE 3000

CMD ["pnpm", "start"]
