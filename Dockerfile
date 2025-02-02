# Build Stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:docs
RUN npm prune --production

# Production Stage
FROM nginxinc/nginx-unprivileged:stable-alpine AS production
COPY --from=build /app/storybook-static /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
