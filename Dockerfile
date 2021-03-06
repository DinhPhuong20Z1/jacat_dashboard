# 1. For build React app
FROM node:lts AS development
# Set working directory
WORKDIR /app

COPY . /app
#
COPY package.json /app/package.json

RUN yarn install

FROM development AS build

RUN yarn run build:prod

# 2. For Nginx setup

FROM nginx:alpine

# Copy config nginx

COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /app/dist .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
