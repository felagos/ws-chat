# ---- Build Stage ----
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

FROM node:18-alpine AS production

WORKDIR /app

COPY --from=build /app/dist ./dist

CMD [ "node", "dist/server.js" ]