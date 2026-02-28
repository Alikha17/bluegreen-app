# Build frontend
FROM node:20 as frontend-build
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Build backend
FROM node:20
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
COPY --from=frontend-build /frontend/build ./public
EXPOSE 3000
CMD ["node", "app.js"]
