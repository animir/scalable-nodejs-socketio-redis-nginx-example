FROM node:latest

WORKDIR /app
RUN yarn global add pm2

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production && yarn cache clean

CMD pm2-runtime process.yml