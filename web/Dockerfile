FROM node:12

RUN mkdir -p ./web
WORKDIR /web

COPY ./package.json .
COPY ./package-lock.json .

RUN npm i --no-cache

COPY . .

RUN npm run build-dev
RUN npm i -g serve

EXPOSE 7070
CMD ["serve", "-s", "build", "-l", "7070"]
