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

# Production image. The `node` image already ships a non-root `node` user;
# we just opt into it so a Nuxt SSR/Nitro code-exec bug doesn't land as
# root (helvetra/infra#10).
FROM base AS production
COPY --from=build --chown=node:node /app/.output /app/.output

USER node

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
