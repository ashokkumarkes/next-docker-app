# Multi-stage Dockerfile for Next.js (uses legacy-peer-deps during install)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
