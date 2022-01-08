FROM node:alpine

WORKDIR /usr/app/client

RUN apk add postgresql-client

COPY package.json ./

COPY ./prisma ./

RUN npm install

COPY . .

RUN apk add dos2unix

RUN dos2unix wait-for.sh

CMD [ "entry.js" ]