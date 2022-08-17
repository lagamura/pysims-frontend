FROM node:lts-alpine

WORKDIR /vue-app

ENV PATH /vue-app/node_modules/.bin:$PATH

#RUN npm install @vue/cli@4.5.13 -g

COPY package.json .
COPY package-lock.json .
RUN npm install

CMD ["npm", "run", "dev"]