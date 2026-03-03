# Build frontend
FROM node:20 AS frontend-build
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Build backend
FROM node:20
WORKDIR /app

# 👇 Build argument must be before ENV and before CMD
ARG COLOR
ENV DEPLOYMENT_COLOR=$COLOR

COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
COPY --from=frontend-build /frontend/build ./public

EXPOSE 3000
CMD ["node", "app.js"]
