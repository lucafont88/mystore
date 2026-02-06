# Stage 1: Build
FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm@10.28.2

WORKDIR /app

# Copy root workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./

# Copy Auth Service package
COPY services/auth-service/package.json ./services/auth-service/

# Install dependencies
RUN pnpm install --filter auth-service...

# Copy Auth Service source
COPY services/auth-service ./services/auth-service

# Generate Prisma Client
RUN pnpm --filter auth-service prisma:generate

# Build Auth Service
RUN pnpm --filter auth-service build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Install pnpm for production pruned install
RUN npm install -g pnpm@10.28.2

# Copy built artifacts and production files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY services/auth-service/package.json ./services/auth-service/
COPY --from=builder /app/services/auth-service/dist ./services/auth-service/dist
COPY --from=builder /app/services/auth-service/prisma ./services/auth-service/prisma

# Install production dependencies only
RUN pnpm install --prod --filter auth-service...

WORKDIR /app/services/auth-service

EXPOSE 3001

CMD ["pnpm", "start"]
