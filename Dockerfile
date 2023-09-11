FROM node:18-alpine

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 3000

ENV NODE_ENV development

CMD [ "node", "server.js" ]
