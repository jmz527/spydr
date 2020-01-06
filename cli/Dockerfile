FROM node:12

RUN mkdir -p ./cli
WORKDIR ./cli

COPY ./package.json .
COPY ./package-lock.json .

RUN npm i --no-cache

COPY . .

RUN npm start
