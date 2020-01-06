FROM node:12

RUN mkdir -p ./spydr_cli
WORKDIR ./spydr_cli

COPY ./package.json .

RUN npm i --no-cache

COPY . .

# RUN npm run start
