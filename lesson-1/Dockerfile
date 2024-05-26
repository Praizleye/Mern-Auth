FROM node:20.13.1-alpine as build
WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

# RUN npm run build

CMD [ "npm", "run", "start" ]