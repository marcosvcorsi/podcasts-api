FROM node:14-alpine

WORKDIR /usr/app

COPY ./package.json ./

RUN npm i --silent

COPY . .

RUN npm run build && \
  npm prune --production

EXPOSE 3000

CMD ["npm", "start"]