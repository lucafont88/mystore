# Stage 1: Build
FROM node:20 AS builder

# Install pnpm
RUN npm install -g pnpm@10.28.2

WORKDIR /app

# Copy root workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./

# Copy ALL package.json files first for efficient caching
COPY shared/package.json ./shared/
COPY services/api-gateway/package.json ./services/api-gateway/
COPY services/auth-service/package.json ./services/auth-service/
COPY services/product-service/package.json ./services/product-service/
COPY services/shop-page-service/package.json ./services/shop-page-service/
COPY frontend/store-app/package.json ./frontend/store-app/

# Install dependencies for the whole workspace
RUN pnpm install --frozen-lockfile

# Copy shared source and build it first (workspace dependency)
COPY shared ./shared
RUN cd shared && pnpm build

# Copy source code
COPY services/auth-service ./services/auth-service

# Build Auth Service
WORKDIR /app/services/auth-service
RUN pnpm prisma generate
RUN pnpm build
# Copy Prisma generated client into dist/ (compiled code imports '../generated/client')
RUN cp -r src/generated dist/generated

# Stage 2: Production
FROM node:20

# Install openssl
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

# Install pnpm for production pruned install
RUN npm install -g pnpm@10.28.2

# Copy root workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY shared/package.json ./shared/
COPY services/auth-service/package.json ./services/auth-service/

# Copy shared built artifacts (workspace dependency)
COPY --from=builder /app/shared/dist ./shared/dist

# Copy built artifacts and prisma
COPY --from=builder /app/services/auth-service/dist ./services/auth-service/dist
COPY --from=builder /app/services/auth-service/prisma ./services/auth-service/prisma

# Install production dependencies only
RUN pnpm install --frozen-lockfile --filter auth-service...

WORKDIR /app/services/auth-service
RUN pnpm prisma generate
# Copy Prisma generated client into dist/ (compiled code imports '../generated/client')
RUN cp -r src/generated dist/generated

EXPOSE 3001

CMD ["pnpm", "start"]
