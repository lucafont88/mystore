# Stage 1: Build
FROM node:20-alpine AS builder

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
COPY services/order-service/package.json ./services/order-service/
COPY services/user-data-service/package.json ./services/user-data-service/
COPY frontend/store-app/package.json ./frontend/store-app/

# Install dependencies for the whole workspace
RUN pnpm install --frozen-lockfile

# Copy shared source and build it first (workspace dependency)
COPY shared ./shared
RUN cd shared && pnpm build

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
COPY shared/package.json ./shared/
COPY services/api-gateway/package.json ./services/api-gateway/

# Copy shared built artifacts (workspace dependency)
COPY --from=builder /app/shared/dist ./shared/dist

# Copy built artifacts
COPY --from=builder /app/services/api-gateway/dist ./services/api-gateway/dist

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile --filter api-gateway...

WORKDIR /app/services/api-gateway

EXPOSE 3000

CMD ["pnpm", "start"]
