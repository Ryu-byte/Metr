# develop stage
FROM node:lts-alpine as develop-stage
WORKDIR /src
COPY package*.json ./
RUN npm i -g @quasar/cli@latest
RUN npm update -g
COPY . .

# local-deps
FROM develop-stage as local-deps-stage
RUN yarn

# build stage
FROM local-deps-stage as build-stage-spa
RUN quasar build

# production stage
FROM nginx:stable-alpine as production-stage-spa
COPY --from=build-stage-spa /src/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
