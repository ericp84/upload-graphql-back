FROM node:alpine

WORKDIR /src

COPY package.json package.json

RUN yarn

COPY src src
COPY tsconfig.json tsconfig.json

CMD yarn start 