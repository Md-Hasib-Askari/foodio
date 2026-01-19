# Base stage
FROM node:18-alpine AS base
WORKDIR /app

# Dependencies stage
FROM base AS dependencies
COPY package*.json ./
RUN bun install --frozen-lockfile

# Build stage
FROM base AS build
COPY package*.json ./
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN bun run build

# Production stage
FROM base AS production
ENV NODE_ENV=production

COPY package*.json ./
RUN bun install --production --frozen-lockfile

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["bun", "dist/main"]
