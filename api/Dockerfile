FROM node:12

ENV PORT=8000

RUN mkdir -p ./api
WORKDIR ./api

COPY ./package.json .
COPY ./package-lock.json .

RUN npm i --no-cache

COPY . .

RUN npm run build
RUN npm i -g serve

EXPOSE $PORT

CMD ["serve", "-s", "build", "-l", "8000"]
