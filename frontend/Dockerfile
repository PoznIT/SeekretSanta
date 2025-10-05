# syntax = docker/dockerfile:1
FROM node:22-slim AS base
ARG PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
WORKDIR /app

# Dependencies stage
FROM base AS dependencies
COPY package.json package-lock.json ./
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN npm ci

# Build stage
FROM base AS build
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN npm run build

# Production stage
FROM base AS run
ENV NODE_ENV=production
ENV PORT=$PORT
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN mkdir .next
RUN chown nextjs:nodejs .next
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE $PORT
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
