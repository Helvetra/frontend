# Helvetra Frontend Dockerfile
# Multi-stage build for Nuxt 3 SSR production.

FROM node:22-slim AS base
WORKDIR /app
ENV NODE_ENV=production

# Install dependencies (including devDependencies for build)
FROM base AS deps
ENV NODE_ENV=development
COPY package.json package-lock.json* ./
RUN npm ci

# Build application
FROM deps AS build
COPY . .
RUN npm run build

# Production image
FROM base AS production
COPY --from=build /app/.output /app/.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
