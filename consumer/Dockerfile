# FROM node:20 as builder
FROM node:slim 

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 8081

# CMD [ "node", "dist/index.js" ]
CMD [ "yarn", "dev" ]
