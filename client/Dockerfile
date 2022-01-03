FROM node:alpine

WORKDIR /app/client

RUN apk add postgresql-client

COPY package.json ./
COPY ./prisma ./

RUN npm install

COPY . .

EXPOSE 3000