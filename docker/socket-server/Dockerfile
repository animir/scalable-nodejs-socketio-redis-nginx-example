FROM node:latest

WORKDIR /app
RUN yarn install --prod
RUN yarn global add pm2

CMD pm2-runtime process.yml