# Stage 1: Build
FROM node:20 AS builder

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
COPY services/product-service ./services/product-service

# Build Product Service
WORKDIR /app/services/product-service
RUN pnpm prisma generate
RUN pnpm build

# Stage 2: Production
FROM node:20

# Install openssl
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

# Install pnpm for production pruned install
RUN npm install -g pnpm@10.28.2

# Copy root workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY services/product-service/package.json ./services/product-service/

# Copy built artifacts and prisma
COPY --from=builder /app/services/product-service/dist ./services/product-service/dist
COPY --from=builder /app/services/product-service/prisma ./services/product-service/prisma

# Install production dependencies only
RUN pnpm install --frozen-lockfile --filter product-service...

WORKDIR /app/services/product-service
RUN pnpm prisma generate

EXPOSE 3002

CMD ["pnpm", "start"]
