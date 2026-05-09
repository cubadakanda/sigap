# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage (Menggunakan NGINX - Standar Industri)
FROM nginx:alpine

# Copy hasil build Vite ke folder public NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Membuat konfigurasi NGINX agar mendukung routing React/Vite
RUN rm /etc/nginx/conf.d/default.conf
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]