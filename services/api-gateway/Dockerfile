# Stage 1: Build
FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm@10.28.2

WORKDIR /app

# Copy root workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./

# Copy ALL package.json files first for efficient caching
COPY services/api-gateway/package.json ./services/api-gateway/
COPY services/auth-service/package.json ./services/auth-service/
COPY services/product-service/package.json ./services/product-service/

# Install dependencies for the whole workspace
RUN pnpm install --frozen-lockfile

# Copy source code
COPY services/api-gateway ./services/api-gateway

# Build API Gateway
WORKDIR /app/services/api-gateway
RUN pnpm build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Install pnpm for production pruned install
RUN npm install -g pnpm@10.28.2

# Copy root workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY services/api-gateway/package.json ./services/api-gateway/

# Copy built artifacts
COPY --from=builder /app/services/api-gateway/dist ./services/api-gateway/dist

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile --filter api-gateway...

WORKDIR /app/services/api-gateway

EXPOSE 3000

CMD ["pnpm", "start"]
