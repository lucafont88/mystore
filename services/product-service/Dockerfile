# Stage 1: Build
FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm@10.28.2

WORKDIR /app

# Copy root workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./

# Copy Product Service package
COPY services/product-service/package.json ./services/product-service/

# Install dependencies
RUN pnpm install --filter product-service...

# Copy Product Service source
COPY services/product-service ./services/product-service

# Generate Prisma Client
RUN pnpm --filter product-service prisma:generate

# Build Product Service
RUN pnpm --filter product-service build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Install pnpm for production pruned install
RUN npm install -g pnpm@10.28.2

# Copy built artifacts and production files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY services/product-service/package.json ./services/product-service/
COPY --from=builder /app/services/product-service/dist ./services/product-service/dist
COPY --from=builder /app/services/product-service/prisma ./services/product-service/prisma

# Install production dependencies only
RUN pnpm install --prod --filter product-service...

WORKDIR /app/services/product-service

EXPOSE 3002

CMD ["pnpm", "start"]
