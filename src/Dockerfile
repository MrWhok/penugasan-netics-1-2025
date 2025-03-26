FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .



FROM node:18-alpine AS runtime

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app .

EXPOSE 3000

CMD [ "node","app.js" ]